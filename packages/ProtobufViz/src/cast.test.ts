import { Message } from '@bufbuild/protobuf';
import { describe, expect, it } from 'vitest';
import {
  castAnyMsg,
  castAnyMsgArr,
  castAnyOneOf,
  castAnyOneOfArr,
  castMsg,
  castMsgArr,
  castNumber,
  castNumberList,
  castOneOf,
  castOneOfArr,
  castString,
  castStringList,
  castUint8Array,
} from './cast';

describe('cast', () => {
  describe('Message casting functions', () => {
    const validMsg = new TestMessage();
    validMsg.$typeName = 'test.Message';

    it('castAnyMsg should cast valid Message object', () => {
      expect(castAnyMsg(validMsg)).toBeDefined();
      expect(castAnyMsg({})).toBeUndefined();
      expect(castAnyMsg(null)).toBeUndefined();
    });

    it('castAnyMsgArr should cast array of Messages', () => {
      expect(castAnyMsgArr([validMsg])).toBeDefined();
      expect(castAnyMsgArr([])).toBeUndefined();
      expect(castAnyMsgArr([{}])).toBeUndefined();
    });

    it('castMsg should cast specific Message type', () => {
      expect(castMsg('test.Message', validMsg)).toBeDefined();
      expect(castMsg('wrong.Type', validMsg)).toBeUndefined();
      expect(castMsg('test.Message', {})).toBeUndefined();
    });

    it('castMsgArr should cast array of specific Message type', () => {
      expect(castMsgArr('test.Message', [validMsg])).toBeDefined();
      expect(castMsgArr('wrong.Type', [validMsg])).toBeUndefined();
      expect(castMsgArr('test.Message', [])).toBeUndefined();
    });
  });

  describe('OneOf casting functions', () => {
    const validOneOf = { case: 'test', value: new TestMessage() };

    it('castAnyOneOf should cast valid OneOf object', () => {
      expect(castAnyOneOf(validOneOf)).toBeDefined();
      expect(castAnyOneOf({})).toBeUndefined();
      expect(castAnyOneOf({ case: 'test' })).toBeUndefined();
    });

    it('castAnyOneOfArr should cast array of OneOf objects', () => {
      expect(castAnyOneOfArr([validOneOf])).toBeDefined();
      expect(castAnyOneOfArr([])).toBeUndefined();
      expect(castAnyOneOfArr([{}])).toBeUndefined();
    });

    it('castOneOf should cast specific OneOf type', () => {
      expect(castOneOf('test.Message', validOneOf)).toBeDefined();
      expect(castOneOf('wrong.Type', validOneOf)).toBeUndefined();
      expect(castOneOf('test.Message', {})).toBeUndefined();
    });

    it('castOneOfArr should cast array of specific OneOf type', () => {
      expect(castOneOfArr('test.Message', [validOneOf])).toBeDefined();
      expect(castOneOfArr('wrong.Type', [validOneOf])).toBeUndefined();
      expect(castOneOfArr('test.Message', [])).toBeUndefined();
    });
  });

  describe('Primitive type casting functions', () => {
    it('castUint8Array should cast Uint8Array', () => {
      expect(castUint8Array(new Uint8Array())).toBeDefined();
      expect(castUint8Array([])).toBeUndefined();
    });

    it('castNumber should cast number', () => {
      expect(castNumber(0)).toBe(0);
      expect(castNumber(-0)).toBe(-0);
      expect(castNumber(123)).toBe(123);
      expect(castNumber('123')).toBeUndefined();
      expect(castNumber(Number(0))).toBe(0);
    });

    it('castNumberList should cast number array', () => {
      expect(castNumberList([0, 1, 2, 3])).toEqual([0, 1, 2, 3]);
      expect(castNumberList([1, 2, 3])).toEqual([1, 2, 3]);
      expect(castNumberList(['1'])).toBeUndefined();
      expect(castNumberList([])).toEqual([]);
      expect(castNumberList([0])).toEqual([0]);
    });

    it('castString should cast string', () => {
      expect(castString('')).toBe('');
      expect(castString('test')).toBe('test');
      expect(castString(123)).toBeUndefined();
      expect(castString(String(''))).toBe('');
    });

    it('castStringList should cast string array', () => {
      expect(castStringList(['', '', 'b'])).toEqual(['', '', 'b']);
      expect(castStringList(['', 'b'])).toEqual(['', 'b']);
      expect(castStringList(['a', 'b'])).toEqual(['a', 'b']);
      expect(castStringList([1])).toBeUndefined();
      expect(castStringList([])).toEqual([]);
      expect(castStringList([''])).toEqual(['']);
    });
  });
});

// Mock Message class for testing
class TestMessage implements Message {
  $type!: { typeName: string };
  $typeName = 'test.Message';

  equals(): boolean {
    return true;
  }

  clone(): this {
    return this;
  }

  fromJson(): this {
    return this;
  }

  fromJsonString(): this {
    return this;
  }

  toJson(): object {
    return {};
  }

  toJsonString(): string {
    return '';
  }
}
