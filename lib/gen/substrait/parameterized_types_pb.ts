// SPDX-License-Identifier: Apache-2.0

// @generated by protoc-gen-es v2.2.3 with parameter "target=ts"
// @generated from file substrait/parameterized_types.proto (package substrait, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from '@bufbuild/protobuf/codegenv1';
import { fileDesc, messageDesc } from '@bufbuild/protobuf/codegenv1';
import type {
  Type_Binary,
  Type_Boolean,
  Type_Date,
  Type_FP32,
  Type_FP64,
  Type_I16,
  Type_I32,
  Type_I64,
  Type_I8,
  Type_IntervalDay,
  Type_IntervalYear,
  Type_Nullability,
  Type_String,
  Type_Time,
  Type_Timestamp,
  Type_TimestampTZ,
  Type_UUID,
} from './type_pb';
import { file_substrait_type } from './type_pb';
import type { Message } from '@bufbuild/protobuf';

/**
 * Describes the file substrait/parameterized_types.proto.
 */
export const file_substrait_parameterized_types: GenFile =
  /*@__PURE__*/
  fileDesc(
    'CiNzdWJzdHJhaXQvcGFyYW1ldGVyaXplZF90eXBlcy5wcm90bxIJc3Vic3RyYWl0IrQdChFQYXJhbWV0ZXJpemVkVHlwZRInCgRib29sGAEgASgLMhcuc3Vic3RyYWl0LlR5cGUuQm9vbGVhbkgAEiAKAmk4GAIgASgLMhIuc3Vic3RyYWl0LlR5cGUuSThIABIiCgNpMTYYAyABKAsyEy5zdWJzdHJhaXQuVHlwZS5JMTZIABIiCgNpMzIYBSABKAsyEy5zdWJzdHJhaXQuVHlwZS5JMzJIABIiCgNpNjQYByABKAsyEy5zdWJzdHJhaXQuVHlwZS5JNjRIABIkCgRmcDMyGAogASgLMhQuc3Vic3RyYWl0LlR5cGUuRlAzMkgAEiQKBGZwNjQYCyABKAsyFC5zdWJzdHJhaXQuVHlwZS5GUDY0SAASKAoGc3RyaW5nGAwgASgLMhYuc3Vic3RyYWl0LlR5cGUuU3RyaW5nSAASKAoGYmluYXJ5GA0gASgLMhYuc3Vic3RyYWl0LlR5cGUuQmluYXJ5SAASMgoJdGltZXN0YW1wGA4gASgLMhkuc3Vic3RyYWl0LlR5cGUuVGltZXN0YW1wQgIYAUgAEiQKBGRhdGUYECABKAsyFC5zdWJzdHJhaXQuVHlwZS5EYXRlSAASJAoEdGltZRgRIAEoCzIULnN1YnN0cmFpdC5UeXBlLlRpbWVIABI1Cg1pbnRlcnZhbF95ZWFyGBMgASgLMhwuc3Vic3RyYWl0LlR5cGUuSW50ZXJ2YWxZZWFySAASMwoMaW50ZXJ2YWxfZGF5GBQgASgLMhsuc3Vic3RyYWl0LlR5cGUuSW50ZXJ2YWxEYXlIABI3Cgx0aW1lc3RhbXBfdHoYHSABKAsyGy5zdWJzdHJhaXQuVHlwZS5UaW1lc3RhbXBUWkICGAFIABIkCgR1dWlkGCAgASgLMhQuc3Vic3RyYWl0LlR5cGUuVVVJREgAEkkKCmZpeGVkX2NoYXIYFSABKAsyMy5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuUGFyYW1ldGVyaXplZEZpeGVkQ2hhckgAEkQKB3ZhcmNoYXIYFiABKAsyMS5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuUGFyYW1ldGVyaXplZFZhckNoYXJIABJNCgxmaXhlZF9iaW5hcnkYFyABKAsyNS5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuUGFyYW1ldGVyaXplZEZpeGVkQmluYXJ5SAASRAoHZGVjaW1hbBgYIAEoCzIxLnN1YnN0cmFpdC5QYXJhbWV0ZXJpemVkVHlwZS5QYXJhbWV0ZXJpemVkRGVjaW1hbEgAElsKE3ByZWNpc2lvbl90aW1lc3RhbXAYIiABKAsyPC5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuUGFyYW1ldGVyaXplZFByZWNpc2lvblRpbWVzdGFtcEgAEmAKFnByZWNpc2lvbl90aW1lc3RhbXBfdHoYIyABKAsyPi5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuUGFyYW1ldGVyaXplZFByZWNpc2lvblRpbWVzdGFtcFRaSAASQgoGc3RydWN0GBkgASgLMjAuc3Vic3RyYWl0LlBhcmFtZXRlcml6ZWRUeXBlLlBhcmFtZXRlcml6ZWRTdHJ1Y3RIABI+CgRsaXN0GBsgASgLMi4uc3Vic3RyYWl0LlBhcmFtZXRlcml6ZWRUeXBlLlBhcmFtZXRlcml6ZWRMaXN0SAASPAoDbWFwGBwgASgLMi0uc3Vic3RyYWl0LlBhcmFtZXRlcml6ZWRUeXBlLlBhcmFtZXRlcml6ZWRNYXBIABJNCgx1c2VyX2RlZmluZWQYHiABKAsyNS5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuUGFyYW1ldGVyaXplZFVzZXJEZWZpbmVkSAASIgoUdXNlcl9kZWZpbmVkX3BvaW50ZXIYHyABKA1CAhgBSAASRAoOdHlwZV9wYXJhbWV0ZXIYISABKAsyKi5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuVHlwZVBhcmFtZXRlckgAGksKDVR5cGVQYXJhbWV0ZXISDAoEbmFtZRgBIAEoCRIsCgZib3VuZHMYAiADKAsyHC5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUauAEKEEludGVnZXJQYXJhbWV0ZXISDAoEbmFtZRgBIAEoCRJLChVyYW5nZV9zdGFydF9pbmNsdXNpdmUYAiABKAsyLC5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuTnVsbGFibGVJbnRlZ2VyEkkKE3JhbmdlX2VuZF9leGNsdXNpdmUYAyABKAsyLC5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuTnVsbGFibGVJbnRlZ2VyGiAKD051bGxhYmxlSW50ZWdlchINCgV2YWx1ZRgBIAEoAxqhAQoWUGFyYW1ldGVyaXplZEZpeGVkQ2hhchI6CgZsZW5ndGgYASABKAsyKi5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuSW50ZWdlck9wdGlvbhIZChF2YXJpYXRpb25fcG9pbnRlchgCIAEoDRIwCgtudWxsYWJpbGl0eRgDIAEoDjIbLnN1YnN0cmFpdC5UeXBlLk51bGxhYmlsaXR5Gp8BChRQYXJhbWV0ZXJpemVkVmFyQ2hhchI6CgZsZW5ndGgYASABKAsyKi5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuSW50ZWdlck9wdGlvbhIZChF2YXJpYXRpb25fcG9pbnRlchgCIAEoDRIwCgtudWxsYWJpbGl0eRgDIAEoDjIbLnN1YnN0cmFpdC5UeXBlLk51bGxhYmlsaXR5GqMBChhQYXJhbWV0ZXJpemVkRml4ZWRCaW5hcnkSOgoGbGVuZ3RoGAEgASgLMiouc3Vic3RyYWl0LlBhcmFtZXRlcml6ZWRUeXBlLkludGVnZXJPcHRpb24SGQoRdmFyaWF0aW9uX3BvaW50ZXIYAiABKA0SMAoLbnVsbGFiaWxpdHkYAyABKA4yGy5zdWJzdHJhaXQuVHlwZS5OdWxsYWJpbGl0eRrdAQoUUGFyYW1ldGVyaXplZERlY2ltYWwSOQoFc2NhbGUYASABKAsyKi5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuSW50ZWdlck9wdGlvbhI9CglwcmVjaXNpb24YAiABKAsyKi5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuSW50ZWdlck9wdGlvbhIZChF2YXJpYXRpb25fcG9pbnRlchgDIAEoDRIwCgtudWxsYWJpbGl0eRgEIAEoDjIbLnN1YnN0cmFpdC5UeXBlLk51bGxhYmlsaXR5Gq0BCh9QYXJhbWV0ZXJpemVkUHJlY2lzaW9uVGltZXN0YW1wEj0KCXByZWNpc2lvbhgBIAEoCzIqLnN1YnN0cmFpdC5QYXJhbWV0ZXJpemVkVHlwZS5JbnRlZ2VyT3B0aW9uEhkKEXZhcmlhdGlvbl9wb2ludGVyGAIgASgNEjAKC251bGxhYmlsaXR5GAMgASgOMhsuc3Vic3RyYWl0LlR5cGUuTnVsbGFiaWxpdHkarwEKIVBhcmFtZXRlcml6ZWRQcmVjaXNpb25UaW1lc3RhbXBUWhI9CglwcmVjaXNpb24YASABKAsyKi5zdWJzdHJhaXQuUGFyYW1ldGVyaXplZFR5cGUuSW50ZWdlck9wdGlvbhIZChF2YXJpYXRpb25fcG9pbnRlchgCIAEoDRIwCgtudWxsYWJpbGl0eRgDIAEoDjIbLnN1YnN0cmFpdC5UeXBlLk51bGxhYmlsaXR5Go8BChNQYXJhbWV0ZXJpemVkU3RydWN0EisKBXR5cGVzGAEgAygLMhwuc3Vic3RyYWl0LlBhcmFtZXRlcml6ZWRUeXBlEhkKEXZhcmlhdGlvbl9wb2ludGVyGAIgASgNEjAKC251bGxhYmlsaXR5GAMgASgOMhsuc3Vic3RyYWl0LlR5cGUuTnVsbGFiaWxpdHkaawoYUGFyYW1ldGVyaXplZE5hbWVkU3RydWN0Eg0KBW5hbWVzGAEgAygJEkAKBnN0cnVjdBgCIAEoCzIwLnN1YnN0cmFpdC5QYXJhbWV0ZXJpemVkVHlwZS5QYXJhbWV0ZXJpemVkU3RydWN0GowBChFQYXJhbWV0ZXJpemVkTGlzdBIqCgR0eXBlGAEgASgLMhwuc3Vic3RyYWl0LlBhcmFtZXRlcml6ZWRUeXBlEhkKEXZhcmlhdGlvbl9wb2ludGVyGAIgASgNEjAKC251bGxhYmlsaXR5GAMgASgOMhsuc3Vic3RyYWl0LlR5cGUuTnVsbGFiaWxpdHkatwEKEFBhcmFtZXRlcml6ZWRNYXASKQoDa2V5GAEgASgLMhwuc3Vic3RyYWl0LlBhcmFtZXRlcml6ZWRUeXBlEisKBXZhbHVlGAIgASgLMhwuc3Vic3RyYWl0LlBhcmFtZXRlcml6ZWRUeXBlEhkKEXZhcmlhdGlvbl9wb2ludGVyGAMgASgNEjAKC251bGxhYmlsaXR5GAQgASgOMhsuc3Vic3RyYWl0LlR5cGUuTnVsbGFiaWxpdHkafQoYUGFyYW1ldGVyaXplZFVzZXJEZWZpbmVkEhQKDHR5cGVfcG9pbnRlchgBIAEoDRIZChF2YXJpYXRpb25fcG9pbnRlchgCIAEoDRIwCgtudWxsYWJpbGl0eRgDIAEoDjIbLnN1YnN0cmFpdC5UeXBlLk51bGxhYmlsaXR5GnYKDUludGVnZXJPcHRpb24SEQoHbGl0ZXJhbBgBIAEoBUgAEkIKCXBhcmFtZXRlchgCIAEoCzItLnN1YnN0cmFpdC5QYXJhbWV0ZXJpemVkVHlwZS5JbnRlZ2VyUGFyYW1ldGVySABCDgoMaW50ZWdlcl90eXBlQgYKBGtpbmRCVwoSaW8uc3Vic3RyYWl0LnByb3RvUAFaKmdpdGh1Yi5jb20vc3Vic3RyYWl0LWlvL3N1YnN0cmFpdC1nby9wcm90b6oCElN1YnN0cmFpdC5Qcm90b2J1ZmIGcHJvdG8z',
    [file_substrait_type],
  );

