import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { TareaService } from '../../../Services/tarea.service';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITarea } from '../../../Interfaces/AllInterfaces';
import { MatDialog } from '@angular/material/dialog';
import { ModalTaskViewComponent } from '../../../components/modal-task-view/modal-task-view.component';

@Component({
  selector: 'app-resumen-tarea',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './resumen-tarea.component.html',
  styleUrl: './resumen-tarea.component.css',
})
export class ResumenTareaComponent implements OnInit {
  ListaTareas: ITarea[] = [];

  constructor(
    private _tareaService: TareaService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  obtenerTareas() {
    this._tareaService.Lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.ListaTareas = data.value;
        } else {
          this._snackBar.open('No se encontraron datos', 'Oops', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      },
    });
  }

  ngOnInit(): void {
    this.obtenerTareas();
  }

  verTarea(tarea:ITarea) {
    this.dialog.open(ModalTaskViewComponent ,  {
      data:tarea,
      height: '400px',
      width: '600px',
    });
  }
}
