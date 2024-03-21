
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DefaultLogAppender } from './app/shared/logger/log-appender';
import { LogLevel } from './app/shared/logger/log-level';
import { LoggerModule } from './app/shared/logger/logger-module';
import { LayoutModule } from '@angular/cdk/layout';
import { APP_ROUTES } from './app/app.routes';
import { withPreloading, provideRouter, PreloadAllModules } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './app/shared/legacy.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideLogger } from './app/shared/logger/providers';
import { withColor } from './app/shared/logger/features';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule),
        provideAnimations(),
        provideLogger({}, withColor()),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideRouter(APP_ROUTES, withPreloading(PreloadAllModules))
    ]
});