/**
 * @generated from message substrait.ParameterizedType
 */
export type ParameterizedType = Message<'substrait.ParameterizedType'> & {
  /**
   * @generated from oneof substrait.ParameterizedType.kind
   */
  kind:
    | {
        /**
         * @generated from field: substrait.Type.Boolean bool = 1;
         */
        value: Type_Boolean;
        case: 'bool';
      }
    | {
        /**
         * @generated from field: substrait.Type.I8 i8 = 2;
         */
        value: Type_I8;
        case: 'i8';
      }
    | {
        /**
         * @generated from field: substrait.Type.I16 i16 = 3;
         */
        value: Type_I16;
        case: 'i16';
      }
    | {
        /**
         * @generated from field: substrait.Type.I32 i32 = 5;
         */
        value: Type_I32;
        case: 'i32';
      }
    | {
        /**
         * @generated from field: substrait.Type.I64 i64 = 7;
         */
        value: Type_I64;
        case: 'i64';
      }
    | {
        /**
         * @generated from field: substrait.Type.FP32 fp32 = 10;
         */
        value: Type_FP32;
        case: 'fp32';
      }
    | {
        /**
         * @generated from field: substrait.Type.FP64 fp64 = 11;
         */
        value: Type_FP64;
        case: 'fp64';
      }
    | {
        /**
         * @generated from field: substrait.Type.String string = 12;
         */
        value: Type_String;
        case: 'string';
      }
    | {
        /**
         * @generated from field: substrait.Type.Binary binary = 13;
         */
        value: Type_Binary;
        case: 'binary';
      }
    | {
        /**
         * Deprecated in favor of `ParameterizedPrecisionTimestamp precision_timestamp`
         *
         * @generated from field: substrait.Type.Timestamp timestamp = 14 [deprecated = true];
         * @deprecated
         */
        value: Type_Timestamp;
        case: 'timestamp';
      }
    | {
        /**
         * @generated from field: substrait.Type.Date date = 16;
         */
        value: Type_Date;
        case: 'date';
      }
    | {
        /**
         * @generated from field: substrait.Type.Time time = 17;
         */
        value: Type_Time;
        case: 'time';
      }
    | {
        /**
         * @generated from field: substrait.Type.IntervalYear interval_year = 19;
         */
        value: Type_IntervalYear;
        case: 'intervalYear';
      }
    | {
        /**
         * @generated from field: substrait.Type.IntervalDay interval_day = 20;
         */
        value: Type_IntervalDay;
        case: 'intervalDay';
      }
    | {
        /**
         * Deprecated in favor of `ParameterizedPrecisionTimestampTZ precision_timestamp_tz`
         *
         * @generated from field: substrait.Type.TimestampTZ timestamp_tz = 29 [deprecated = true];
         * @deprecated
         */
        value: Type_TimestampTZ;
        case: 'timestampTz';
      }
    | {
        /**
         * @generated from field: substrait.Type.UUID uuid = 32;
         */
        value: Type_UUID;
        case: 'uuid';
      }
    | {
        /**
         * @generated from field: substrait.ParameterizedType.ParameterizedFixedChar fixed_char = 21;
         */
        value: ParameterizedType_ParameterizedFixedChar;
        case: 'fixedChar';
      }
    | {
        /**
         * @generated from field: substrait.ParameterizedType.ParameterizedVarChar varchar = 22;
         */
        value: ParameterizedType_ParameterizedVarChar;
        case: 'varchar';
      }
    | {
        /**
         * @generated from field: substrait.ParameterizedType.ParameterizedFixedBinary fixed_binary = 23;
         */
        value: ParameterizedType_ParameterizedFixedBinary;
        case: 'fixedBinary';
      }
    | {
        /**
         * @generated from field: substrait.ParameterizedType.ParameterizedDecimal decimal = 24;
         */
        value: ParameterizedType_ParameterizedDecimal;
        case: 'decimal';
      }
    | {
        /**
         * @generated from field: substrait.ParameterizedType.ParameterizedPrecisionTimestamp precision_timestamp = 34;
         */
        value: ParameterizedType_ParameterizedPrecisionTimestamp;
        case: 'precisionTimestamp';
      }
    | {
        /**
         * @generated from field: substrait.ParameterizedType.ParameterizedPrecisionTimestampTZ precision_timestamp_tz = 35;
         */
        value: ParameterizedType_ParameterizedPrecisionTimestampTZ;
        case: 'precisionTimestampTz';
      }
    | {
        /**
         * @generated from field: substrait.ParameterizedType.ParameterizedStruct struct = 25;
         */
        value: ParameterizedType_ParameterizedStruct;
        case: 'struct';
      }
    | {
        /**
         * @generated from field: substrait.ParameterizedType.ParameterizedList list = 27;
         */
        value: ParameterizedType_ParameterizedList;
        case: 'list';
      }
    | {
        /**
         * @generated from field: substrait.ParameterizedType.ParameterizedMap map = 28;
         */
        value: ParameterizedType_ParameterizedMap;
        case: 'map';
      }
    | {
        /**
         * @generated from field: substrait.ParameterizedType.ParameterizedUserDefined user_defined = 30;
         */
        value: ParameterizedType_ParameterizedUserDefined;
        case: 'userDefined';
      }
    | {
        /**
         * Deprecated in favor of user_defined, which allows nullability and
         * variations to be specified. If user_defined_pointer is encountered,
         * treat it as being non-nullable and having the default variation.
         *
         * @generated from field: uint32 user_defined_pointer = 31 [deprecated = true];
         * @deprecated
         */
        value: number;
        case: 'userDefinedPointer';
      }
    | {
        /**
         * @generated from field: substrait.ParameterizedType.TypeParameter type_parameter = 33;
         */
        value: ParameterizedType_TypeParameter;
        case: 'typeParameter';
      }
    | { case: undefined; value?: undefined };
};

