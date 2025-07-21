import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormHelper } from '../../form-helpers';

export enum TypesInput {
  TEXT = 'text', 
  NUMBER = 'number', 
  EMAIL = 'email', 
  PASSWORD = 'email', 
}

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  formHelpers = FormHelper;
  fg = input.required<FormGroup>();
  //Name for the input
  controlName = input.required<string>();
  label = input.required<string>();
  type = input.required<TypesInput>();
  placeholder = input.required<string>();
}
