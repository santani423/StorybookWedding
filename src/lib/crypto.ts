/**
 * Enkripsi AES-256-CBC menggunakan Web Crypto API.
 * Key AES di-derive dari SHA-256(secret).
 * Yang dienkripsi: API key string.
 * Format output: base64( iv[16 byte] + ciphertext )
 */
export async function encryptApiKey(apiKey: string, secret: string): Promise<string> {
  const enc = new TextEncoder();

  const secretKey = await crypto.subtle.digest("SHA-256", enc.encode(secret));
  const key = await crypto.subtle.importKey(
    "raw",
    secretKey,
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    enc.encode(apiKey)
  );

  const combined = new Uint8Array(iv.byteLength + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.byteLength);

  return btoa(String.fromCodePoint(...combined));
}

export async function buildEncryptedApiKey(): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? "";
  const secret = process.env.NEXT_PUBLIC_ENCRYPT_SECRET ?? "";
  return encryptApiKey(apiKey, secret);
}
