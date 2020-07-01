use neon::prelude::*;
use graphql_syntax::{SyntaxResult, ExecutableDefinition, Document, parse};
use common::{SourceLocationKey, ConsoleLogger};
use schema::build_schema;
use graphql_ir::{Program, build};
use relay_compiler::{config::{Config, ProjectConfig},  SourceHashes, generate_artifacts, apply_transforms};
use interner::Intern;
use std::sync::Arc;
use graphql_transforms::OSS_CONNECTION_INTERFACE;
use relay_codegen::Printer;
use std::str;


fn compile(mut cx: FunctionContext) -> JsResult<JsObject> {
    let schema_text = cx.argument::<JsString>(0)?.value();
    let documents_handle = cx.argument::<JsArray>(1)?.to_vec(&mut cx)?;

    let mut documents: Vec<SyntaxResult<Document>> = Vec::with_capacity(documents_handle.len());
    for js_value in documents_handle {
        if let Ok(value) = js_value.downcast::<JsString>() {
            documents.push(parse(&value.value(), SourceLocationKey::Generated));
        } else {
            let object = JsObject::new(&mut cx);
            let message = cx.string("Unable to parse documents");
            object.set(&mut cx, "errorMessage",message).unwrap();

            return Ok(object);
        }
    }

    let mut definitions: Vec<ExecutableDefinition> = vec![];
    for document in documents {
        if let Ok(document) = document {
            for definition in document.definitions {
                definitions.push(definition);
            }
        }
    }

    match build_schema(&schema_text) {
        Err(_) => {
            let object = JsObject::new(&mut cx);
            let message = cx.string("Unable to parse schema");
            object.set(&mut cx, "errorMessage", message).unwrap();

            Ok(object)
        },
        Ok(schema) => {
            let config = Config::default();
            let mut printer = Printer::default();
            let project_config = ProjectConfig::new("node_js".intern());
            let source_hashes = SourceHashes::from_definitions( &definitions);
            let ir = build(&schema, &definitions);
            let schema_arc = Arc::new(schema);
            let program = Program::from_definitions(schema_arc, ir.unwrap());

            let programs = apply_transforms(
                "node".intern(),
                Arc::new(program),
                Arc::new(Default::default()),
                Arc::clone(&OSS_CONNECTION_INTERFACE),
                Arc::new(ConsoleLogger)
            ).unwrap();

            let artifacts = generate_artifacts(
                &project_config,
                &programs,
                Arc::new(source_hashes),
            ).unwrap();


            let generated_artifacts = JsArray::new(&mut cx, artifacts.len() as u32);

            for (i, artifact) in artifacts.iter().enumerate() {
                let artifact_object = JsObject::new(&mut cx);
                let content = artifact.content.as_bytes(&config, &project_config, &mut printer, &programs.normalization.schema);
                let name = cx.string(artifact.name.lookup().to_string());
                let path = cx.string(artifact.path.to_string_lossy());
                let content = cx.string(str::from_utf8(&content).unwrap().to_string());
                artifact_object.set(&mut cx, "name", name).unwrap();
                artifact_object.set(&mut cx, "path", path).unwrap();
                artifact_object.set(&mut cx, "content", content).unwrap();

                generated_artifacts.set(&mut cx, i as u32, artifact_object).unwrap();
            }

            let object = JsObject::new(&mut cx);
            object.set(&mut cx, "artifacts", generated_artifacts).unwrap();

            Ok(object)
        }
    }
}

register_module!(mut cx, {
    cx.export_function("compile", compile)
});
