import { Message } from '@bufbuild/protobuf';
import { GenMessage } from '@bufbuild/protobuf/codegenv1';

import { CustomDirect } from './CustomDirect.tsx';
import { CustomFieldReference } from './CustomFieldReference.tsx';
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
  AggregateRel_Grouping,
  AggregateRel_Measure,
  Expression,
  Expression_FieldReference,
  Expression_FieldReference_RootReference,
  Expression_Literal,
  Expression_MaskExpression_StructItem,
  Expression_ReferenceSegment,
  FunctionArgument,
  Rel,
  RelCommon_Direct,
  RelSchema
} from './gen/substrait/algebra_pb.ts';
import { SimpleExtensionDeclaration, SimpleExtensionURI } from './gen/substrait/extensions/extensions_pb.ts';
import { PlanRelSchema, PlanSchema, Version } from './gen/substrait/plan_pb.ts';
import { NamedStruct, Type, Type_Struct } from './gen/substrait/type_pb.ts';
import { CustomRenderProps, ProtobufViz, ProtobufVizProps } from './ProtobufViz';
import { castMsg } from './ProtobufViz/cast.ts';
import SmartNode from './ProtobufViz/SmartNode.tsx';
import './SubstraitViz.css';

export interface SubstraitVizProps
  extends Omit<
    ProtobufVizProps<GenMessage<Message>>,
    'coreNodes' | 'schema' | 'nodeRender' | 'protoMessage'
  > {
  plan: string;
}

export function SubstraitViz({ plan, ...props }: SubstraitVizProps) {
  return (
    <ProtobufViz
      coreNodes={[PlanSchema, PlanRelSchema, RelSchema]}
      schema={PlanSchema}
      protoMessage={plan}
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
          const casted = castProps<Expression>('substrait.Expression', props);
          if (casted) return <SmartNode {...props} data={casted.msg.rexType} />;
        }
        {
          const casted = castProps<AggregateRel_Grouping>('substrait.AggregateRel.Grouping', props);
          if (casted) return <SmartNode {...props} data={casted.msg.groupingExpressions} />;
        }
        {
          const casted = castProps<AggregateRel_Measure>('substrait.AggregateRel.Measure', props);
          if (casted && !casted.msg.filter) return <SmartNode {...props} data={casted.msg.measure} />;
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
          const casted = castProps<Type_Struct>('substrait.Type.Struct', props);
          if (casted) return <SmartNode  {...props} data={casted.msg.types} />;
        }
        {
          const casted = castProps<NamedStruct>('substrait.NamedStruct', props);
          if (casted) return <CustomNamedStruct {...casted} />;
        }
        {
          const casted = castProps<FunctionArgument>('substrait.FunctionArgument', props);
          if (casted) return <SmartNode {...props} data={casted.msg.argType} />;
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
          const casted = castProps<Rel>('substrait.Rel', props);
          if (casted) return <SmartNode {...props} data={casted.msg.relType} />;
        }
      }}
      {...props}
    />
  );
}

function castProps<T extends Message>(
  typeName: T['$typeName'],
  props: CustomRenderProps,
): CustomRenderProps<T> | undefined {
  if (castMsg<T>(typeName, props.msg)) {
    return props as CustomRenderProps<T>;
  }
}