/**
 * Describes the message substrait.ParameterizedType.
 * Use `create(ParameterizedTypeSchema)` to create a new message.
 */
export const ParameterizedTypeSchema: GenMessage<ParameterizedType> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0);

/**
 * @generated from message substrait.ParameterizedType.TypeParameter
 */
export type ParameterizedType_TypeParameter =
  Message<'substrait.ParameterizedType.TypeParameter'> & {
    /**
     * @generated from field: string name = 1;
     */
    name: string;

    /**
     * @generated from field: repeated substrait.ParameterizedType bounds = 2;
     */
    bounds: ParameterizedType[];
  };

/**
 * Describes the message substrait.ParameterizedType.TypeParameter.
 * Use `create(ParameterizedType_TypeParameterSchema)` to create a new message.
 */
export const ParameterizedType_TypeParameterSchema: GenMessage<ParameterizedType_TypeParameter> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 0);

/**
 * @generated from message substrait.ParameterizedType.IntegerParameter
 */
export type ParameterizedType_IntegerParameter =
  Message<'substrait.ParameterizedType.IntegerParameter'> & {
    /**
     * @generated from field: string name = 1;
     */
    name: string;

    /**
     * @generated from field: substrait.ParameterizedType.NullableInteger range_start_inclusive = 2;
     */
    rangeStartInclusive?: ParameterizedType_NullableInteger;

    /**
     * @generated from field: substrait.ParameterizedType.NullableInteger range_end_exclusive = 3;
     */
    rangeEndExclusive?: ParameterizedType_NullableInteger;
  };

