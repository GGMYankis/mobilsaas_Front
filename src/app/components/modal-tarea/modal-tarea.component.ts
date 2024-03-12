import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from '../../Services/tarea.service';
import { IEmpleado, ITarea, ITareaSend } from '../../Interfaces/AllInterfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../Services/usuario.service';

@Component({
  selector: 'app-modal-tarea',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './modal-tarea.component.html',
  styleUrl: './modal-tarea.component.css',
})
export class ModalTareaComponent {
  formularioTarea: FormGroup;

  listUser: IEmpleado[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalTareaComponent>,
    private _snackBar: MatSnackBar,
    private _tareaServicio: TareaService,
    private _usuarioServicio: UsuarioService,
    private fb: FormBuilder
  ) {
    this.formularioTarea = this.fb.group({
      idUsuario: ['', Validators.required],
      idCreador: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      activo: ['1', Validators.required],
    });

    this._usuarioServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.listUser = data.value;
        } else {
        }
      },
    });
  }

  nuevaTarea() {
    const tarea: ITareaSend = {
      idTarea: 0,
      idUsuario: this.formularioTarea.value.idUsuario,
      idCreador: this.formularioTarea.value.idCreador,
      titulo: this.formularioTarea.value.titulo,
      descripcion: this.formularioTarea.value.descripcion,
      tipo: this.formularioTarea.value.tipo,
      activo: this.formularioTarea.value.activo == 1 ? true : false,
    };

    this._tareaServicio.Registrar(tarea).subscribe({
      next: (data) => {
        if (data.status) {
          this._snackBar.open('La tarea fue registrada', 'Exito', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
          });
          this.modalActual.close('true');
        } else {
          this._snackBar.open('La tarea fue Guardada', 'Error', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      },
    });
  }
}
