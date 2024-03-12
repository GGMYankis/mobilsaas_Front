import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITarea, ITareaSend } from '../../Interfaces/AllInterfaces';
import { MaterialModule } from '../../material/material/material.module';
import { TareaService } from '../../Services/tarea.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-task-view',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './modal-task-view.component.html',
  styleUrl: './modal-task-view.component.css',
})
export class ModalTaskViewComponent {
  formulario: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private _tareaServicio: TareaService,
    private modalActual: MatDialogRef<ModalTaskViewComponent>,
    @Inject(MAT_DIALOG_DATA) public datatarea: ITarea
  ) {
    this.formulario = this.fb.group({
      activo: ['1', Validators.required],
    });


  }

  editarTarea() {
    const tarea: ITareaSend = {
      idTarea: this.datatarea.idTarea,
      idUsuario: this.datatarea.idUsuario,
      idCreador: this.datatarea.idCreador,
      titulo: this.datatarea.titulo,
      descripcion: this.datatarea.descripcion,
      tipo: this.datatarea.tipo,
      activo: this.formulario.value.activo == 1 ? true : false,
    };

    console.log(this.formulario.value.activo)
   this._tareaServicio.Editar(tarea).subscribe({
      next: (data) => {
        if (data.status) {
          this._snackBar.open('La tarea fue editada', 'Exito', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
          });
          this.modalActual.close('true');

        } else {
          this._snackBar.open('La tarea no fue editada', 'Error', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      },
    }); 
  }



}
