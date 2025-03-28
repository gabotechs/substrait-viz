import { Message } from '@bufbuild/protobuf';
import {
  castMsg,
  CustomRenderProps,
  ProtobufViz,
  ProtobufVizProps,
  ProtoFile,
} from '@protobuf-viz/react';
import React from 'react';
import { CustomCast } from './CustomCast.tsx';
import { CustomDirect } from './CustomDirect.tsx';
import { CustomFieldReference } from './CustomFieldReference.tsx';
import { CustomFunction } from './CustomFunction.tsx';
import { CustomLiteral } from './CustomLiteral.tsx';
import { CustomNamedStruct } from './CustomNamedStruct.tsx';
import { CustomReferenceSegment } from './CustomReferenceSegment.tsx';
import { CustomRootReference } from './CustomRootReference.tsx';
import { CustomSimpleExtensionDeclaration } from './CustomSimpleExtensionDeclaration.tsx';
import { CustomSimpleExtensionUri } from './CustomSimpleExtensionUri.tsx';
import { CustomStructItem } from './CustomStructItem.tsx';
import { CustomType } from './CustomType.tsx';
import { VersionComponent } from './CustomVersion.tsx';
import {
  AggregateFunction,
  Expression_Cast,
  Expression_FieldReference,
  Expression_FieldReference_RootReference,
  Expression_Literal,
  Expression_MaskExpression_StructItem,
  Expression_ReferenceSegment,
  Expression_ScalarFunction,
  RelCommon_Direct,
  RelSchema,
} from './gen/substrait/algebra_pb.ts';
import {
  SimpleExtensionDeclaration,
  SimpleExtensionURI,
} from './gen/substrait/extensions/extensions_pb.ts';
import { PlanRelSchema, PlanSchema, Version } from './gen/substrait/plan_pb.ts';
import { NamedStruct, Type } from './gen/substrait/type_pb.ts';
import './SubstraitViz.css';
import { defaultTheme, SubstraitVizTheme } from './theme.ts';

export interface SubstraitVizProps
  extends Omit<
    ProtobufVizProps,
    'coreNodes' | 'schema' | 'nodeRender' | 'protoMessage' | 'theme'
  > {
  plan: ProtoFile;
  theme?: Partial<SubstraitVizTheme>;
}

export function SubstraitViz({ plan, theme, ...props }: SubstraitVizProps) {
  return (
    <ProtobufViz
      coreNodes={[PlanSchema, PlanRelSchema, RelSchema]}
      schema={PlanSchema}
      protoMessage={plan}
      theme={React.useMemo(() => ({ ...defaultTheme, ...theme }), [theme])}
      /* prettier-ignore */
      nodeRender={(props) => {
        {
          const casted = castProps<Version>('substrait.Version', props);
          if (casted) return <VersionComponent {...casted} />;
        }
        {
          const casted = castProps<SimpleExtensionDeclaration>('substrait.extensions.SimpleExtensionDeclaration', props);
          if (casted) return <CustomSimpleExtensionDeclaration {...casted} />;
        }
        {
          const casted = castProps<SimpleExtensionURI>('substrait.extensions.SimpleExtensionURI', props);
          if (casted) return <CustomSimpleExtensionUri {...casted} />;
        }
        {
          const casted = castProps<Expression_FieldReference_RootReference>('substrait.Expression.FieldReference.RootReference', props);
          if (casted) return <CustomRootReference {...casted} />;
        }
        {
          const casted = castProps<RelCommon_Direct>('substrait.RelCommon.Direct', props);
          if (casted) return <CustomDirect {...casted} />;
        }
        {
          const casted = castProps<Expression_ReferenceSegment>('substrait.Expression.ReferenceSegment', props);
          if (casted) return <CustomReferenceSegment {...casted} />;
        }
        {
          const casted = castProps<Expression_FieldReference>('substrait.Expression.FieldReference', props);
          if (casted) return <CustomFieldReference {...casted} />;
        }
        {
          const casted = castProps<Type>('substrait.Type', props);
          if (casted) return <CustomType{...casted} />;
        }
        {
          const casted = castProps<NamedStruct>('substrait.NamedStruct', props);
          if (casted) return <CustomNamedStruct {...casted} />;
        }
        {
          const casted = castProps<Expression_Literal>('substrait.Expression.Literal', props);
          if (casted) return <CustomLiteral {...casted} />;
        }
        {
          const casted = castProps<Expression_MaskExpression_StructItem>('substrait.Expression.MaskExpression.StructItem', props);
          if (casted) return <CustomStructItem {...casted} />;
        }
        {
          const casted = castProps<Expression_Cast>('substrait.Expression.Cast', props);
          if (casted) return <CustomCast {...casted} />;
        }
        {
          const casted = castProps<Expression_ScalarFunction>('substrait.Expression.ScalarFunction', props);
          if (casted) return <CustomFunction {...casted} />;
        }
        {
          const casted = castProps<AggregateFunction>('substrait.AggregateFunction', props);
          if (casted) return <CustomFunction {...casted} />;
        }
      }}
      {...props}
    />
  );
}

function castProps<T extends Message>(
  typeName: T['$typeName'],
  props: CustomRenderProps,
): CustomRenderProps<T, SubstraitVizTheme> | undefined {
  if (castMsg<T>(typeName, props.msg)) {
    return props as CustomRenderProps<T, SubstraitVizTheme>;
  }
}
