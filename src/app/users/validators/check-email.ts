import { inject, Injectable } from "@angular/core";
import { AsyncValidator, AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable, map, catchError, of } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({providedIn: 'root'})
export class CheckEmail implements AsyncValidator {
  private readonly actorsService = inject(UserService);
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.actorsService.checkEmail(control.value).pipe(
      map((isTaken) => (isTaken ? {uniqueEmail: true} : null)),
      catchError(() => of(null)),
    );
  }
}