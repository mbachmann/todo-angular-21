import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent (signals)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.f().value()).toEqual({ email: '', password: '', remember: false });
  });

  it('should invalidate the form when fields are empty', () => {
    component.onSubmit();
    expect(component.f().valid()).toBeFalse();
  });

  it('should submit form when valid', () => {
    spyOn(window, 'alert');
    component.initial.set({ email: 'test@example.com', password: 'password123', remember: false });
    fixture.detectChanges();

    component.onSubmit();

    expect(component.f().valid()).toBeTrue();
    expect(component.submitted()).toBeTrue();
    expect(window.alert).toHaveBeenCalledWith('Great!! test@example.com (remember: false)');
  });

  it('should validate email field correctly', async () => {
    // set an invalid email
    component.f.email().value.set('invalid-email');
    component.f.password().value.set('password123');

    // submit triggers validation
    component.onSubmit();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.f().valid()).toBeFalse();

    const emailErrors = component.f.email().errors() as { kind: string; message: string }[];
    expect(emailErrors?.some(err => err.kind === 'email')).toBeTrue();

  });

  it('should validate password field correctly', async () => {
    component.f.email().value.set('test@example.com');
    component.f.password().value.set('');

    // submit triggers validation
    component.onSubmit();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.f().valid()).toBeFalse();

    const passwordErrors = component.f.password().errors() as { kind: string; message: string }[];
    expect(passwordErrors?.some(err => err.kind === 'required')).toBeTrue();

  });

});
