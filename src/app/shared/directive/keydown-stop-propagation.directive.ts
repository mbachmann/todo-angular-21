import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appKeydownStopPropagation]',
})
export class KeydownStopPropagationDirective {
  @HostListener('keydown', ['$event'])
  public onKeydown(event: any): void {
    event.stopPropagation();
  }
}