/**
 * Describes the message substrait.ParameterizedType.IntegerParameter.
 * Use `create(ParameterizedType_IntegerParameterSchema)` to create a new message.
 */
export const ParameterizedType_IntegerParameterSchema: GenMessage<ParameterizedType_IntegerParameter> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 1);

/**
 * @generated from message substrait.ParameterizedType.NullableInteger
 */
export type ParameterizedType_NullableInteger =
  Message<'substrait.ParameterizedType.NullableInteger'> & {
    /**
     * @generated from field: int64 value = 1;
     */
    value: bigint;
  };

/**
 * Describes the message substrait.ParameterizedType.NullableInteger.
 * Use `create(ParameterizedType_NullableIntegerSchema)` to create a new message.
 */
export const ParameterizedType_NullableIntegerSchema: GenMessage<ParameterizedType_NullableInteger> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 2);

/**
 * @generated from message substrait.ParameterizedType.ParameterizedFixedChar
 */
export type ParameterizedType_ParameterizedFixedChar =
  Message<'substrait.ParameterizedType.ParameterizedFixedChar'> & {
    /**
     * @generated from field: substrait.ParameterizedType.IntegerOption length = 1;
     */
    length?: ParameterizedType_IntegerOption;

    /**
     * @generated from field: uint32 variation_pointer = 2;
     */
    variationPointer: number;

    /**
     * @generated from field: substrait.Type.Nullability nullability = 3;
     */
    nullability: Type_Nullability;
  };

