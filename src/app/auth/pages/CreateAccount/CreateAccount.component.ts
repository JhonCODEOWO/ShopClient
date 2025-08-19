import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserFormComponent } from "../../../users/components/user-form/user-form.component";

@Component({
  selector: 'app-create-account',
  imports: [UserFormComponent],
  templateUrl: './CreateAccount.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent { }
