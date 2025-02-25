// SPDX-License-Identifier: Apache-2.0

// @generated by protoc-gen-es v2.2.3 with parameter "target=ts"
// @generated from file substrait/function.proto (package substrait, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { ParameterizedType } from "./parameterized_types_pb";
import { file_substrait_parameterized_types } from "./parameterized_types_pb";
import type { Type } from "./type_pb";
import { file_substrait_type } from "./type_pb";
import type { DerivationExpression } from "./type_expressions_pb";
import { file_substrait_type_expressions } from "./type_expressions_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file substrait/function.proto.
 */
export const file_substrait_function: GenFile = /*@__PURE__*/
  fileDesc("ChhzdWJzdHJhaXQvZnVuY3Rpb24ucHJvdG8SCXN1YnN0cmFpdCLBFQoRRnVuY3Rpb25TaWduYXR1cmUanQIKEEZpbmFsQXJnVmFyaWFkaWMSEAoIbWluX2FyZ3MYASABKAMSEAoIbWF4X2FyZ3MYAiABKAMSVwoLY29uc2lzdGVuY3kYAyABKA4yQi5zdWJzdHJhaXQuRnVuY3Rpb25TaWduYXR1cmUuRmluYWxBcmdWYXJpYWRpYy5QYXJhbWV0ZXJDb25zaXN0ZW5jeSKLAQoUUGFyYW1ldGVyQ29uc2lzdGVuY3kSJQohUEFSQU1FVEVSX0NPTlNJU1RFTkNZX1VOU1BFQ0lGSUVEEAASJAogUEFSQU1FVEVSX0NPTlNJU1RFTkNZX0NPTlNJU1RFTlQQARImCiJQQVJBTUVURVJfQ09OU0lTVEVOQ1lfSU5DT05TSVNURU5UEAIaEAoORmluYWxBcmdOb3JtYWwa2gMKBlNjYWxhchI4Cglhcmd1bWVudHMYAiADKAsyJS5zdWJzdHJhaXQuRnVuY3Rpb25TaWduYXR1cmUuQXJndW1lbnQSDAoEbmFtZRgDIAMoCRI9CgtkZXNjcmlwdGlvbhgEIAEoCzIoLnN1YnN0cmFpdC5GdW5jdGlvblNpZ25hdHVyZS5EZXNjcmlwdGlvbhIVCg1kZXRlcm1pbmlzdGljGAcgASgIEhkKEXNlc3Npb25fZGVwZW5kZW50GAggASgIEjQKC291dHB1dF90eXBlGAkgASgLMh8uc3Vic3RyYWl0LkRlcml2YXRpb25FeHByZXNzaW9uEkEKCHZhcmlhZGljGAogASgLMi0uc3Vic3RyYWl0LkZ1bmN0aW9uU2lnbmF0dXJlLkZpbmFsQXJnVmFyaWFkaWNIABI9CgZub3JtYWwYCyABKAsyKy5zdWJzdHJhaXQuRnVuY3Rpb25TaWduYXR1cmUuRmluYWxBcmdOb3JtYWxIABJECg9pbXBsZW1lbnRhdGlvbnMYDCADKAsyKy5zdWJzdHJhaXQuRnVuY3Rpb25TaWduYXR1cmUuSW1wbGVtZW50YXRpb25CGQoXZmluYWxfdmFyaWFibGVfYmVoYXZpb3IaqwQKCUFnZ3JlZ2F0ZRI4Cglhcmd1bWVudHMYAiADKAsyJS5zdWJzdHJhaXQuRnVuY3Rpb25TaWduYXR1cmUuQXJndW1lbnQSDAoEbmFtZRgDIAEoCRI9CgtkZXNjcmlwdGlvbhgEIAEoCzIoLnN1YnN0cmFpdC5GdW5jdGlvblNpZ25hdHVyZS5EZXNjcmlwdGlvbhIVCg1kZXRlcm1pbmlzdGljGAcgASgIEhkKEXNlc3Npb25fZGVwZW5kZW50GAggASgIEjQKC291dHB1dF90eXBlGAkgASgLMh8uc3Vic3RyYWl0LkRlcml2YXRpb25FeHByZXNzaW9uEkEKCHZhcmlhZGljGAogASgLMi0uc3Vic3RyYWl0LkZ1bmN0aW9uU2lnbmF0dXJlLkZpbmFsQXJnVmFyaWFkaWNIABI9CgZub3JtYWwYCyABKAsyKy5zdWJzdHJhaXQuRnVuY3Rpb25TaWduYXR1cmUuRmluYWxBcmdOb3JtYWxIABIPCgdvcmRlcmVkGA4gASgIEg8KB21heF9zZXQYDCABKAQSKgoRaW50ZXJtZWRpYXRlX3R5cGUYDSABKAsyDy5zdWJzdHJhaXQuVHlwZRJECg9pbXBsZW1lbnRhdGlvbnMYDyADKAsyKy5zdWJzdHJhaXQuRnVuY3Rpb25TaWduYXR1cmUuSW1wbGVtZW50YXRpb25CGQoXZmluYWxfdmFyaWFibGVfYmVoYXZpb3Ia3gUKBldpbmRvdxI4Cglhcmd1bWVudHMYAiADKAsyJS5zdWJzdHJhaXQuRnVuY3Rpb25TaWduYXR1cmUuQXJndW1lbnQSDAoEbmFtZRgDIAMoCRI9CgtkZXNjcmlwdGlvbhgEIAEoCzIoLnN1YnN0cmFpdC5GdW5jdGlvblNpZ25hdHVyZS5EZXNjcmlwdGlvbhIVCg1kZXRlcm1pbmlzdGljGAcgASgIEhkKEXNlc3Npb25fZGVwZW5kZW50GAggASgIEjoKEWludGVybWVkaWF0ZV90eXBlGAkgASgLMh8uc3Vic3RyYWl0LkRlcml2YXRpb25FeHByZXNzaW9uEjQKC291dHB1dF90eXBlGAogASgLMh8uc3Vic3RyYWl0LkRlcml2YXRpb25FeHByZXNzaW9uEkEKCHZhcmlhZGljGBAgASgLMi0uc3Vic3RyYWl0LkZ1bmN0aW9uU2lnbmF0dXJlLkZpbmFsQXJnVmFyaWFkaWNIABI9CgZub3JtYWwYESABKAsyKy5zdWJzdHJhaXQuRnVuY3Rpb25TaWduYXR1cmUuRmluYWxBcmdOb3JtYWxIABIPCgdvcmRlcmVkGAsgASgIEg8KB21heF9zZXQYDCABKAQSQwoLd2luZG93X3R5cGUYDiABKA4yLi5zdWJzdHJhaXQuRnVuY3Rpb25TaWduYXR1cmUuV2luZG93LldpbmRvd1R5cGUSRAoPaW1wbGVtZW50YXRpb25zGA8gAygLMisuc3Vic3RyYWl0LkZ1bmN0aW9uU2lnbmF0dXJlLkltcGxlbWVudGF0aW9uIl8KCldpbmRvd1R5cGUSGwoXV0lORE9XX1RZUEVfVU5TUEVDSUZJRUQQABIZChVXSU5ET1dfVFlQRV9TVFJFQU1JTkcQARIZChVXSU5ET1dfVFlQRV9QQVJUSVRJT04QAkIZChdmaW5hbF92YXJpYWJsZV9iZWhhdmlvchotCgtEZXNjcmlwdGlvbhIQCghsYW5ndWFnZRgBIAEoCRIMCgRib2R5GAIgASgJGqYBCg5JbXBsZW1lbnRhdGlvbhI+CgR0eXBlGAEgASgOMjAuc3Vic3RyYWl0LkZ1bmN0aW9uU2lnbmF0dXJlLkltcGxlbWVudGF0aW9uLlR5cGUSCwoDdXJpGAIgASgJIkcKBFR5cGUSFAoQVFlQRV9VTlNQRUNJRklFRBAAEhUKEVRZUEVfV0VCX0FTU0VNQkxZEAESEgoOVFlQRV9UUklOT19KQVIQAhq1AwoIQXJndW1lbnQSDAoEbmFtZRgBIAEoCRJECgV2YWx1ZRgCIAEoCzIzLnN1YnN0cmFpdC5GdW5jdGlvblNpZ25hdHVyZS5Bcmd1bWVudC5WYWx1ZUFyZ3VtZW50SAASQgoEdHlwZRgDIAEoCzIyLnN1YnN0cmFpdC5GdW5jdGlvblNpZ25hdHVyZS5Bcmd1bWVudC5UeXBlQXJndW1lbnRIABJCCgRlbnVtGAQgASgLMjIuc3Vic3RyYWl0LkZ1bmN0aW9uU2lnbmF0dXJlLkFyZ3VtZW50LkVudW1Bcmd1bWVudEgAGk0KDVZhbHVlQXJndW1lbnQSKgoEdHlwZRgBIAEoCzIcLnN1YnN0cmFpdC5QYXJhbWV0ZXJpemVkVHlwZRIQCghjb25zdGFudBgCIAEoCBo6CgxUeXBlQXJndW1lbnQSKgoEdHlwZRgBIAEoCzIcLnN1YnN0cmFpdC5QYXJhbWV0ZXJpemVkVHlwZRoxCgxFbnVtQXJndW1lbnQSDwoHb3B0aW9ucxgBIAMoCRIQCghvcHRpb25hbBgCIAEoCEIPCg1hcmd1bWVudF9raW5kQlcKEmlvLnN1YnN0cmFpdC5wcm90b1ABWipnaXRodWIuY29tL3N1YnN0cmFpdC1pby9zdWJzdHJhaXQtZ28vcHJvdG+qAhJTdWJzdHJhaXQuUHJvdG9idWZiBnByb3RvMw", [file_substrait_parameterized_types, file_substrait_type, file_substrait_type_expressions]);

