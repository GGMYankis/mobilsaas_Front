import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material/material/material.module';
import { UtilService } from '../../Services/util.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  correo: string = '';
  rol: string = '';
  nombre:string =''
  constructor(private _utilServices: UtilService) {}

  cerrarSesion() {
    localStorage.removeItem('usuario');
  }

  GetUser() {
    const dataCadena = localStorage.getItem('usuario');
    const usuario = JSON.parse(dataCadena!);
    
    this.correo = usuario.correo;
    this.rol = usuario.rolDescripcion;
    this.nombre = usuario.nombre.substring(0,1)+ usuario.apellido.substring(0,1);
  }

  ngOnInit(): void {
    this.GetUser();
  }
}
