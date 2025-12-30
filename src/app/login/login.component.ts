import { Component, signal, computed } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Signals for Input Fields
  email = signal('');
  password = signal('');
  remember = signal(false);

  // Signal for "submitted"
  submitted = signal(false);

  // Signals for Validation
  emailErrors = computed(() => {
    const value = this.email();
    if (!value) return { required: true };
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) return { email: true };
    return null;
  });

  passwordErrors = computed(() => {
    const value = this.password();
    if (!value) return { required: true };
    return null;
  });

  formValid = computed(() => !this.emailErrors() && !this.passwordErrors());

  onSubmit() {
    this.submitted.set(true);
    if (!this.formValid()) {
      return;
    }
    alert(`Great!! ${this.email()} (remember: ${this.remember()})`);
  }
}
