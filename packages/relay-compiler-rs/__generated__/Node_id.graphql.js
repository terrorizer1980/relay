/**
 * @generated SignedSource<<81e155e96372f53c062c88ea0175ddf6>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type Node_id$ref: FragmentReference;
declare export opaque type Node_id$fragmentType: Node_id$ref;
export type Node_id = {|
  +__typename: string,
  +id: string,
  +$refType: Node_id$ref,
|};
export type Node_id$data = Node_id;
export type Node_id$key = {
  +$data?: Node_id$data,
  +$fragmentRefs: Node_id$ref,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Node_id",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Node",
  "abstractKey": "__isNode"
};

if (__DEV__) {
  (node/*: any*/).hash = "c065f4f3649ff2cf218b956f2cb5ee13";
}

module.exports = node;
