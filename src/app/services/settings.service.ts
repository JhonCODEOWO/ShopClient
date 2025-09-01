import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SettingsResponse } from '../interfaces/settings.response.interface';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class SettingsService {
    client = inject(HttpClient);
    private currentSettings = signal<SettingsResponse | null>(null); //Almacena las configuraciones globales
    
    //Propiedad publica que devuelve los ajustes
    settings = computed(() => {
        return this.currentSettings()
    })
    
    getSettings(): Observable<SettingsResponse>{
        return this.client.get<SettingsResponse>(`${environment.API_URL}/settings`).pipe(tap(values => this.currentSettings.set(values)));
    }
}