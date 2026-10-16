import { useEffect, useRef, useState } from 'react';
import { prepareImageFile, validateImageUrl } from '../utils/imageFiles';

export function useImageUpload(onReady: (url: string) => void) {
  const callback = useRef(onReady);
  callback.current = onReady;
  const generation = useRef(0);
  const pending = useRef<AbortController | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => () => { generation.current++; pending.current?.abort(); }, []);
  const cancel = () => { generation.current++; pending.current?.abort(); setBusy(false); setError(''); };
  const run = async (operation: (signal: AbortSignal) => Promise<string>) => {
    const current = ++generation.current;
    pending.current?.abort();
    const controller = new AbortController();
    pending.current = controller;
    setBusy(true); setError('');
    try {
      const url = await operation(controller.signal);
      if (current === generation.current) callback.current(url);
    } catch (failure) {
      if (current === generation.current && !controller.signal.aborted) setError(failure instanceof Error ? failure.message : 'Could not load image.');
    } finally {
      if (current === generation.current) setBusy(false);
    }
  };
  return { busy, error, cancel,
    file: (file: File) => run(signal => prepareImageFile(file, signal)),
    url: (url: string) => run(signal => validateImageUrl(url, signal)),
  };
}
