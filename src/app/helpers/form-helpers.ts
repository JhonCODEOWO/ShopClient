import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FormHelper {
  //Return the message of error inside a control or null if errors doesn't exists
  static showError(control: AbstractControl): string | null {
    return this.findError(control.errors);
  }

  //Find a key inside a ValidationErrors and return a personalized message
  static findError(errors: ValidationErrors | null): string | null {
    if (!errors) return null;

    for (const [key, value] of Object.entries(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'email':
          return 'El campo debe ser un email válido';

        case 'minlength':
          return `Este campo debe tener mínimo ${value.requiredLength} caracteres`;

        default:
          return 'No se ha definido una descripción para el error ' + key;
      }
    }
    return 'No se ha encontrado la key dentro de ValidationErrors';
  }
}