/**
 * List of function signatures available.
 *
 * @generated from message substrait.FunctionSignature
 */
export type FunctionSignature = Message<"substrait.FunctionSignature"> & {
};

/**
 * Describes the message substrait.FunctionSignature.
 * Use `create(FunctionSignatureSchema)` to create a new message.
 */
export const FunctionSignatureSchema: GenMessage<FunctionSignature> = /*@__PURE__*/
  messageDesc(file_substrait_function, 0);

/**
 * @generated from message substrait.FunctionSignature.FinalArgVariadic
 */
export type FunctionSignature_FinalArgVariadic = Message<"substrait.FunctionSignature.FinalArgVariadic"> & {
  /**
   * the minimum number of arguments allowed for the list of final arguments
   * (inclusive).
   *
   * @generated from field: int64 min_args = 1;
   */
  minArgs: bigint;

  /**
   * the maximum number of arguments allowed for the list of final arguments
   * (exclusive)
   *
   * @generated from field: int64 max_args = 2;
   */
  maxArgs: bigint;

  /**
   * the type of parameterized type consistency
   *
   * @generated from field: substrait.FunctionSignature.FinalArgVariadic.ParameterConsistency consistency = 3;
   */
  consistency: FunctionSignature_FinalArgVariadic_ParameterConsistency;
};

