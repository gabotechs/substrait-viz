// SPDX-License-Identifier: Apache-2.0

// @generated by protoc-gen-es v2.2.3 with parameter "target=ts"
// @generated from file substrait/plan.proto (package substrait, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Rel, RelRoot } from "./algebra_pb";
import { file_substrait_algebra } from "./algebra_pb";
import type { AdvancedExtension, SimpleExtensionDeclaration, SimpleExtensionURI } from "./extensions/extensions_pb";
import { file_substrait_extensions_extensions } from "./extensions/extensions_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file substrait/plan.proto.
 */
export const file_substrait_plan: GenFile = /*@__PURE__*/
  fileDesc("ChRzdWJzdHJhaXQvcGxhbi5wcm90bxIJc3Vic3RyYWl0IlgKB1BsYW5SZWwSHQoDcmVsGAEgASgLMg4uc3Vic3RyYWl0LlJlbEgAEiIKBHJvb3QYAiABKAsyEi5zdWJzdHJhaXQuUmVsUm9vdEgAQgoKCHJlbF90eXBlIrwCCgRQbGFuEiMKB3ZlcnNpb24YBiABKAsyEi5zdWJzdHJhaXQuVmVyc2lvbhJACg5leHRlbnNpb25fdXJpcxgBIAMoCzIoLnN1YnN0cmFpdC5leHRlbnNpb25zLlNpbXBsZUV4dGVuc2lvblVSSRJECgpleHRlbnNpb25zGAIgAygLMjAuc3Vic3RyYWl0LmV4dGVuc2lvbnMuU2ltcGxlRXh0ZW5zaW9uRGVjbGFyYXRpb24SJQoJcmVsYXRpb25zGAMgAygLMhIuc3Vic3RyYWl0LlBsYW5SZWwSRAoTYWR2YW5jZWRfZXh0ZW5zaW9ucxgEIAEoCzInLnN1YnN0cmFpdC5leHRlbnNpb25zLkFkdmFuY2VkRXh0ZW5zaW9uEhoKEmV4cGVjdGVkX3R5cGVfdXJscxgFIAMoCSIyCgtQbGFuVmVyc2lvbhIjCgd2ZXJzaW9uGAYgASgLMhIuc3Vic3RyYWl0LlZlcnNpb24ibwoHVmVyc2lvbhIUCgxtYWpvcl9udW1iZXIYASABKA0SFAoMbWlub3JfbnVtYmVyGAIgASgNEhQKDHBhdGNoX251bWJlchgDIAEoDRIQCghnaXRfaGFzaBgEIAEoCRIQCghwcm9kdWNlchgFIAEoCUJXChJpby5zdWJzdHJhaXQucHJvdG9QAVoqZ2l0aHViLmNvbS9zdWJzdHJhaXQtaW8vc3Vic3RyYWl0LWdvL3Byb3RvqgISU3Vic3RyYWl0LlByb3RvYnVmYgZwcm90bzM", [file_substrait_algebra, file_substrait_extensions_extensions]);

/**
 * Either a relation or root relation
 *
 * @generated from message substrait.PlanRel
 */
