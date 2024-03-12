import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IEmpleado, IRol, ITarea } from '../../Interfaces/AllInterfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../Services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolService } from '../../Services/rol.service';

@Component({
  selector: 'app-modal-empleado',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './modal-empleado.component.html',
  styleUrl: './modal-empleado.component.css',
})
export class ModalEmpleadoComponent implements OnInit {
  ngOnInit(): void {}
  tituloModal: string = 'Nuevo Empleado';
  nombreBoton: string = 'Guardar';
  formularioEmpleado: FormGroup;
  ListRoles: IRol[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private modalActual: MatDialogRef<ModalEmpleadoComponent>,
    private _usuarioServicio: UsuarioService,
    private _rolServicio: RolService,
    @Inject(MAT_DIALOG_DATA) public dataEmpleado: IEmpleado,
    private fb: FormBuilder
  ) {
    this.formularioEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      idRol: ['', Validators.required],
      correo: ['', Validators.required],
      clave: ['', Validators.required],
      activo: ['1', Validators.required],
    });

    if (dataEmpleado != null) {
      this.tituloModal = 'Editar Empleado';
      this.nombreBoton = 'Editar';
      this.formularioEmpleado.patchValue({
        nombre: this.dataEmpleado.nombre,
        apellido: this.dataEmpleado.apellido,
        correo: this.dataEmpleado.correo,
        clave: this.dataEmpleado.clave,
        activo: this.dataEmpleado.activo,
        idRol: this.dataEmpleado.idRol,
      });
    }

    this._rolServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          console.log(data)
          this.ListRoles = data.value;
        } else {
          this._snackBar.open('No se encontraron roles', 'error', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      },
    });
  }

  guardarEmpleado() {
    const empleado: IEmpleado = {
      idUsuario: this.dataEmpleado == null ? 0 : this.dataEmpleado.idUsuario,
      nombre: this.formularioEmpleado.value.nombre,
      apellido: this.formularioEmpleado.value.apellido,
      correo: this.formularioEmpleado.value.correo,
      clave: this.formularioEmpleado.value.clave,
      activo: this.formularioEmpleado.value.activo,
      idRol: this.formularioEmpleado.value.idRol,
      descripcionRol: '',
    };

    if (this.dataEmpleado == null) {
      this._usuarioServicio.Registrar(empleado).subscribe({
        next: (data) => {
          if (data.status) {
            this._snackBar.open('El usuario fue registrado', 'Exito', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 3000,
            });
 
            this.modalActual.close('true');
          } else {
            this._snackBar.open(data.msg, 'Error', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        },
        error: (e) => {},
      });
    } else {
      this._usuarioServicio.EditarUsuario(empleado).subscribe({
        next: (data) => {
          if (data.status) {
            this._snackBar.open('El usuario fue editado', 'Exito', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 3000,
            });

            this.modalActual.close('true');
          } else {
            this._snackBar.open(data.msg, 'Error', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        },
      });
    }
  }
}
