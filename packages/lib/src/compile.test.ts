import { fromJson } from '@bufbuild/protobuf';
import { describe, expect, test } from 'vitest';
import { PlanSchema } from './gen/substrait/plan_pb.ts';
import { Compiler } from './ProtobufViz/compile.ts';

import plan1 from './.test_data/plan1.json?raw';
import plan2 from './.test_data/plan2.json?raw';
import { CUSTOM_COMPILE } from './customCompile.ts';

describe('compile', () => {
  test('plan 1', () => {
    const ctx = Compiler.fromCfg(CUSTOM_COMPILE);
    const [nodes, edges] = ctx.compile(fromJson(PlanSchema, JSON.parse(plan1)));
    expect(nodes.length).to.equal(7);
    expect(edges.length).to.equal(6);
  });

  test('plan 2', () => {
    const ctx = Compiler.fromCfg(CUSTOM_COMPILE);
    const [nodes, edges] = ctx.compile(fromJson(PlanSchema, JSON.parse(plan2)));
    expect(nodes.length).to.equal(4);
    expect(edges.length).to.equal(3);
  });
});
