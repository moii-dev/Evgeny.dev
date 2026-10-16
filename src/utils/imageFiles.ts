import { httpUrl, imageUrl } from './urls';

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_IMAGE_PIXELS = 24_000_000;
const MAX_STORED_SIDE = 1600;
const TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif']);

export function validateImageFile(file: Pick<File, 'size' | 'type'>): void {
  if (!TYPES.has(file.type)) throw new Error('Choose a PNG, JPEG, WebP, GIF or AVIF image.');
  if (!file.size || file.size > MAX_IMAGE_BYTES) throw new Error('Choose an image up to 5 MB.');
}

function loadImage(src: string, signal: AbortSignal): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    signal.throwIfAborted();
    const image = new Image();
    const finish = () => { clearTimeout(timer); signal.removeEventListener('abort', abort); image.onload = image.onerror = null; };
    const fail = (error: Error | DOMException) => { finish(); image.src = ''; reject(error); };
    const abort = () => fail(new DOMException('Cancelled', 'AbortError'));
    const timer = setTimeout(() => fail(new Error('Image loading timed out. Try another image.')), 10_000);
    signal.addEventListener('abort', abort, { once: true });
    image.onload = () => {
      if (!image.naturalWidth || image.naturalWidth * image.naturalHeight > MAX_IMAGE_PIXELS) {
        fail(new Error('Image resolution must be below 24 megapixels.')); return;
      }
      finish(); resolve(image);
    };
    image.onerror = () => fail(new Error('This image could not be decoded. Choose another file or URL.'));
    image.src = src;
  });
}

function readDataUrl(file: File, signal: AbortSignal): Promise<string> {
  return new Promise((resolve, reject) => {
    signal.throwIfAborted();
    const reader = new FileReader();
    const abort = () => reader.abort();
    const cleanup = () => signal.removeEventListener('abort', abort);
    signal.addEventListener('abort', abort, { once: true });
    reader.onload = () => { cleanup(); typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Could not read image.')); };
    reader.onerror = () => { cleanup(); reject(new Error('Could not read image.')); };
    reader.onabort = () => { cleanup(); reject(new DOMException('Cancelled', 'AbortError')); };
    reader.readAsDataURL(file);
  });
}

export async function prepareImageFile(file: File, signal: AbortSignal): Promise<string> {
  validateImageFile(file);
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await loadImage(objectUrl, signal);
    signal.throwIfAborted();
    if (file.type === 'image/gif' || (file.size <= 800_000 && Math.max(image.naturalWidth, image.naturalHeight) <= MAX_STORED_SIDE)) {
      return await readDataUrl(file, signal);
    }
    const ratio = Math.min(1, MAX_STORED_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(image.naturalWidth * ratio);
    canvas.height = Math.round(image.naturalHeight * ratio);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Image processing is unavailable in this browser.');
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const result = canvas.toDataURL('image/webp', 0.94);
    if (result.length > 2_000_000) throw new Error('This image is too complex to save. Choose a smaller image.');
    return result;
  } finally { URL.revokeObjectURL(objectUrl); }
}

export async function validateImageUrl(value: string, signal: AbortSignal): Promise<string> {
  const url = value.trim();
  if (!imageUrl(url) || url.length > 7_000_000) throw new Error('Use an HTTP(S) image URL or a supported image data URL.');
  if (!url.startsWith('/') && !url.startsWith('data:') && !httpUrl(url)) throw new Error('Invalid image URL.');
  await loadImage(url, signal);
  return url;
}
