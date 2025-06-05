import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { SeenComponent } from './app/components/seen/seen.component';

bootstrapApplication(SeenComponent, appConfig)
  .catch((err) => console.error(err));
