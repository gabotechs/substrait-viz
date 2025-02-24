// SPDX-License-Identifier: Apache-2.0

// @generated by protoc-gen-es v2.2.3 with parameter "target=ts"
// @generated from file substrait/capabilities.proto (package substrait, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file substrait/capabilities.proto.
 */
export const file_substrait_capabilities: GenFile = /*@__PURE__*/
  fileDesc("ChxzdWJzdHJhaXQvY2FwYWJpbGl0aWVzLnByb3RvEglzdWJzdHJhaXQi+wEKDENhcGFiaWxpdGllcxIaChJzdWJzdHJhaXRfdmVyc2lvbnMYASADKAkSJAocYWR2YW5jZWRfZXh0ZW5zaW9uX3R5cGVfdXJscxgCIAMoCRJCChFzaW1wbGVfZXh0ZW5zaW9ucxgDIAMoCzInLnN1YnN0cmFpdC5DYXBhYmlsaXRpZXMuU2ltcGxlRXh0ZW5zaW9uGmUKD1NpbXBsZUV4dGVuc2lvbhILCgN1cmkYASABKAkSFQoNZnVuY3Rpb25fa2V5cxgCIAMoCRIRCgl0eXBlX2tleXMYAyADKAkSGwoTdHlwZV92YXJpYXRpb25fa2V5cxgEIAMoCUJXChJpby5zdWJzdHJhaXQucHJvdG9QAVoqZ2l0aHViLmNvbS9zdWJzdHJhaXQtaW8vc3Vic3RyYWl0LWdvL3Byb3RvqgISU3Vic3RyYWl0LlByb3RvYnVmYgZwcm90bzM");

/**
 * Defines a set of Capabilities that a system (producer or consumer) supports.
 *
 * @generated from message substrait.Capabilities
 */
export type Capabilities = Message<"substrait.Capabilities"> & {
  /**
   * List of Substrait versions this system supports
   *
   * @generated from field: repeated string substrait_versions = 1;
   */
  substraitVersions: string[];

  /**
   * list of com.google.Any message types this system supports for advanced
   * extensions.
   *
   * @generated from field: repeated string advanced_extension_type_urls = 2;
   */
  advancedExtensionTypeUrls: string[];

  /**
   * list of simple extensions this system supports.
   *
   * @generated from field: repeated substrait.Capabilities.SimpleExtension simple_extensions = 3;
   */
  simpleExtensions: Capabilities_SimpleExtension[];
};

/**
 * Describes the message substrait.Capabilities.
 * Use `create(CapabilitiesSchema)` to create a new message.
 */
export const CapabilitiesSchema: GenMessage<Capabilities> = /*@__PURE__*/
  messageDesc(file_substrait_capabilities, 0);

/**
 * @generated from message substrait.Capabilities.SimpleExtension
 */
export type Capabilities_SimpleExtension = Message<"substrait.Capabilities.SimpleExtension"> & {
  /**
   * @generated from field: string uri = 1;
   */
  uri: string;

  /**
   * @generated from field: repeated string function_keys = 2;
   */
  functionKeys: string[];

  /**
   * @generated from field: repeated string type_keys = 3;
   */
  typeKeys: string[];

  /**
   * @generated from field: repeated string type_variation_keys = 4;
   */
  typeVariationKeys: string[];
};

/**
 * Describes the message substrait.Capabilities.SimpleExtension.
 * Use `create(Capabilities_SimpleExtensionSchema)` to create a new message.
 */
export const Capabilities_SimpleExtensionSchema: GenMessage<Capabilities_SimpleExtension> = /*@__PURE__*/
  messageDesc(file_substrait_capabilities, 0, 0);

