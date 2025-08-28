import { effect, Injectable, signal } from '@angular/core';

export type Themes = 'night' | 'wireframe';
const KEY_STORAGE = 'theme';

@Injectable({providedIn: 'root'})
export class ThemeService {
    private availableThemes: Themes[] = ['night', 'wireframe'];
    actualTheme = signal<string>(localStorage.getItem(KEY_STORAGE) ?? 'wireframe');

    constructor(){
        this.setTheme(this.actualTheme());
    }

    setTheme(name: string){
        if(!this.availableThemes.includes(name as Themes)) return;

        const html = document.getElementById('html');
        if(html) {
            html.dataset['theme'] = name;
            localStorage.setItem(KEY_STORAGE, name);
            this.actualTheme.set(name);
        }
    }
}