import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { NumberSymbol } from '@angular/common';
import { UserLogged } from '../../auth/interfaces/user-logged.interface';
import { Observable } from 'rxjs';

export interface UserProfile {
  name: string;
  email: string;
  password: string;
  profile_picture: File;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  route = `${environment.API_URL}/users`;
  httpClient = inject(HttpClient);

  update(userLike: Partial<UserProfile>): Observable<boolean> {
    const formData = new FormData();
    formData.append('_method', 'PATCH');
    //Validate each userLike to append it in FormData

    Object.entries(userLike).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    return this.httpClient.post<boolean>(`${this.route}/update`, formData);
  }
}
