import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Link, PaginatedResponse } from '../../interfaces/get-all.interfacte';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  router = inject(Router);
  links = input.required<Link[]>();
  pageClicked = output<number>();

  onPageClick(page: string){
    //Convertir a int
    const converted = +page;
    if(isNaN(converted)) return;
    this.router.navigate([], {queryParams: {page: converted}, queryParamsHandling: 'merge'});
    this.pageClicked.emit(converted);
  }
}
