import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { UserLogged } from '../../../auth/interfaces/user-logged.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPassword } from '../../../shared/validators/match-password';
import { FormHelper } from '../../../helpers/form-helpers';
import {
  InputComponent,
  TypesInput,
} from '../../../helpers/components/input/input.component';
import { UserProfile, UserService } from '../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CheckEmail } from '../../validators/check-email';
import { switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'user-form',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit{
  emailValidator = inject(CheckEmail);
  typesInput = TypesInput;
  formHelpers = FormHelper;
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  user = input<UserLogged | null>(null);
  imgSrc = signal<string>('https://placehold.co/400');

  fb = inject(FormBuilder);
  profileForm = this.fb.group(
    {
      name: ['', [Validators.minLength(6)]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(8)]],
      password_confirmation: ['', [Validators.minLength(8)]],
      profile_picture: this.fb.control<File | null>(null, { validators: [] }),
    },
    {
      validators: [matchPassword('password', 'password_confirmation')],
    }
  );

  //Init values of the component, if its a create function adds required validators
  ngOnInit(): void {
      if(this.user()) {
        this.imgSrc.set(this.user()!.profile_picture_url);
        this.profileForm.patchValue({name: this.user()?.name, email: this.user()?.email});
      } else {
        Object.entries(this.profileForm.controls).forEach(([key, value]) => {
          value.addValidators([Validators.required]);
        })
        this.profileForm.addAsyncValidators([this.emailValidator.validate.bind(this.emailValidator)]);
      }
  }

  onSubmit() {
    this.profileForm.markAllAsTouched();
    console.log({
      value: this.profileForm.value,
      isValid: this.profileForm.valid,
    });
    if (this.profileForm.invalid) return;

    const value: Partial<UserProfile> = { ...(this.profileForm.value as any) };

    //Validate if is a update or not.
    if (this.user()) {
      this.userService.update(value).subscribe({
        next: (updated) => {
          if (!updated) return;

          // this.authService.handleLogout();
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      //Create...
      this.userService.create({...value as any}).pipe(
        switchMap((userCreated) => this.authService.login(userCreated.email, value.password!)),
        tap(() => this.router.navigateByUrl(''))
      ).subscribe({
        next: (token) => {

        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }

  fileChanges(event: Event) {
    const files = (event.target as HTMLInputElement).files ?? [];

    if (!files) return;

    this.imgSrc.set(URL.createObjectURL(files[0]));
    this.profileForm.patchValue({ profile_picture: files[0] });
  }
}
