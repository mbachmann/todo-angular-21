import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-my-first',
  imports: [],
  templateUrl: './my-first.component.html',
  styleUrl: './my-first.component.scss',
})
export class MyFirst {
  @Input() headerTitle = 'My first component';
  @Output() myEvent = new EventEmitter<string>();

  backgroundColor = 'lightgray';
  textColor = 'red';

  public event?: MouseEvent;
  public clientX = 0;
  public clientY = 0;

  public onEvent(event: MouseEvent | KeyboardEvent): void {
    if (event instanceof MouseEvent) {
      this.event = event;
    }
  }

  public coordinates(event: MouseEvent): void {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }

  sendEvent() {
    this.myEvent.emit(this.headerTitle);
  }
}
