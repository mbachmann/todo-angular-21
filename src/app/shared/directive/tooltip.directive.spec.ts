import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: `<div appTooltip="Hello"></div>`,
  standalone: true,
  imports: [TooltipDirective],
})
class HostComponent {}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const divEl = fixture.nativeElement.querySelector('div');
    const directiveInstance = fixture.debugElement.children[0].injector.get(TooltipDirective);
    expect(directiveInstance).toBeTruthy();
  });
});
