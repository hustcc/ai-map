/** Encode any JSON-serialisable value to a gzip + base64url string (browser). */
export async function encode(data: unknown): Promise<string> {
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  const compressed = await new Response(
    new ReadableStream({ start(c) { c.enqueue(bytes); c.close(); } })
      .pipeThrough(new CompressionStream("gzip")),
  ).arrayBuffer();
  const binary = Array.from(new Uint8Array(compressed), (b) =>
    String.fromCharCode(b),
  ).join("");
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Decode a gzip + base64url string back to the original value (browser). */
export async function decode<T>(encoded: string): Promise<T> {
  const raw = encoded.trim().replace(/^#/, "");
  const base64 = raw.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binaryStr = atob(padded);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);
  const text = await new Response(
    new ReadableStream({ start(c) { c.enqueue(bytes); c.close(); } })
      .pipeThrough(new DecompressionStream("gzip")),
  ).text();
  return JSON.parse(text) as T;
}
