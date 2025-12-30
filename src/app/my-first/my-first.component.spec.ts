import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirstComponent } from './my-first.component';

describe('MyFirst', () => {
  let component: MyFirstComponent;
  let fixture: ComponentFixture<MyFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFirstComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyFirstComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
