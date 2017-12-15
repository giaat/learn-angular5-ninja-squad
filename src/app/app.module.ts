import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import * as Webstomp from 'webstomp-client';

import { ROUTES } from './app.routes';
import { LoggedInGuard } from './logged-in.guard';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

import { UserService } from './user.service';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { WEBSOCKET, WEBSTOMP } from './app.tokens';
import { WsService } from './ws.service';

@NgModule({
  declarations: [AppComponent, MenuComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [
    UserService,
    JwtInterceptorService,
    { provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptorService, multi: true },
    { provide: WEBSOCKET, useFactory: () => WebSocket },
    { provide: WEBSTOMP, useFactory: () => Webstomp },
    WsService,
    LoggedInGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
