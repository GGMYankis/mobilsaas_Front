import { Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';
import { TareaComponent } from './tarea/tarea.component';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResumenTareaComponent } from './resumen-tarea/resumen-tarea.component';

export const ROUTES_LAYOUT: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch:'full'
      },
      {
        path: 'empleados',
        component: EmpleadoComponent,
        pathMatch:'full'
      },
      {
        path: 'resumenTarea',
        component: ResumenTareaComponent,
        pathMatch:'full'
      },
      {
        path: 'tareas',
        component: TareaComponent,
        pathMatch:'full'
      }
    ],
  },
];