/**
 * Describes the message substrait.ParameterizedType.ParameterizedFixedChar.
 * Use `create(ParameterizedType_ParameterizedFixedCharSchema)` to create a new message.
 */
export const ParameterizedType_ParameterizedFixedCharSchema: GenMessage<ParameterizedType_ParameterizedFixedChar> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 3);

/**
 * @generated from message substrait.ParameterizedType.ParameterizedVarChar
 */
export type ParameterizedType_ParameterizedVarChar =
  Message<'substrait.ParameterizedType.ParameterizedVarChar'> & {
    /**
     * @generated from field: substrait.ParameterizedType.IntegerOption length = 1;
     */
    length?: ParameterizedType_IntegerOption;

    /**
     * @generated from field: uint32 variation_pointer = 2;
     */
    variationPointer: number;

    /**
     * @generated from field: substrait.Type.Nullability nullability = 3;
     */
    nullability: Type_Nullability;
  };

/**
 * Describes the message substrait.ParameterizedType.ParameterizedVarChar.
 * Use `create(ParameterizedType_ParameterizedVarCharSchema)` to create a new message.
 */
export const ParameterizedType_ParameterizedVarCharSchema: GenMessage<ParameterizedType_ParameterizedVarChar> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 4);

/**
 * @generated from message substrait.ParameterizedType.ParameterizedFixedBinary
 */
