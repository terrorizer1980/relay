const fs = require('fs');
const path = require('path');

const compiler = require('../native');
const schema = `
    interface Node {
        id: ID!
    }

    type User implements Node {
        id: ID!
        name: String
    }
`;

const docs = [
    `
        fragment User_name on User {
            id
            name
        }
    `,
    `
        fragment Node_id on Node {
            __typename
            id
        }
    `
];


const compilerOutput = compiler.compile(schema, docs);

if (compilerOutput != null && Array.isArray(compilerOutput.artifacts)) {
    compilerOutput.artifacts.forEach(artifact => {
        const artifactPath = path.resolve(artifact.path);
        console.log('writing file for:"' + artifact.name + '" to "' +  artifactPath + '"');
        fs.writeFileSync(artifactPath, artifact.content);
    });
} else if (compilerOutput != null && compilerOutput.errorMessage != null) {
    console.error(compilerOutput.errorMessage);
} else {
    console.log('compiler return unexpected results');
}
