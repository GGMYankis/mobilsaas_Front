import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../material/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalTareaComponent } from '../../../components/modal-tarea/modal-tarea.component';
import { ITarea } from '../../../Interfaces/AllInterfaces';
import { TareaService } from '../../../Services/tarea.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css',
})
export class TareaComponent implements OnInit {
  rol: string = '';

  columnasTabla = [
    'titulo',
    'descripcion',
    'creador',
    'usuario',
    'fechaRegistrada',
    'fechaLimite',
    'activo',
    'acciones',
  ];
  datosListaTareas = new MatTableDataSource();

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _tareaServices: TareaService
  ) {}

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  ngAfterViewInit(): void {
    this.datosListaTareas.paginator = this.paginacionTabla;
  }
  ObtenerTareas() {
    this._tareaServices.Lista().subscribe({
      next: (data) => {
         if (data.status) {
          this.datosListaTareas.data = data.value;
        } else{
          this._snackBar.open('No se encontraron las tareas', 'Error', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      },
    });
  }

  ngOnInit(): void {
    this.ObtenerTareas();
    this.GetUser();
  }

  nuevaTarea() {
    this.dialog.open(ModalTareaComponent)
    .afterClosed()
    .subscribe((resultado) => {
      if (resultado === 'true') this.ObtenerTareas();
    });
  }

  eliminarTarea(tarea:ITarea) {

    Swal.fire({
      title: 'Deseas eliminar la tarea',
      text: tarea.titulo,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver',
    }).then(result => {
      if(result.isConfirmed){
        this._tareaServices.Eliminar(tarea.idTarea).subscribe({
          next:(data) => {
            if(data.status){
              this._snackBar.open('La tarea fue eliminada', 'exito', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 3000,
              });           
              this.ObtenerTareas();     
            }else{
              this._snackBar.open(data.msg, 'Error', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
                duration: 3000,
              });
            }
          }
        })
      }
    })

  }
  GetUser() {
    const dataCadena = localStorage.getItem('usuario');
    const usuario = JSON.parse(dataCadena!);
    this.rol = usuario.rolDescripcion;
  }
}
