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
import { PaginatedResponse } from '../../shared/interfaces/get-all.interfacte';
import { SaleInterface } from '../../interfaces/sale.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [LoaderComponent, ReactiveFormsModule, UserFormComponent, CurrencyPipe],
  templateUrl: './profile-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  typesInput = TypesInput;
  formHelpers = FormHelper;
  authService = inject(AuthService);
  userService = inject(UserService);
  page = signal(1);
  
  user = signal<UserLogged | null>(null); //Data of user
  sales = signal<PaginatedResponse<SaleInterface> | null>(null);
  imgSrc = signal<string>(''); //Url de la imagen a mostrar

  loadUser = effect(() => {
    this.authService.getUser().subscribe((data) => {
      this.user.set(data);
      this.imgSrc.set(data?.profile_picture_url ?? '');
    });
  })

  loadSales = effect(() => {
    this.authService.getSales().subscribe((sales) => this.sales.set(sales))
  })

  onLoadMore(){
    this.page.update((prev) => prev+1);
    this.authService.getSales('', this.page()).subscribe((sales) => this.sales.update((actual) => {
      if(!actual) return sales;
      return {
        ...actual,
        ...sales,
        data: [...actual.data, ...sales.data]
      }
    }))
  }
}
