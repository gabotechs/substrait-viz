import { CustomRenderProps, RenderConfig } from './ProtobufViz/render.ts';
import { Version } from './gen/substrait/plan_pb.ts';
import { castMsg } from './ProtobufViz/cast.ts';
import { VersionComponent } from './CustomVersion.tsx';
import { Message } from '@bufbuild/protobuf';
import {
  SimpleExtensionDeclaration,
  SimpleExtensionURI,
} from './gen/substrait/extensions/extensions_pb.ts';
import { CustomSimpleExtensionDeclaration } from './CustomSimpleExtensionDeclaration.tsx';
import { CustomSimpleExtensionUri } from './CustomSimpleExtensionUri.tsx';
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
  RelCommon_Direct,
} from './gen/substrait/algebra_pb.ts';
import { CustomRootReference } from './CustomRootReference.tsx';
import { CustomReferenceSegment } from './CustomReferenceSegment.tsx';
import SmartField from './ProtobufViz/SmartField.tsx';
import { NamedStruct, Type, Type_Struct } from './gen/substrait/type_pb.ts';
import { CustomFieldReference } from './CustomFieldReference.tsx';
import { CustomType } from './CustomType.tsx';
import { CustomNamedStruct } from './CustomNamedStruct.tsx';
import { CustomLiteral } from './CustomLiteral.tsx';
import { CustomStructItem } from './CustomStructItem.tsx';
import { CustomDirect } from './CustomDirect.tsx';

export const RENDER_CONFIG: RenderConfig = {
  renderField(props) {
    {
      const casted = castProps<Version>('substrait.Version', props);
      if (casted) return <VersionComponent {...casted} />;
    }
    /* prettier-ignore */
    {
      const casted = castProps<SimpleExtensionDeclaration>('substrait.extensions.SimpleExtensionDeclaration', props);
      if (casted) return <CustomSimpleExtensionDeclaration {...casted} />;
    }
    /* prettier-ignore */
    {
      const casted = castProps<SimpleExtensionURI>('substrait.extensions.SimpleExtensionURI', props);
      if (casted) return <CustomSimpleExtensionUri {...casted} />;
    }
    /* prettier-ignore */
    {
      const casted = castProps<Expression_FieldReference_RootReference>('substrait.Expression.FieldReference.RootReference', props);
      if (casted) return <CustomRootReference {...casted} />;
    }
    /* prettier-ignore */
    {
      const casted = castProps<RelCommon_Direct>('substrait.RelCommon.Direct', props);
      if (casted) return <CustomDirect {...casted} />;
    }
    /* prettier-ignore */
    {
      const casted = castProps<Expression_ReferenceSegment>('substrait.Expression.ReferenceSegment', props);
      if (casted) return <CustomReferenceSegment {...casted} />;
    }
    /* prettier-ignore */
    {
      const casted = castProps<Expression>('substrait.Expression', props);
      if (casted) return <SmartField data={casted.msg.rexType} />;
    }
    /* prettier-ignore */
    {
      const casted = castProps<AggregateRel_Grouping>('substrait.AggregateRel.Grouping', props);
      if (casted) return <SmartField data={casted.msg.groupingExpressions} />;
    }
    /* prettier-ignore */
    {
      const casted = castProps<AggregateRel_Measure>('substrait.AggregateRel.Measure', props);
      if (casted && !casted.msg.filter) return <SmartField data={casted.msg.measure} />;
    }
    /* prettier-ignore */
    {
      const casted = castProps<Expression_FieldReference>('substrait.Expression.FieldReference', props);
      if (casted) return <CustomFieldReference {...casted} />;
    }
    /* prettier-ignore */
    {
      const casted = castProps<Type>('substrait.Type', props);
      if (casted) return <CustomType{...casted} />;
    }
    /* prettier-ignore */
    {
      const casted = castProps<Type_Struct>('substrait.Type.Struct', props);
      if (casted) return <SmartField data={casted.msg.types}/>
    }
    /* prettier-ignore */
    {
      const casted = castProps<NamedStruct>('substrait.NamedStruct', props);
      if (casted) return <CustomNamedStruct {...casted}/>
    }
    /* prettier-ignore */
    {
      const casted = castProps<FunctionArgument>('substrait.FunctionArgument', props);
      if (casted) return <SmartField data={casted.msg.argType}/>
    }
    /* prettier-ignore */
    {
      const casted = castProps<Expression_Literal>('substrait.Expression.Literal', props);
      if (casted) return <CustomLiteral {...casted}/>
    }
    /* prettier-ignore */
    {
      const casted = castProps<Expression_MaskExpression_StructItem>('substrait.Expression.MaskExpression.StructItem', props);
      if (casted) return <CustomStructItem {...casted}/>
    }
  },
};

function castProps<T extends Message>(
  typeName: T['$typeName'],
  props: CustomRenderProps,
): CustomRenderProps<T> | undefined {
  if (castMsg<T>(typeName, props.msg)) {
    return props as CustomRenderProps<T>;
  }
}
