import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-my-first',
  standalone: true,
  templateUrl: './my-first.component.html',
  styleUrl: './my-first.component.scss',
})
export class MyFirstComponent {
  @Input() headerTitle = 'My first component';
  @Output() myEvent = new EventEmitter<string>();

  backgroundColor = signal('lightgray');
  textColor = signal('red');

  public event?: MouseEvent | KeyboardEvent;
  public clientX = 0;
  public clientY = 0;

  public onEvent(event: MouseEvent | KeyboardEvent): void {
    if (event instanceof MouseEvent) {
      this.event = event;
    } else if (event instanceof KeyboardEvent && event.key === 'Enter') {
      console.log(event);
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
