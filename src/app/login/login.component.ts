import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { email, form, required } from '@angular/forms/signals';

interface Login {
  email: string;
  password: string;
  remember: boolean;
}

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  initial = signal<Login>({
    email: '',
    password: '',
    remember: false,
  });

  f = form(this.initial, spt => {
    required(spt.email, { message: 'Name is required' });
    email(spt.email, { message: 'Email must be valid' });
    required(spt.password, { message: 'Password is required' });
  });

  // Signal for "submitted"
  submitted = signal(false);

  onSubmit() {
    this.submitted.set(true);
    if (!this.f().valid()) return;
    const v = this.f().value();
    alert(`Great!! ${v.email} (remember: ${v.remember})`);
  }
}
