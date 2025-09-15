import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';


import { addIcons } from 'ionicons';
import { trashOutline, closeCircleOutline, addCircle, closeCircle, returnDownBack, } from 'ionicons/icons';


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});


addIcons({
  'trash-outline': trashOutline,
  'close-circle-outline': closeCircleOutline,
  'add-circle': addCircle,
  'close-circle': closeCircle,
  'return-down-back': returnDownBack,
});
