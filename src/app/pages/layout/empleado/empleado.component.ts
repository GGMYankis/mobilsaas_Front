import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalEmpleadoComponent } from '../../../components/modal-empleado/modal-empleado.component';
import { IEmpleado, IRol } from '../../../Interfaces/AllInterfaces';
import { UsuarioService } from '../../../Services/usuario.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolService } from '../../../Services/rol.service';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css',
})
export class EmpleadoComponent implements OnInit, AfterViewInit {
  rol: string = '';

  columnasTabla = [
    'nombre',
    'apellido',
    'correo',
    'descripcionRol',
    'activo',
    'acciones',
  ];

  dataInicio: IEmpleado[] = [];
  dataListaEmpleados = new MatTableDataSource(this.dataInicio);

  constructor(
    private _snackBar: MatSnackBar,
    private _usuarioServicio: UsuarioService,
    private _rolServicio: RolService,
    private dialog: MatDialog
  ) {
   
  }

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataListaEmpleados.paginator = this.paginacionTabla;
  }

  obtenerEmpleados() {
    this._usuarioServicio.lista().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaEmpleados.data = data.value;
        } else {
          alert('Hubo Gun error');
        }
      },
    });
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.GetUser()
  }

  editarEmpleado(empleado: IEmpleado) {
    this.dialog
      .open(ModalEmpleadoComponent, { data: empleado })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.obtenerEmpleados();
      });
  }

  eliminarEmpleado(empleado: IEmpleado) {
    Swal.fire({
      title: 'Deseas eliminar el usuario',
      text: empleado.nombre,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then((result) => {
      if (result.isConfirmed) {
        this._usuarioServicio.Eliminar(empleado.idUsuario).subscribe({
          next: (data) => {
            if (data.status) {
              this._snackBar.open('El usuario fue eliminado', 'Exito', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 3000,
              });
              this.obtenerEmpleados();
            } else {
              this._snackBar.open('El usuario no fue eliminado', 'Error', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 3000,
              });
            }
          },
        });
      }
    });
  }

  nuevoEmpleado() {
    this.dialog
      .open(ModalEmpleadoComponent)
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'true') this.obtenerEmpleados();
      });
  }

  GetUser() {
    const dataCadena = localStorage.getItem('usuario');
    const usuario = JSON.parse(dataCadena!);
    this.rol = usuario.rolDescripcion;
  }
}