/**
 * Describes the message substrait.FunctionSignature.FinalArgVariadic.
 * Use `create(FunctionSignature_FinalArgVariadicSchema)` to create a new message.
 */
export const FunctionSignature_FinalArgVariadicSchema: GenMessage<FunctionSignature_FinalArgVariadic> = /*@__PURE__*/
  messageDesc(file_substrait_function, 0, 0);

/**
 * @generated from enum substrait.FunctionSignature.FinalArgVariadic.ParameterConsistency
 */
export enum FunctionSignature_FinalArgVariadic_ParameterConsistency {
  /**
   * @generated from enum value: PARAMETER_CONSISTENCY_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * All argument must be the same concrete type.
   *
   * @generated from enum value: PARAMETER_CONSISTENCY_CONSISTENT = 1;
   */
  CONSISTENT = 1,

  /**
   * Each argument can be any possible concrete type afforded by the bounds
   * of any parameter defined in the arguments specification.
   *
   * @generated from enum value: PARAMETER_CONSISTENCY_INCONSISTENT = 2;
   */
  INCONSISTENT = 2,
}

/**
 * Describes the enum substrait.FunctionSignature.FinalArgVariadic.ParameterConsistency.
 */
export const FunctionSignature_FinalArgVariadic_ParameterConsistencySchema: GenEnum<FunctionSignature_FinalArgVariadic_ParameterConsistency> = /*@__PURE__*/
  enumDesc(file_substrait_function, 0, 0, 0);

/**
 * @generated from message substrait.FunctionSignature.FinalArgNormal
 */
export type FunctionSignature_FinalArgNormal = Message<"substrait.FunctionSignature.FinalArgNormal"> & {
};

