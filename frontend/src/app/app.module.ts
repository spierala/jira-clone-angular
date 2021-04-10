import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { QuillModule } from 'ngx-quill';
import * as Sentry from '@sentry/angular';
import { Router } from '@angular/router';
import { StoreDevtoolsModule } from 'mini-rx-store-ng';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NzSpinModule,
    NzIconModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument({name: 'MiniRx Jira Dev Tools'}),
    QuillModule.forRoot()
  ],
  providers: [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler()
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
