import { AfterViewInit, Component, signal, viewChild } from '@angular/core';
import { Signup } from '../model/signup';
import { FormsModule, NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [FormsModule, JsonPipe],
})
export class SignupComponent implements AfterViewInit {
  model: Signup = new Signup();

  readonly form = viewChild.required<NgForm>('f');
  formValue = signal<Partial<Signup>>({});
  formValid = signal(false);

  ngAfterViewInit() {
    const f = this.form(); // Observables von Template-driven Form nutzen
    f.form.valueChanges?.subscribe(() => this.formValue.set(f?.value ?? {}));
    f.form.statusChanges?.subscribe(() => this.formValid.set(f?.valid ?? false));
  }

  langs: string[] = ['English', 'French', 'German'];

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted!');
      form.reset();
    }
  }
}
