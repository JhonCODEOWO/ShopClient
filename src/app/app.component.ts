import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutShopComponent } from "./layout/shop/shop.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ShopClient';
}
