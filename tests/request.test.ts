import { test } from 'node:test';
import assert from 'node:assert/strict';
import { withDeadline } from '../src/utils/request';

test('deadline aborts even a transport that never settles', async () => {
  let signal: AbortSignal | undefined;
  await assert.rejects(withDeadline(s => { signal = s; return new Promise(() => {}); }, 10), /timed out/);
  assert.equal(signal?.aborted, true);
});

test('parent cancellation stops outstanding operation', async () => {
  const parent = new AbortController();
  const pending = withDeadline(() => new Promise(() => {}), 1000, parent.signal);
  parent.abort(new Error('cancelled by caller'));
  await assert.rejects(pending, /cancelled by caller/);
});

test('successful operations settle normally', async () => {
  assert.equal(await withDeadline(async () => 'ok', 100), 'ok');
});
