import { ClickStopPropagationDirective } from './click-stop-propagation.directive';
import { describe, expect, it } from 'vitest';

describe('ClickStopPropagation', () => {
  it('should create an instance', () => {
    const directive = new ClickStopPropagationDirective();
    expect(directive).toBeTruthy();
  });
});
