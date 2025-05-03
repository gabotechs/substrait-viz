import { Message } from '@bufbuild/protobuf';

export function castAnyMsg(obj: unknown): Message | undefined {
  if (typeof obj === 'object' && obj != null && '$typeName' in obj) {
    return obj as Message;
  }
}

export function castAnyMsgArr(obj: unknown): Message[] | undefined {
  if (Array.isArray(obj) && obj.length > 0) {
    for (const entry of obj) {
      // With just one is enough.
      if (castAnyMsg(entry)) {
        return obj as Message[];
      }
    }
  }
}

export function castAnyOneOf(
  obj: unknown,
): { case: string; value: Message } | undefined {
  if (
    typeof obj === 'object' &&
    obj != null &&
    'case' in obj &&
    typeof obj.case === 'string' &&
    'value' in obj
  ) {
    if (castAnyMsg(obj.value)) {
      return obj as { case: string; value: Message };
    }
  }
}

export function castAnyOneOfArr(
  obj: unknown,
): { case: string; value: Message }[] | undefined {
  if (Array.isArray(obj) && obj.length > 0) {
    for (const entry of obj) {
      // With just one is enough.
      if (castAnyOneOf(entry)) {
        return obj as { case: string; value: Message }[];
      }
    }
  }
}

export function castMsg<M extends Message>(
  typeName: M['$typeName'],
  obj: unknown,
): M | undefined {
  if (
    typeof obj === 'object' &&
    obj != null &&
    '$typeName' in obj &&
    obj.$typeName === typeName
  ) {
    return obj as M;
  }
}

export function castMsgArr<M extends Message>(
  typeName: M['$typeName'],
  obj: unknown,
): M[] | undefined {
  if (Array.isArray(obj) && obj.length > 0) {
    for (const entry of obj) {
      // With just one is enough.
      if (castMsg(typeName, entry)) {
        return obj as M[];
      }
    }
  }
}

export function castOneOf<M extends Message>(
  typeName: M['$typeName'],
  obj: unknown,
): { case: string; value: M } | undefined {
  if (
    typeof obj === 'object' &&
    obj != null &&
    'case' in obj &&
    typeof obj.case === 'string' &&
    'value' in obj
  ) {
    if (castMsg(typeName, obj.value)) {
      return obj as { case: string; value: M };
    }
  }
}

export function castOneOfArr<M extends Message>(
  typeName: M['$typeName'],
  obj: unknown,
): { case: string; value: M }[] | undefined {
  if (Array.isArray(obj) && obj.length > 0) {
    for (const entry of obj) {
      // With just one is enough.
      if (castOneOf(typeName, entry)) {
        return obj as { case: string; value: M }[];
      }
    }
  }
}

export function castUint8Array(obj: unknown): Uint8Array | undefined {
  if (obj instanceof Uint8Array) return obj;
}

export function castNumber(obj: unknown): number | undefined {
  if (typeof obj === 'number') return obj;
}

export function castNumberList(obj: unknown): number[] | undefined {
  if (Array.isArray(obj)) {
    if (obj.length === 0) return obj;
    if (castNumber(obj[0]) !== undefined) return obj;
  }
  return undefined;
}

export function castString(obj: unknown): string | undefined {
  if (typeof obj === 'string') return obj;
}

export function castStringList(obj: unknown): string[] | undefined {
  if (Array.isArray(obj)) {
    if (obj.length === 0) return obj;
    if (castString(obj[0]) !== undefined) return obj;
  }
  return undefined;
}
