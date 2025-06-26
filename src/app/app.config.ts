import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "@app/app.routes";
import { provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { provideHotToastConfig } from "@ngxpert/hot-toast";

export const appConfig: ApplicationConfig =
{
  providers:
    [
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideRouter(routes),
      provideHttpClient(withFetch()),
      provideHotToastConfig({ dismissible: true, position: "top-center", duration: 3000 }),
      provideHttpClient(withInterceptorsFromDi())
    ]
};
