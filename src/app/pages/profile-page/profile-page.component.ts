import { ChangeDetectionStrategy, Component, computed, effect, inject, Injector, OnInit, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { UserLogged } from '../../auth/interfaces/user-logged.interface';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent, TypesInput } from '../../helpers/components/input/input.component';
import { matchPassword } from '../../shared/validators/match-password';
import { FormHelper } from '../../helpers/form-helpers';
import { UserProfile, UserService } from '../../users/services/user.service';
import { UserFormComponent } from "../../users/components/user-form/user-form.component";

@Component({
  selector: 'app-profile-page',
  imports: [LoaderComponent, ReactiveFormsModule, UserFormComponent],
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  typesInput = TypesInput;
  formHelpers = FormHelper;
  authService = inject(AuthService);
  userService = inject(UserService);
  user = signal<UserLogged | null>(null);
  imgSrc = signal<string>('');

  loadUser = effect(() => {
    this.authService.getUser().subscribe((data) => {
      this.user.set(data);
      this.imgSrc.set(data?.profile_picture_url ?? '');
    });
  })

  // fb = inject(FormBuilder);
  // profileForm = this.fb.group({
  //   name: ['',[Validators.minLength(6)]],
  //   email: ['',[Validators.email]],
  //   password: ['', [Validators.minLength(8)]],
  //   password_confirmation: ['', [Validators.minLength(8)]],
  //   profile_picture: this.fb.control<File | null>(null, {validators: []}),
  // }, {
  //   validators: [matchPassword('password', 'password_confirmation')]
  // })

  // loadForm = effect(() => {
  //   if(this.user()) {
  //     this.profileForm.patchValue({name: this.user()?.name, email: this.user()?.email});
  //   }
  // })

  // onSubmit(){
  //   this.profileForm.markAllAsTouched();
  //   console.log(typeof this.profileForm.controls.profile_picture);
  //   console.log({value: this.profileForm.value, isValid: this.profileForm.valid});
  //   if(this.profileForm.invalid) return;

  //   const value: Partial<UserProfile> = {...this.profileForm.value as any};

  //   this.userService.update(value).subscribe({
  //     next: (updated) => {
  //       if(!updated) return;

  //       this.authService.handleLogout();
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });
  // }

  // fileChanges(event: Event){
  //   const files = (event.target as HTMLInputElement).files ?? [];

  //   if(!files) return;
    
  //   this.imgSrc.set(URL.createObjectURL(files[0]));
  //   this.profileForm.patchValue({profile_picture: files[0]});
  // }
}
