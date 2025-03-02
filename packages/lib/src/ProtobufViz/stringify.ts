export function stringify(v: unknown): string {
  return JSON.stringify(v, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value,
  );
}
