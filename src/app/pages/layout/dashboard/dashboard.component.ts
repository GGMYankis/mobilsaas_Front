import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '../../../material/material/material.module';
import { DashBoardService } from '../../../Services/dash-board.service';
import { MatSnackBar } from '@angular/material/snack-bar';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  empleados: number = 0;
  activeTasks: number = 0;
  tasksInactive: number = 0;
  constructor(
    private _snackBar: MatSnackBar,
    private _dashboardService: DashBoardService
  ) {}

  obtenerResumen() {
    this._dashboardService.list().subscribe({
      next: (data) => {
        if (data.status) {
          this.tasksInactive = data.value.activeTasks;
          this.activeTasks = data.value.tasksInactive;
          this.empleados = data.value.usuarios;
        } else {
          this._snackBar.open('No se  encontraron datos', 'Oops', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      },
    });
  }

  ngOnInit(): void {
    this.obtenerResumen();
  }
  mostrar(dataGrafico: any, labelGrafico: any) {
    const chartBarras = new Chart('chartBarras', {
      type: 'bar',
      data: {
        labels: labelGrafico,
        datasets: [
          {
            label: 'ventas',
            data: dataGrafico,
            backgroundColor: 'red',
            borderColor: 'blue',
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
