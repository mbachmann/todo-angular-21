import { Directive, ElementRef, HostListener, inject, Input, OnDestroy, Renderer2, signal } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnDestroy {
  private tooltipText = signal('');
  private tooltipDelay = signal(190);

  @Input() set appTooltip(value: string) {
    this.tooltipText.set(value);
  }
  @Input() set appTooltipDelay(value: number | string) {
    this.tooltipDelay.set(Number(value));
  }

  private popup: HTMLElement | null = null;
  private timer: any;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);

  ngOnDestroy(): void {
    this.removePopup();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.timer = setTimeout(() => {
      const rect = this.el.nativeElement.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height + 6;
      this.createPopup(x, y);
    }, this.tooltipDelay());
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.timer) clearTimeout(this.timer);
    this.removePopup();
  }

  private createPopup(x: number, y: number) {
    this.removePopup(); // alte Instanz entfernen

    const popup = this.renderer.createElement('div');
    this.renderer.addClass(popup, 'tooltip-container');
    this.renderer.setStyle(popup, 'position', 'absolute');
    this.renderer.setStyle(popup, 'top', `${y}px`);
    this.renderer.setStyle(popup, 'left', `${x}px`);
    this.renderer.setProperty(popup, 'innerHTML', this.tooltipText());

    this.renderer.appendChild(document.body, popup);
    this.popup = popup;

    setTimeout(() => this.removePopup(), 5000);
  }

  private removePopup() {
    if (this.popup) {
      this.renderer.removeChild(document.body, this.popup);
      this.popup = null;
    }
  }
}
