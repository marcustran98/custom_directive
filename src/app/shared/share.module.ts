import { NgModule } from '@angular/core';
import { HightLightDirective } from './directives/highlight.directive';
import { IsShowDirective } from './directives/isshow.directive';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
  declarations: [HightLightDirective, IsShowDirective, TooltipDirective],
  imports: [],
  exports: [HightLightDirective, IsShowDirective, TooltipDirective],
})
export class ShareModule {}
