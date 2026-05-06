import { TempConverterPipe } from './temp-converter.pipe';
import { describe, expect, it } from 'vitest';

describe('TempConverterPipe', () => {
  it('create an instance', () => {
    const pipe = new TempConverterPipe();
    expect(pipe).toBeTruthy();
  });
});
