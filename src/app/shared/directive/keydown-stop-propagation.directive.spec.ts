import { KeydownStopPropagationDirective } from './keydown-stop-propagation.directive';
import { describe, expect, it } from 'vitest';

describe('KeydownStopPropagation', () => {
  it('should create an instance', () => {
    const directive = new KeydownStopPropagationDirective();
    expect(directive).toBeTruthy();
  });
});
