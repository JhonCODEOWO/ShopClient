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
  password_confirmation: string;
  profile_picture: File;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  route = `${environment.API_URL}/users`;
  httpClient = inject(HttpClient);

  create(user: UserProfile): Observable<UserLogged>{
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('password_confirmation', user.password_confirmation);
    formData.append('profile_picture', user.profile_picture);
    return this.httpClient.post<UserLogged>(`${this.route}/store`, formData);
  }

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

  checkEmail(email: string, ignore: boolean = false): Observable<boolean>{
    return this.httpClient.get<boolean>(`${this.route}/verifyEmail/${email}`);
  }
}
