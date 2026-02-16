export function uid() {
  // compatible con navegadores modernos
  // (si no existe crypto.randomUUID, usa fallback)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyCrypto: any = globalThis.crypto;
  if (anyCrypto?.randomUUID) return anyCrypto.randomUUID();
  return Math.random().toString(36).slice(2, 10);
}

