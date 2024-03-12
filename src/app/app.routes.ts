import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { EditPasswordComponent } from './pages/edit-password/edit-password.component';
import { loginGuard } from './login.guard';
import { ModalBuildComponent } from './components/modal-build/modal-build.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/layout/layout.routes').then((m) => m.ROUTES_LAYOUT),
   /*    canActivate:[loginGuard] */
  }, 
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'restablecer',
    component: PasswordResetComponent,
    pathMatch: 'full',
  },
  {
    path: 'actualizar/:token',
    component: EditPasswordComponent,
    pathMatch: 'full',
  },
  {
    path: 'build',
    component: ModalBuildComponent,
    pathMatch: 'full',
  },
];
