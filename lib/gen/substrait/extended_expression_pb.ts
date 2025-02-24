// SPDX-License-Identifier: Apache-2.0

// @generated by protoc-gen-es v2.2.3 with parameter "target=ts"
// @generated from file substrait/extended_expression.proto (package substrait, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { AggregateFunction, Expression } from "./algebra_pb";
import { file_substrait_algebra } from "./algebra_pb";
import type { AdvancedExtension, SimpleExtensionDeclaration, SimpleExtensionURI } from "./extensions/extensions_pb";
import { file_substrait_extensions_extensions } from "./extensions/extensions_pb";
import type { Version } from "./plan_pb";
import { file_substrait_plan } from "./plan_pb";
import type { NamedStruct } from "./type_pb";
import { file_substrait_type } from "./type_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file substrait/extended_expression.proto.
 */
export const file_substrait_extended_expression: GenFile = /*@__PURE__*/
  fileDesc("CiNzdWJzdHJhaXQvZXh0ZW5kZWRfZXhwcmVzc2lvbi5wcm90bxIJc3Vic3RyYWl0IpYBChNFeHByZXNzaW9uUmVmZXJlbmNlEisKCmV4cHJlc3Npb24YASABKAsyFS5zdWJzdHJhaXQuRXhwcmVzc2lvbkgAEi8KB21lYXN1cmUYAiABKAsyHC5zdWJzdHJhaXQuQWdncmVnYXRlRnVuY3Rpb25IABIUCgxvdXRwdXRfbmFtZXMYAyADKAlCCwoJZXhwcl90eXBlIocDChJFeHRlbmRlZEV4cHJlc3Npb24SIwoHdmVyc2lvbhgHIAEoCzISLnN1YnN0cmFpdC5WZXJzaW9uEkAKDmV4dGVuc2lvbl91cmlzGAEgAygLMiguc3Vic3RyYWl0LmV4dGVuc2lvbnMuU2ltcGxlRXh0ZW5zaW9uVVJJEkQKCmV4dGVuc2lvbnMYAiADKAsyMC5zdWJzdHJhaXQuZXh0ZW5zaW9ucy5TaW1wbGVFeHRlbnNpb25EZWNsYXJhdGlvbhI1Cg1yZWZlcnJlZF9leHByGAMgAygLMh4uc3Vic3RyYWl0LkV4cHJlc3Npb25SZWZlcmVuY2USKwoLYmFzZV9zY2hlbWEYBCABKAsyFi5zdWJzdHJhaXQuTmFtZWRTdHJ1Y3QSRAoTYWR2YW5jZWRfZXh0ZW5zaW9ucxgFIAEoCzInLnN1YnN0cmFpdC5leHRlbnNpb25zLkFkdmFuY2VkRXh0ZW5zaW9uEhoKEmV4cGVjdGVkX3R5cGVfdXJscxgGIAMoCUJXChJpby5zdWJzdHJhaXQucHJvdG9QAVoqZ2l0aHViLmNvbS9zdWJzdHJhaXQtaW8vc3Vic3RyYWl0LWdvL3Byb3RvqgISU3Vic3RyYWl0LlByb3RvYnVmYgZwcm90bzM", [file_substrait_algebra, file_substrait_extensions_extensions, file_substrait_plan, file_substrait_type]);

/**
 * @generated from message substrait.ExpressionReference
 */
export type ExpressionReference = Message<"substrait.ExpressionReference"> & {
  /**
   * @generated from oneof substrait.ExpressionReference.expr_type
   */
  exprType: {
    /**
     * @generated from field: substrait.Expression expression = 1;
     */
    value: Expression;
    case: "expression";
  } | {
    /**
     * @generated from field: substrait.AggregateFunction measure = 2;
     */
    value: AggregateFunction;
    case: "measure";
  } | { case: undefined; value?: undefined };

  /**
   * Field names in depth-first order
   *
   * @generated from field: repeated string output_names = 3;
   */
  outputNames: string[];
};

/**
 * Describes the message substrait.ExpressionReference.
 * Use `create(ExpressionReferenceSchema)` to create a new message.
 */
export const ExpressionReferenceSchema: GenMessage<ExpressionReference> = /*@__PURE__*/
  messageDesc(file_substrait_extended_expression, 0);

/**
 * Describe a set of operations to complete.
 * For compactness sake, identifiers are normalized at the plan level.
 *
 * @generated from message substrait.ExtendedExpression
 */
export type ExtendedExpression = Message<"substrait.ExtendedExpression"> & {
  /**
   * Substrait version of the expression. Optional up to 0.17.0, required for later
   * versions.
   *
   * @generated from field: substrait.Version version = 7;
   */
  version?: Version;

  /**
   * a list of yaml specifications this expression may depend on
   *
   * @generated from field: repeated substrait.extensions.SimpleExtensionURI extension_uris = 1;
   */
  extensionUris: SimpleExtensionURI[];

  /**
   * a list of extensions this expression may depend on
   *
   * @generated from field: repeated substrait.extensions.SimpleExtensionDeclaration extensions = 2;
   */
  extensions: SimpleExtensionDeclaration[];

  /**
   * one or more expression trees with same order in plan rel
   *
   * @generated from field: repeated substrait.ExpressionReference referred_expr = 3;
   */
  referredExpr: ExpressionReference[];

  /**
   * @generated from field: substrait.NamedStruct base_schema = 4;
   */
  baseSchema?: NamedStruct;

  /**
   * additional extensions associated with this expression.
   *
   * @generated from field: substrait.extensions.AdvancedExtension advanced_extensions = 5;
   */
  advancedExtensions?: AdvancedExtension;

  /**
   * A list of com.google.Any entities that this plan may use. Can be used to
   * warn if some embedded message types are unknown. Note that this list may
   * include message types that are ignorable (optimizations) or that are
   * unused. In many cases, a consumer may be able to work with a plan even if
   * one or more message types defined here are unknown.
   *
   * @generated from field: repeated string expected_type_urls = 6;
   */
  expectedTypeUrls: string[];
};

/**
 * Describes the message substrait.ExtendedExpression.
 * Use `create(ExtendedExpressionSchema)` to create a new message.
 */
export const ExtendedExpressionSchema: GenMessage<ExtendedExpression> = /*@__PURE__*/
  messageDesc(file_substrait_extended_expression, 1);

