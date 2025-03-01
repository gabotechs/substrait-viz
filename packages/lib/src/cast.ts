import { Message } from '@bufbuild/protobuf';

export function cast<M extends Message>(
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

export function castArr<M extends Message>(
  typeName: M['$typeName'],
  obj: unknown,
): M[] | undefined {
  if (Array.isArray(obj) && obj.length > 0) {
    for (const entry of obj) {
      // With just one is enough.
      if (cast(typeName, entry)) {
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
    if (cast(typeName, obj.value)) {
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

export function castStringList(obj: unknown): string[] | undefined {
  if (Array.isArray(obj)) {
    if (obj.length === 0) return obj;
    if (typeof obj[0] === 'string') return obj;
  }
  return undefined;
}
