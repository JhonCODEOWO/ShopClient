import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { InputComponent, TypesInput } from '../../../helpers/components/input/input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MiniMapComponent } from "../../../shared/components/mini-map/mini-map.component";
import { LngLat, LngLatLike } from 'maplibre-gl';
import { TextAreaComponent } from "../../../helpers/components/text-area/text-area.component";
import { FormHelper } from '../../../helpers/form-helpers';
import { SaleService } from '../../../services/sale.service';
import { ItemsCartService } from '../../../cart-shopping/items-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check',
  imports: [InputComponent, ReactiveFormsModule, MiniMapComponent, TextAreaComponent],
  templateUrl: './check.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckComponent{
  saleService = inject(SaleService);
  cartService = inject(ItemsCartService);
  router = inject(Router);
  
  formHelpers = FormHelper;
  fb = inject(FormBuilder);
  typesInput = TypesInput;

  form = this.fb.group({
    lng: [{value: '', disabled: true}, [Validators.required], []],
    lat: [{value: '', disabled: true}, [Validators.required]],
    street: ['', [Validators.required]],
    city: ['', [Validators.required]],
    internal_number: ['', [Validators.required]],
    external_number: ['', [Validators.required]],
    references: ['', [Validators.required]],
    due_date: ['', [Validators.required]],
    products: [this.cartService.toProductInSale(), [Validators.required, Validators.minLength(1)]]
  });

  onSubmit(){
    this.form.markAllAsTouched();
    //Validate if the products are in cart
    if(this.form.invalid) return;
    console.log(this.form.getRawValue());
    
    //Send data to the backend
    this.saleService.createSale({...this.form.getRawValue() as any}).subscribe({
      next: (value) => {
        console.log(value);
        this.cartService.removeAll();
        this.router.navigateByUrl('');
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onClickedMap(lngLat: LngLat){
    const {lat, lng} = lngLat;
    this.form.controls['lng'].setValue(lng.toString());
    this.form.controls['lat'].setValue(lat.toString());
  }
}
