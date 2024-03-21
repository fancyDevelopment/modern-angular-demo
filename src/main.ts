
import { platformBrowser, BrowserModule, bootstrapApplication } from '@angular/platform-browser';
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
import { LegacyInterceptor } from './app/shared/legacy.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, LayoutModule, LoggerModule.forRoot({
            level: LogLevel.DEBUG,
            appenders: [DefaultLogAppender],
            formatter: (level, cat, msg) => [level, cat, msg].join(';'),
        }), MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LegacyInterceptor,
            multi: true,
        },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(APP_ROUTES, withPreloading(PreloadAllModules))
    ]
});