export type ParameterizedType_ParameterizedFixedBinary =
  Message<'substrait.ParameterizedType.ParameterizedFixedBinary'> & {
    /**
     * @generated from field: substrait.ParameterizedType.IntegerOption length = 1;
     */
    length?: ParameterizedType_IntegerOption;

    /**
     * @generated from field: uint32 variation_pointer = 2;
     */
    variationPointer: number;

    /**
     * @generated from field: substrait.Type.Nullability nullability = 3;
     */
    nullability: Type_Nullability;
  };

/**
 * Describes the message substrait.ParameterizedType.ParameterizedFixedBinary.
 * Use `create(ParameterizedType_ParameterizedFixedBinarySchema)` to create a new message.
 */
export const ParameterizedType_ParameterizedFixedBinarySchema: GenMessage<ParameterizedType_ParameterizedFixedBinary> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 5);

/**
 * @generated from message substrait.ParameterizedType.ParameterizedDecimal
 */
export type ParameterizedType_ParameterizedDecimal =
  Message<'substrait.ParameterizedType.ParameterizedDecimal'> & {
    /**
     * @generated from field: substrait.ParameterizedType.IntegerOption scale = 1;
     */
    scale?: ParameterizedType_IntegerOption;

    /**
     * @generated from field: substrait.ParameterizedType.IntegerOption precision = 2;
     */
    precision?: ParameterizedType_IntegerOption;

    /**
     * @generated from field: uint32 variation_pointer = 3;
     */
    variationPointer: number;

    /**
     * @generated from field: substrait.Type.Nullability nullability = 4;
     */
    nullability: Type_Nullability;
  };

