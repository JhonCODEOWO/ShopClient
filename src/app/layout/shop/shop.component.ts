import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'layout-shop',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './shop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutShopComponent {
  authService = inject(AuthService);
  user = this.authService._user();

  logout(){
    this.authService.logout().subscribe(result => console.log(result));
  }
}
