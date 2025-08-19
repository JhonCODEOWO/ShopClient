import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function matchPassword(controlName1: string, controlName2: string): ValidatorFn{
    return (form: AbstractControl): ValidationErrors | null =>{
        const field1 = form.get(controlName1);
        const field2 = form.get(controlName2);

        if(field1?.value === field2?.value) return null;

        return {notMatchFields: {fieldNames: `${controlName1} - ${controlName2}`}}
    }
}