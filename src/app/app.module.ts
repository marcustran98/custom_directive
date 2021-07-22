import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ShareModule } from './shared/share.module';

@NgModule({
  declarations: [
    AppComponent,
    TooltipComponent,
    HighlightComponent
  ],
  imports: [
    BrowserModule,
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
