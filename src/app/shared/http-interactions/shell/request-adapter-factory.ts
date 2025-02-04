import { DummyJsonRequestAdapter } from './dummy-json-request-adapter';
import { RequestAdapter } from './request-adapter';

export function requestAdapterFactory(url: string): RequestAdapter {
  if (url.startsWith('https://dummyjson.com')) {
    return new DummyJsonRequestAdapter();
  }
  throw new Error('No request adapter found for the given URL');
}
