export async function withDeadline<T>(operation: (signal: AbortSignal) => Promise<T>, timeoutMs = 12_000, parent?: AbortSignal): Promise<T> {
  const controller = new AbortController();
  const cancel = () => controller.abort(parent?.reason || new DOMException('Cancelled', 'AbortError'));
  if (parent?.aborted) cancel();
  parent?.addEventListener('abort', cancel, { once: true });
  const timer = setTimeout(() => controller.abort(new Error('Request timed out. Please try again.')), timeoutMs);
  let onAbort: () => void = () => {};
  try {
    controller.signal.throwIfAborted();
    const aborted = new Promise<never>((_, reject) => {
      onAbort = () => reject(controller.signal.reason);
      controller.signal.addEventListener('abort', onAbort, { once: true });
    });
    return await Promise.race([operation(controller.signal), aborted]);
  } finally {
    clearTimeout(timer);
    parent?.removeEventListener('abort', cancel);
    controller.signal.removeEventListener('abort', onAbort);
  }
}
