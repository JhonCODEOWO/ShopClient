import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormHelper } from '../../form-helpers';

@Component({
  selector: 'app-text-area',
  imports: [ReactiveFormsModule],
  templateUrl: './text-area.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent {
  formHelpers = FormHelper;
  fg = input.required<FormGroup>();
  controlName = input.required<string>();
  label = input.required<string>();
  placeholder = input.required<string>();
}
