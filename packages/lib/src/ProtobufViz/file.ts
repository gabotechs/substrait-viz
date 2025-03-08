import { JsonValue } from '@bufbuild/protobuf';

export type ProtoFile = string | Uint8Array | URL;

export async function fetchFile(file: ProtoFile): Promise<Json | Uint8Array> {
  if (typeof file === 'string') {
    const url = maybeUrl(file);
    if (url) {
      return await download(new URL(file));
    }
    const b64 = maybeBase64(file);
    if (b64) {
      return b64;
    }
    const json = maybeJson(file);
    if (json) {
      return json;
    }

    throw new Error(
      'When providing a string for specifying a ProtoFile, it must be either a URL that points to the file, the JSON content of the file, or the binary content of the file encoded as a base64 string',
    );
  } else if (file instanceof URL) {
    return await download(new URL(file));
  } else {
    return file;
  }
}

export class Json {
  constructor(public value: JsonValue) {}
}

async function download(url: URL): Promise<Json | Uint8Array> {
  const result = await fetch(url);
  if (!result.ok)
    throw new Error(
      `Fetching "${url}" returned a status code ${result.status}`,
    );
  if (result.headers.get('content-type') === 'application/json') {
    return new Json(await result.json());
  }
  return new Uint8Array(await result.arrayBuffer());
}

const B64_RE =
  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

function maybeBase64(str: string): Uint8Array | undefined {
  if (!B64_RE.test(str)) {
    return;
  }

  if (str.length % 4 !== 0) {
    return;
  }

  return new Uint8Array([...atob(str)].map(c => c.charCodeAt(0)));
}

function maybeJson(str: string): Json | undefined {
  try {
    return new Json(JSON.parse(str));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    return undefined;
  }
}

function maybeUrl(str: string): URL | undefined {
  try {
    return new URL(str);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_: unknown) {
    return undefined;
  }
}
