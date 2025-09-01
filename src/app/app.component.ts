import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutShopComponent } from "./layout/shop/shop.component";
import { SettingsService } from './services/settings.service';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  settingService = inject(SettingsService);
  titleService = inject(Title);
  title = 'ShopClient';
  ngOnInit(): void {
      const element = document.querySelector<HTMLLinkElement>('#APP_ICON');
      this.settingService.getSettings().pipe(
        tap(values => {
          this.titleService.setTitle(values['APP_NAME']);
          if(element)
          element.href = values['APP_ICON'];
        })
      ).subscribe();
  }
}