/**
 * Describes the message substrait.ParameterizedType.ParameterizedDecimal.
 * Use `create(ParameterizedType_ParameterizedDecimalSchema)` to create a new message.
 */
export const ParameterizedType_ParameterizedDecimalSchema: GenMessage<ParameterizedType_ParameterizedDecimal> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 6);

/**
 * @generated from message substrait.ParameterizedType.ParameterizedPrecisionTimestamp
 */
export type ParameterizedType_ParameterizedPrecisionTimestamp =
  Message<'substrait.ParameterizedType.ParameterizedPrecisionTimestamp'> & {
    /**
     * @generated from field: substrait.ParameterizedType.IntegerOption precision = 1;
     */
    precision?: ParameterizedType_IntegerOption;

    /**
     * @generated from field: uint32 variation_pointer = 2;
     */
    variationPointer: number;

    /**
     * @generated from field: substrait.Type.Nullability nullability = 3;
     */
    nullability: Type_Nullability;
  };

/**
 * Describes the message substrait.ParameterizedType.ParameterizedPrecisionTimestamp.
 * Use `create(ParameterizedType_ParameterizedPrecisionTimestampSchema)` to create a new message.
 */
export const ParameterizedType_ParameterizedPrecisionTimestampSchema: GenMessage<ParameterizedType_ParameterizedPrecisionTimestamp> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 7);

/**
 * @generated from message substrait.ParameterizedType.ParameterizedPrecisionTimestampTZ
 */
export type ParameterizedType_ParameterizedPrecisionTimestampTZ =
  Message<'substrait.ParameterizedType.ParameterizedPrecisionTimestampTZ'> & {
    /**
     * @generated from field: substrait.ParameterizedType.IntegerOption precision = 1;
     */
    precision?: ParameterizedType_IntegerOption;

    /**
     * @generated from field: uint32 variation_pointer = 2;
     */
    variationPointer: number;

    /**
     * @generated from field: substrait.Type.Nullability nullability = 3;
     */
    nullability: Type_Nullability;
  };

/**
 * Describes the message substrait.ParameterizedType.ParameterizedPrecisionTimestampTZ.
 * Use `create(ParameterizedType_ParameterizedPrecisionTimestampTZSchema)` to create a new message.
 */
export const ParameterizedType_ParameterizedPrecisionTimestampTZSchema: GenMessage<ParameterizedType_ParameterizedPrecisionTimestampTZ> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 8);

/**
 * @generated from message substrait.ParameterizedType.ParameterizedStruct
 */
export type ParameterizedType_ParameterizedStruct =
  Message<'substrait.ParameterizedType.ParameterizedStruct'> & {
    /**
     * @generated from field: repeated substrait.ParameterizedType types = 1;
     */
    types: ParameterizedType[];

    /**
     * @generated from field: uint32 variation_pointer = 2;
     */
    variationPointer: number;

    /**
     * @generated from field: substrait.Type.Nullability nullability = 3;
     */
    nullability: Type_Nullability;
  };

/**
 * Describes the message substrait.ParameterizedType.ParameterizedStruct.
 * Use `create(ParameterizedType_ParameterizedStructSchema)` to create a new message.
 */
export const ParameterizedType_ParameterizedStructSchema: GenMessage<ParameterizedType_ParameterizedStruct> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 9);

/**
 * @generated from message substrait.ParameterizedType.ParameterizedNamedStruct
 */
export type ParameterizedType_ParameterizedNamedStruct =
  Message<'substrait.ParameterizedType.ParameterizedNamedStruct'> & {
    /**
     * list of names in dfs order
     *
     * @generated from field: repeated string names = 1;
     */
    names: string[];

    /**
     * @generated from field: substrait.ParameterizedType.ParameterizedStruct struct = 2;
     */
    struct?: ParameterizedType_ParameterizedStruct;
  };

