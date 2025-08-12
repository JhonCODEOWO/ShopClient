import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { UserLogged } from '../../auth/interfaces/user-logged.interface';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent, TypesInput } from '../../helpers/components/input/input.component';

@Component({
  selector: 'app-profile-page',
  imports: [LoaderComponent, ReactiveFormsModule, InputComponent],
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  typesInput = TypesInput;
  authService = inject(AuthService);
  user = signal<UserLogged | null>(null);
  loadUser = effect(() => {
    this.authService.getUser().subscribe((data) => this.user.set(data));
  })

  fb = inject(FormBuilder);
  profileForm = this.fb.group({
    name: ['',[Validators.required,Validators.min(6)]],
    email: ['',[Validators.required,Validators.email]],
    password: ['', [Validators.required, Validators.min(8)]],
    password_confirmation: ['', [Validators.required, Validators.min(8)]],
    profile_picture: ['', []]
  })

  loadForm = effect(() => {
    if(this.user()) {
      this.profileForm.patchValue({name: this.user()?.name, email: this.user()?.email});
    }
  })

  onSubmit(){
    this.profileForm.markAllAsTouched();
    console.log(this.profileForm.value);
    if(this.profileForm.invalid) return;
  }
}