/**
 * Describes the message substrait.FunctionSignature.FinalArgNormal.
 * Use `create(FunctionSignature_FinalArgNormalSchema)` to create a new message.
 */
export const FunctionSignature_FinalArgNormalSchema: GenMessage<FunctionSignature_FinalArgNormal> = /*@__PURE__*/
  messageDesc(file_substrait_function, 0, 1);

/**
 * @generated from message substrait.FunctionSignature.Scalar
 */
export type FunctionSignature_Scalar = Message<"substrait.FunctionSignature.Scalar"> & {
  /**
   * @generated from field: repeated substrait.FunctionSignature.Argument arguments = 2;
   */
  arguments: FunctionSignature_Argument[];

  /**
   * @generated from field: repeated string name = 3;
   */
  name: string[];

  /**
   * @generated from field: substrait.FunctionSignature.Description description = 4;
   */
  description?: FunctionSignature_Description;

  /**
   * @generated from field: bool deterministic = 7;
   */
  deterministic: boolean;

  /**
   * @generated from field: bool session_dependent = 8;
   */
  sessionDependent: boolean;

  /**
   * @generated from field: substrait.DerivationExpression output_type = 9;
   */
  outputType?: DerivationExpression;

  /**
   * @generated from oneof substrait.FunctionSignature.Scalar.final_variable_behavior
   */
  finalVariableBehavior: {
    /**
     * @generated from field: substrait.FunctionSignature.FinalArgVariadic variadic = 10;
     */
    value: FunctionSignature_FinalArgVariadic;
    case: "variadic";
  } | {
    /**
     * @generated from field: substrait.FunctionSignature.FinalArgNormal normal = 11;
     */
    value: FunctionSignature_FinalArgNormal;
    case: "normal";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: repeated substrait.FunctionSignature.Implementation implementations = 12;
   */
  implementations: FunctionSignature_Implementation[];
};

/**
 * Describes the message substrait.FunctionSignature.Scalar.
 * Use `create(FunctionSignature_ScalarSchema)` to create a new message.
 */
export const FunctionSignature_ScalarSchema: GenMessage<FunctionSignature_Scalar> = /*@__PURE__*/
  messageDesc(file_substrait_function, 0, 2);

/**
 * @generated from message substrait.FunctionSignature.Aggregate
 */
export type FunctionSignature_Aggregate = Message<"substrait.FunctionSignature.Aggregate"> & {
  /**
   * @generated from field: repeated substrait.FunctionSignature.Argument arguments = 2;
   */
  arguments: FunctionSignature_Argument[];

  /**
   * @generated from field: string name = 3;
   */
  name: string;

  /**
   * @generated from field: substrait.FunctionSignature.Description description = 4;
   */
  description?: FunctionSignature_Description;

  /**
   * @generated from field: bool deterministic = 7;
   */
  deterministic: boolean;

  /**
   * @generated from field: bool session_dependent = 8;
   */
  sessionDependent: boolean;

  /**
   * @generated from field: substrait.DerivationExpression output_type = 9;
   */
  outputType?: DerivationExpression;

  /**
   * @generated from oneof substrait.FunctionSignature.Aggregate.final_variable_behavior
   */
  finalVariableBehavior: {
    /**
     * @generated from field: substrait.FunctionSignature.FinalArgVariadic variadic = 10;
     */
    value: FunctionSignature_FinalArgVariadic;
    case: "variadic";
  } | {
    /**
     * @generated from field: substrait.FunctionSignature.FinalArgNormal normal = 11;
     */
    value: FunctionSignature_FinalArgNormal;
    case: "normal";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: bool ordered = 14;
   */
  ordered: boolean;

  /**
   * @generated from field: uint64 max_set = 12;
   */
  maxSet: bigint;

  /**
   * @generated from field: substrait.Type intermediate_type = 13;
   */
  intermediateType?: Type;

  /**
   * @generated from field: repeated substrait.FunctionSignature.Implementation implementations = 15;
   */
  implementations: FunctionSignature_Implementation[];
};

/**
 * Describes the message substrait.FunctionSignature.Aggregate.
 * Use `create(FunctionSignature_AggregateSchema)` to create a new message.
 */
export const FunctionSignature_AggregateSchema: GenMessage<FunctionSignature_Aggregate> = /*@__PURE__*/
  messageDesc(file_substrait_function, 0, 3);

/**
 * @generated from message substrait.FunctionSignature.Window
 */
export type FunctionSignature_Window = Message<"substrait.FunctionSignature.Window"> & {
  /**
   * @generated from field: repeated substrait.FunctionSignature.Argument arguments = 2;
   */
  arguments: FunctionSignature_Argument[];

  /**
   * @generated from field: repeated string name = 3;
   */
  name: string[];

  /**
   * @generated from field: substrait.FunctionSignature.Description description = 4;
   */
  description?: FunctionSignature_Description;

  /**
   * @generated from field: bool deterministic = 7;
   */
  deterministic: boolean;

  /**
   * @generated from field: bool session_dependent = 8;
   */
  sessionDependent: boolean;

  /**
   * @generated from field: substrait.DerivationExpression intermediate_type = 9;
   */
  intermediateType?: DerivationExpression;

  /**
   * @generated from field: substrait.DerivationExpression output_type = 10;
   */
  outputType?: DerivationExpression;

  /**
   * @generated from oneof substrait.FunctionSignature.Window.final_variable_behavior
   */
  finalVariableBehavior: {
    /**
     * @generated from field: substrait.FunctionSignature.FinalArgVariadic variadic = 16;
     */
    value: FunctionSignature_FinalArgVariadic;
    case: "variadic";
  } | {
    /**
     * @generated from field: substrait.FunctionSignature.FinalArgNormal normal = 17;
     */
    value: FunctionSignature_FinalArgNormal;
    case: "normal";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: bool ordered = 11;
   */
  ordered: boolean;

  /**
   * @generated from field: uint64 max_set = 12;
   */
  maxSet: bigint;

  /**
   * @generated from field: substrait.FunctionSignature.Window.WindowType window_type = 14;
   */
  windowType: FunctionSignature_Window_WindowType;

  /**
   * @generated from field: repeated substrait.FunctionSignature.Implementation implementations = 15;
   */
  implementations: FunctionSignature_Implementation[];
};

/**
 * Describes the message substrait.FunctionSignature.Window.
 * Use `create(FunctionSignature_WindowSchema)` to create a new message.
 */
export const FunctionSignature_WindowSchema: GenMessage<FunctionSignature_Window> = /*@__PURE__*/
  messageDesc(file_substrait_function, 0, 4);

/**
 * @generated from enum substrait.FunctionSignature.Window.WindowType
 */
export enum FunctionSignature_Window_WindowType {
  /**
   * @generated from enum value: WINDOW_TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: WINDOW_TYPE_STREAMING = 1;
   */
  STREAMING = 1,

  /**
   * @generated from enum value: WINDOW_TYPE_PARTITION = 2;
   */
  PARTITION = 2,
}

/**
 * Describes the enum substrait.FunctionSignature.Window.WindowType.
 */
export const FunctionSignature_Window_WindowTypeSchema: GenEnum<FunctionSignature_Window_WindowType> = /*@__PURE__*/
  enumDesc(file_substrait_function, 0, 4, 0);

/**
 * @generated from message substrait.FunctionSignature.Description
 */
export type FunctionSignature_Description = Message<"substrait.FunctionSignature.Description"> & {
  /**
   * @generated from field: string language = 1;
   */
  language: string;

  /**
   * @generated from field: string body = 2;
   */
  body: string;
};

/**
 * Describes the message substrait.FunctionSignature.Description.
 * Use `create(FunctionSignature_DescriptionSchema)` to create a new message.
 */
export const FunctionSignature_DescriptionSchema: GenMessage<FunctionSignature_Description> = /*@__PURE__*/
  messageDesc(file_substrait_function, 0, 5);

/**
 * @generated from message substrait.FunctionSignature.Implementation
 */
export type FunctionSignature_Implementation = Message<"substrait.FunctionSignature.Implementation"> & {
  /**
   * @generated from field: substrait.FunctionSignature.Implementation.Type type = 1;
   */
  type: FunctionSignature_Implementation_Type;

  /**
   * @generated from field: string uri = 2;
   */
  uri: string;
};

/**
 * Describes the message substrait.FunctionSignature.Implementation.
 * Use `create(FunctionSignature_ImplementationSchema)` to create a new message.
 */
export const FunctionSignature_ImplementationSchema: GenMessage<FunctionSignature_Implementation> = /*@__PURE__*/
  messageDesc(file_substrait_function, 0, 6);

/**
 * @generated from enum substrait.FunctionSignature.Implementation.Type
 */
export enum FunctionSignature_Implementation_Type {
  /**
   * @generated from enum value: TYPE_UNSPECIFIED = 0;
   */
  UNSPECIFIED = 0,

  /**
   * @generated from enum value: TYPE_WEB_ASSEMBLY = 1;
   */
  WEB_ASSEMBLY = 1,

  /**
   * @generated from enum value: TYPE_TRINO_JAR = 2;
   */
  TRINO_JAR = 2,
}

/**
 * Describes the enum substrait.FunctionSignature.Implementation.Type.
 */
export const FunctionSignature_Implementation_TypeSchema: GenEnum<FunctionSignature_Implementation_Type> = /*@__PURE__*/
  enumDesc(file_substrait_function, 0, 6, 0);

/**
 * @generated from message substrait.FunctionSignature.Argument
 */
export type FunctionSignature_Argument = Message<"substrait.FunctionSignature.Argument"> & {
  /**
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * @generated from oneof substrait.FunctionSignature.Argument.argument_kind
   */
  argumentKind: {
    /**
     * @generated from field: substrait.FunctionSignature.Argument.ValueArgument value = 2;
     */
    value: FunctionSignature_Argument_ValueArgument;
    case: "value";
  } | {
    /**
     * @generated from field: substrait.FunctionSignature.Argument.TypeArgument type = 3;
     */
    value: FunctionSignature_Argument_TypeArgument;
    case: "type";
  } | {
    /**
     * @generated from field: substrait.FunctionSignature.Argument.EnumArgument enum = 4;
     */
    value: FunctionSignature_Argument_EnumArgument;
    case: "enum";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message substrait.FunctionSignature.Argument.
 * Use `create(FunctionSignature_ArgumentSchema)` to create a new message.
 */
export const FunctionSignature_ArgumentSchema: GenMessage<FunctionSignature_Argument> = /*@__PURE__*/
  messageDesc(file_substrait_function, 0, 7);

/**
 * @generated from message substrait.FunctionSignature.Argument.ValueArgument
 */
export type FunctionSignature_Argument_ValueArgument = Message<"substrait.FunctionSignature.Argument.ValueArgument"> & {
  /**
   * @generated from field: substrait.ParameterizedType type = 1;
   */
  type?: ParameterizedType;

  /**
   * @generated from field: bool constant = 2;
   */
  constant: boolean;
};

/**
 * Describes the message substrait.FunctionSignature.Argument.ValueArgument.
 * Use `create(FunctionSignature_Argument_ValueArgumentSchema)` to create a new message.
 */
export const FunctionSignature_Argument_ValueArgumentSchema: GenMessage<FunctionSignature_Argument_ValueArgument> = /*@__PURE__*/
  messageDesc(file_substrait_function, 0, 7, 0);

/**
 * @generated from message substrait.FunctionSignature.Argument.TypeArgument
 */
export type FunctionSignature_Argument_TypeArgument = Message<"substrait.FunctionSignature.Argument.TypeArgument"> & {
  /**
   * @generated from field: substrait.ParameterizedType type = 1;
   */
  type?: ParameterizedType;
};

/**
 * Describes the message substrait.FunctionSignature.Argument.TypeArgument.
 * Use `create(FunctionSignature_Argument_TypeArgumentSchema)` to create a new message.
 */
export const FunctionSignature_Argument_TypeArgumentSchema: GenMessage<FunctionSignature_Argument_TypeArgument> = /*@__PURE__*/
  messageDesc(file_substrait_function, 0, 7, 1);

/**
 * @generated from message substrait.FunctionSignature.Argument.EnumArgument
 */
export type FunctionSignature_Argument_EnumArgument = Message<"substrait.FunctionSignature.Argument.EnumArgument"> & {
  /**
   * @generated from field: repeated string options = 1;
   */
  options: string[];

  /**
   * @generated from field: bool optional = 2;
   */
  optional: boolean;
};

/**
 * Describes the message substrait.FunctionSignature.Argument.EnumArgument.
 * Use `create(FunctionSignature_Argument_EnumArgumentSchema)` to create a new message.
 */
export const FunctionSignature_Argument_EnumArgumentSchema: GenMessage<FunctionSignature_Argument_EnumArgument> = /*@__PURE__*/
  messageDesc(file_substrait_function, 0, 7, 2);

