import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { EventDetailPage } from './pages/events/detail/event-detail.page';
import { CreateEventPage } from './pages/events/create/event-create.page';
import { EventListPage } from './pages/events/event-list.page/event-list.page';
import { HomePage } from './pages/events/home.page';
import { LoginPage } from './pages/auth/login.page';
import { RegisterPage } from './pages/auth/register.page';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: RegisterPage},
  {
    path: 'home',
    canActivate: [authGuard],
    component: HomePage  
  },
  {
    path: 'events',
    canActivate: [authGuard],
    component: EventListPage
  },
  {
    path: 'events/create',
    canActivate: [authGuard],
    component: CreateEventPage
  },
  {
    path: 'events/:id',
    canActivate: [authGuard],
    component: EventDetailPage
  },
  {
    path: 'test',
    component: AppComponent
  },
  { path: '**', redirectTo: 'login' }
];



