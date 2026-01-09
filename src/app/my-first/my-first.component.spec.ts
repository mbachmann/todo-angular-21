import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyFirstComponent } from './my-first.component';
import { By } from '@angular/platform-browser';

describe('MyFirstComponent', () => {
  let component: MyFirstComponent;
  let fixture: ComponentFixture<MyFirstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyFirstComponent],
    });
    fixture = TestBed.createComponent(MyFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render headerTitle in the paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('.paragraph')).nativeElement;
    expect(paragraph.textContent).toContain('My first component');
  });

  it('should update styles based on component properties', () => {
    component.backgroundColor.set('blue');
    component.textColor.set('white');
    fixture.detectChanges();

    const paragraph = fixture.debugElement.query(By.css('.paragraph')).nativeElement;
    expect(paragraph.style.backgroundColor).toBe('blue');
    expect(paragraph.style.color).toBe('white');
  });

  it('should emit myEvent with headerTitle when sendEvent is called', () => {
    spyOn(component.myEvent, 'emit');
    component.sendEvent();
    expect(component.myEvent.emit).toHaveBeenCalledWith('My first component');
  });

  it('should update event and coordinates on mouse events', () => {
    const box = fixture.debugElement.query(By.css('.box'));
    let mockEvent = new MouseEvent('mousemove', { clientX: 100, clientY: 200 });

    box.triggerEventHandler('mousemove', mockEvent);

    expect(component.clientX).toBe(100);
    expect(component.clientY).toBe(200);

    mockEvent = new MouseEvent('mouseenter', { clientX: 100, clientY: 200 });
    box.triggerEventHandler('mouseenter', mockEvent);
    expect(component.event?.type).toBe('mouseenter');
  });

  it('should handle keydown event when Enter is pressed', () => {
    spyOn(console, 'log');
    const box = fixture.debugElement.query(By.css('.box'));
    const mockKeyEvent = new KeyboardEvent('keydown', { key: 'Enter' });

    // Template hat (keydown), nicht (keydown.enter)
    box.triggerEventHandler('keydown', mockKeyEvent);

    expect(console.log).toHaveBeenCalledWith(mockKeyEvent);
    expect(component.event?.type).toBe('keydown');
  });

  it('should update event on mouse click', () => {
    const box = fixture.debugElement.query(By.css('.box'));
    const mockClickEvent = new MouseEvent('click');

    box.triggerEventHandler('click', mockClickEvent);

    expect(component.event?.type).toBe('click');
  });
});
