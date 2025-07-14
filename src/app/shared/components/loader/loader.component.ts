import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-loader',
  imports: [],
  template: `
    <div class="flex justify-center flex-col items-center gap-y-2">
      <span class="loading loading-xl loading-dots text-success"></span>
      <p class="text-lg">Por favor espere...</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent { }
