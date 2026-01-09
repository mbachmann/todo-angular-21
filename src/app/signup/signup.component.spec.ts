import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { DebugElement, importProvidersFrom } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  let submitButton: DebugElement;
  let firstNameInput: DebugElement;
  let lastNameInput: DebugElement;
  let emailInput: DebugElement;
  let passwordInput: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [importProvidersFrom(FormsModule)],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;

    submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    firstNameInput = fixture.debugElement.query(By.css('input[name="firstName"]'));
    lastNameInput = fixture.debugElement.query(By.css('input[name="lastName"]'));
    emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
    passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial empty model', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.model).toBeDefined();
  });

  it('should enable submit button when form is valid', async () => {
    firstNameInput.nativeElement.value = 'John';
    lastNameInput.nativeElement.value = 'Doe';
    emailInput.nativeElement.value = 'john@example.com';
    passwordInput.nativeElement.value = 'password123';

    firstNameInput.nativeElement.dispatchEvent(new Event('input'));
    lastNameInput.nativeElement.dispatchEvent(new Event('input'));
    emailInput.nativeElement.dispatchEvent(new Event('input'));
    passwordInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(submitButton.nativeElement.disabled).toBeFalse();
  });

  it('should reset form after submission', async () => {
    spyOn(component.form(), 'reset');
    component.model.firstName = 'John';
    component.model.lastName = 'Doe';
    component.model.email = 'john@example.com';
    component.model.password = 'password123';

    fixture.detectChanges();
    await fixture.whenStable();

    component.onSubmit(component.form());
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.form().reset).toHaveBeenCalled();
  });

  it('should display correct JSON output', async () => {
    component.model.firstName = 'John';
    component.model.lastName = 'Doe';
    component.model.email = 'john@example.com';
    component.model.password = 'password123';
    component.model.language = 'English';

    fixture.detectChanges();
    await fixture.whenStable();

    const jsonOutput = fixture.debugElement.query(By.css('pre small.model'));
    const displayedJson = JSON.parse(jsonOutput.nativeElement.textContent);
    console.log(displayedJson);

    expect(displayedJson).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      language: 'English',
    });
  });


  it('should display error message when first name is empty', async () => {
    await triggerValidation(firstNameInput, '');
    const errorMsg = fixture.debugElement.query(By.css('.form-group:first-child .form-control-feedback'));
    expect(errorMsg.nativeElement.textContent).toContain('First name is required');
  });

  it('should display error message when last name is empty', async () => {
    await triggerValidation(lastNameInput, '');
    const errorMsg = fixture.debugElement.query(By.css('.form-group:nth-child(2) .form-control-feedback'));
    expect(errorMsg.nativeElement.textContent).toContain('Last name is required');
  });

  it('should display error message when email is invalid', async () => {
    await triggerValidation(emailInput, 'invalidemail');
    const errorMsg = fixture.debugElement.query(By.css('#email-error-at-least'));
    expect(errorMsg.nativeElement.textContent).toContain('Email must contain at least the @ character');
  });

  it('should display error message when email is empty', async () => {
    await triggerValidation(emailInput, '');
    const errorMsg = fixture.debugElement.query(By.css('#email-error-required'));
    expect(errorMsg.nativeElement.textContent).toContain('Email is required');
  });

  it('should display error message when password is too short', async () => {
    await triggerValidation(passwordInput, 'werwe');
    const errorMsg = fixture.debugElement.query(By.css('#password-error-at-least'));
    expect(errorMsg.nativeElement.textContent).toContain('Password must be at least 8 characters long');
  });

  it('should display error message when password is empty', async () => {
    await triggerValidation(passwordInput, '');
    const errorMsg = fixture.debugElement.query(By.css('#password-error-required'));
    expect(errorMsg.nativeElement.textContent).toContain('Password is required');
  });

  async function triggerValidation(input: DebugElement, value: string) {
    input.nativeElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    await fixture.whenStable();

    input.nativeElement.value = value;
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    input.nativeElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    await fixture.whenStable();
  }
});
