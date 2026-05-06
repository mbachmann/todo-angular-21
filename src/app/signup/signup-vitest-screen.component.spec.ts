import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';

async function renderSignup() {
  TestBed.configureTestingModule({
    imports: [SignupComponent],
    providers: [importProvidersFrom(FormsModule)],
  });

  const fixture = TestBed.createComponent(SignupComponent);
  fixture.detectChanges();

  const component = fixture.componentInstance;
  const user = userEvent.setup();

  return { user, component };
}

describe(SignupComponent.name, () => {
  it('should render the signup form', async () => {
    await renderSignup();

    const submit = screen.getByRole('button', { name: /submit/i });
    expect(submit).not.toBeNull();
  });

  it('should enable submit button when form is valid', async () => {
    const { user } = await renderSignup();

    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');

    const submit = screen.getByRole('button', { name: /submit/i });
    expect((submit as HTMLButtonElement).disabled).toBe(false);
  });

  it('should reset form after submission', async () => {
    const { user, component } = await renderSignup();
    const resetSpy = vi.spyOn(component.form(), 'reset');

    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(resetSpy).toHaveBeenCalled();
  });

  it('should show error when first name is empty', async () => {
    const { user } = await renderSignup();

    const firstName = screen.getByLabelText(/first name/i);
    await user.click(firstName);
    await user.tab();

    const error = screen.getByText(/first name is required/i);
    expect(error).not.toBeNull();
  });

  it('should show error when email is invalid', async () => {
    const { user } = await renderSignup();

    await user.type(screen.getByLabelText(/email/i), 'invalidemail');
    await user.tab();

    const error = screen.getByText(/@ character/i);
    expect(error.textContent).toContain('@');
  });
});
