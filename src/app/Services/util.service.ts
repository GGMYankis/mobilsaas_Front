import { Injectable } from '@angular/core';
import { Sesion } from '../Interfaces/AllInterfaces';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  guardarSesionUsuario(usuarioSession:Sesion){
    localStorage.setItem("usuario" ,JSON.stringify(usuarioSession));
  }

  obtenerSesionUsuario(){
    const dataCadena = localStorage.getItem("usuario");
    const usuario = JSON.parse(dataCadena!);
    return usuario;
  }
}
