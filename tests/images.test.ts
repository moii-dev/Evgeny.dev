import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MAX_IMAGE_BYTES, validateImageFile } from '../src/utils/imageFiles';
import { httpUrl, imageUrl } from '../src/utils/urls';

test('images are bounded and non-image files are rejected', () => {
  assert.throws(() => validateImageFile({ type: 'text/html', size: 20 }));
  assert.throws(() => validateImageFile({ type: 'image/png', size: 0 }));
  assert.throws(() => validateImageFile({ type: 'image/png', size: MAX_IMAGE_BYTES + 1 }));
  assert.doesNotThrow(() => validateImageFile({ type: 'image/png', size: 100 }));
});

test('external URLs reject executable schemes, credentials and protocol-relative images', () => {
  for (const value of ['javascript:alert(1)', 'data:text/html,bad', 'https://user:secret@example.com']) assert.equal(httpUrl(value), undefined);
  assert.equal(imageUrl('//example.com/a.png'), false);
  assert.equal(imageUrl('/assets/photo.png'), true);
  assert.equal(imageUrl('data:image/png;base64,YQ=='), true);
});
