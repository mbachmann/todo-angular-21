import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFirst } from './my-first.component';

describe('MyFirst', () => {
  let component: MyFirst;
  let fixture: ComponentFixture<MyFirst>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFirst]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFirst);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