/**
 * Describes the message substrait.ParameterizedType.ParameterizedNamedStruct.
 * Use `create(ParameterizedType_ParameterizedNamedStructSchema)` to create a new message.
 */
export const ParameterizedType_ParameterizedNamedStructSchema: GenMessage<ParameterizedType_ParameterizedNamedStruct> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 10);

/**
 * @generated from message substrait.ParameterizedType.ParameterizedList
 */
export type ParameterizedType_ParameterizedList =
  Message<'substrait.ParameterizedType.ParameterizedList'> & {
    /**
     * @generated from field: substrait.ParameterizedType type = 1;
     */
    type?: ParameterizedType;

    /**
     * @generated from field: uint32 variation_pointer = 2;
     */
    variationPointer: number;

    /**
     * @generated from field: substrait.Type.Nullability nullability = 3;
     */
    nullability: Type_Nullability;
  };

/**
 * Describes the message substrait.ParameterizedType.ParameterizedList.
 * Use `create(ParameterizedType_ParameterizedListSchema)` to create a new message.
 */
export const ParameterizedType_ParameterizedListSchema: GenMessage<ParameterizedType_ParameterizedList> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 11);

/**
 * @generated from message substrait.ParameterizedType.ParameterizedMap
 */
export type ParameterizedType_ParameterizedMap =
  Message<'substrait.ParameterizedType.ParameterizedMap'> & {
    /**
     * @generated from field: substrait.ParameterizedType key = 1;
     */
    key?: ParameterizedType;

    /**
     * @generated from field: substrait.ParameterizedType value = 2;
     */
    value?: ParameterizedType;

    /**
     * @generated from field: uint32 variation_pointer = 3;
     */
    variationPointer: number;

    /**
     * @generated from field: substrait.Type.Nullability nullability = 4;
     */
    nullability: Type_Nullability;
  };

/**
 * Describes the message substrait.ParameterizedType.ParameterizedMap.
 * Use `create(ParameterizedType_ParameterizedMapSchema)` to create a new message.
 */
export const ParameterizedType_ParameterizedMapSchema: GenMessage<ParameterizedType_ParameterizedMap> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 12);

/**
 * @generated from message substrait.ParameterizedType.ParameterizedUserDefined
 */
export type ParameterizedType_ParameterizedUserDefined =
  Message<'substrait.ParameterizedType.ParameterizedUserDefined'> & {
    /**
     * @generated from field: uint32 type_pointer = 1;
     */
    typePointer: number;

    /**
     * @generated from field: uint32 variation_pointer = 2;
     */
    variationPointer: number;

    /**
     * @generated from field: substrait.Type.Nullability nullability = 3;
     */
    nullability: Type_Nullability;
  };

/**
 * Describes the message substrait.ParameterizedType.ParameterizedUserDefined.
 * Use `create(ParameterizedType_ParameterizedUserDefinedSchema)` to create a new message.
 */
export const ParameterizedType_ParameterizedUserDefinedSchema: GenMessage<ParameterizedType_ParameterizedUserDefined> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 13);

/**
 * @generated from message substrait.ParameterizedType.IntegerOption
 */
export type ParameterizedType_IntegerOption =
  Message<'substrait.ParameterizedType.IntegerOption'> & {
    /**
     * @generated from oneof substrait.ParameterizedType.IntegerOption.integer_type
     */
    integerType:
      | {
          /**
           * @generated from field: int32 literal = 1;
           */
          value: number;
          case: 'literal';
        }
      | {
          /**
           * @generated from field: substrait.ParameterizedType.IntegerParameter parameter = 2;
           */
          value: ParameterizedType_IntegerParameter;
          case: 'parameter';
        }
      | { case: undefined; value?: undefined };
  };

/**
 * Describes the message substrait.ParameterizedType.IntegerOption.
 * Use `create(ParameterizedType_IntegerOptionSchema)` to create a new message.
 */
export const ParameterizedType_IntegerOptionSchema: GenMessage<ParameterizedType_IntegerOption> =
  /*@__PURE__*/
  messageDesc(file_substrait_parameterized_types, 0, 14);