export type PlanRel = Message<"substrait.PlanRel"> & {
  /**
   * @generated from oneof substrait.PlanRel.rel_type
   */
  relType: {
    /**
     * Any relation (used for references and CTEs)
     *
     * @generated from field: substrait.Rel rel = 1;
     */
    value: Rel;
    case: "rel";
  } | {
    /**
     * The root of a relation tree
     *
     * @generated from field: substrait.RelRoot root = 2;
     */
    value: RelRoot;
    case: "root";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message substrait.PlanRel.
 * Use `create(PlanRelSchema)` to create a new message.
 */
export const PlanRelSchema: GenMessage<PlanRel> = /*@__PURE__*/
  messageDesc(file_substrait_plan, 0);

/**
 * Describe a set of operations to complete.
 * For compactness sake, identifiers are normalized at the plan level.
 *
 * @generated from message substrait.Plan
 */
export type Plan = Message<"substrait.Plan"> & {
  /**
   * Substrait version of the plan. Optional up to 0.17.0, required for later
   * versions.
   *
   * @generated from field: substrait.Version version = 6;
   */
  version?: Version;

  /**
   * a list of yaml specifications this plan may depend on
   *
   * @generated from field: repeated substrait.extensions.SimpleExtensionURI extension_uris = 1;
   */
  extensionUris: SimpleExtensionURI[];

  /**
   * a list of extensions this plan may depend on
   *
   * @generated from field: repeated substrait.extensions.SimpleExtensionDeclaration extensions = 2;
   */
  extensions: SimpleExtensionDeclaration[];

  /**
   * one or more relation trees that are associated with this plan.
   *
   * @generated from field: repeated substrait.PlanRel relations = 3;
   */
  relations: PlanRel[];

  /**
   * additional extensions associated with this plan.
   *
   * @generated from field: substrait.extensions.AdvancedExtension advanced_extensions = 4;
   */
  advancedExtensions?: AdvancedExtension;

  /**
   * A list of com.google.Any entities that this plan may use. Can be used to
   * warn if some embedded message types are unknown. Note that this list may
   * include message types that are ignorable (optimizations) or that are
   * unused. In many cases, a consumer may be able to work with a plan even if
   * one or more message types defined here are unknown.
   *
   * @generated from field: repeated string expected_type_urls = 5;
   */
  expectedTypeUrls: string[];
};

/**
 * Describes the message substrait.Plan.
 * Use `create(PlanSchema)` to create a new message.
 */
export const PlanSchema: GenMessage<Plan> = /*@__PURE__*/
  messageDesc(file_substrait_plan, 1);

/**
 * This message type can be used to deserialize only the version of a Substrait
 * Plan message. This prevents deserialization errors when there were breaking
 * changes between the Substrait version of the tool that produced the plan and
 * the Substrait version used to deserialize it, such that a consumer can emit
 * a more helpful error message in this case.
 *
 * @generated from message substrait.PlanVersion
 */
export type PlanVersion = Message<"substrait.PlanVersion"> & {
  /**
   * @generated from field: substrait.Version version = 6;
   */
  version?: Version;
};

/**
 * Describes the message substrait.PlanVersion.
 * Use `create(PlanVersionSchema)` to create a new message.
 */
export const PlanVersionSchema: GenMessage<PlanVersion> = /*@__PURE__*/
  messageDesc(file_substrait_plan, 2);

/**
 * @generated from message substrait.Version
 */
export type Version = Message<"substrait.Version"> & {
  /**
   * Substrait version number.
   *
   * @generated from field: uint32 major_number = 1;
   */
  majorNumber: number;

  /**
   * @generated from field: uint32 minor_number = 2;
   */
  minorNumber: number;

  /**
   * @generated from field: uint32 patch_number = 3;
   */
  patchNumber: number;

  /**
   * If a particular version of Substrait is used that does not correspond to
   * a version number exactly (for example when using an unofficial fork or
   * using a version that is not yet released or is between versions), set this
   * to the full git hash of the utilized commit of
   * https://github.com/substrait-io/substrait (or fork thereof), represented
   * using a lowercase hex ASCII string 40 characters in length. The version
   * number above should be set to the most recent version tag in the history
   * of that commit.
   *
   * @generated from field: string git_hash = 4;
   */
  gitHash: string;

  /**
   * Identifying information for the producer that created this plan. Under
   * ideal circumstances, consumers should not need this information. However,
   * it is foreseen that consumers may need to work around bugs in particular
   * producers in practice, and therefore may need to know which producer
   * created the plan.
   *
   * @generated from field: string producer = 5;
   */
  producer: string;
};

/**
 * Describes the message substrait.Version.
 * Use `create(VersionSchema)` to create a new message.
 */
export const VersionSchema: GenMessage<Version> = /*@__PURE__*/
  messageDesc(file_substrait_plan, 3);

