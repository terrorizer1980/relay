/**
 * @generated SignedSource<<4fc6cd3699c1b921eeb70ad133b7bd7c>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type User_name$ref: FragmentReference;
declare export opaque type User_name$fragmentType: User_name$ref;
export type User_name = {|
  +id: string,
  +name: ?string,
  +$refType: User_name$ref,
|};
export type User_name$data = User_name;
export type User_name$key = {
  +$data?: User_name$data,
  +$fragmentRefs: User_name$ref,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "User_name",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

if (__DEV__) {
  (node/*: any*/).hash = "1c46bf17659f42c63d533bcffa16df06";
}

module.exports = node;
