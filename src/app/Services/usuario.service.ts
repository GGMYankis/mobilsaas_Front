import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmpleado } from '../Interfaces/AllInterfaces';
import { ResponseApi } from '../Interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlApi: string = 'http://localhost:5083/api/Usuario';

  constructor(private http: HttpClient) {}

  lista(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}/Lista`);
  }


  Registrar(empleado: IEmpleado): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}/Registrar`, empleado);
  }

  EditarUsuario(empleado: IEmpleado): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}/Editar`, empleado);
  }

  Eliminar(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}/Eliminar/${id}`);
  }

  Login(correo: string, clave: string) {
    return this.http.post<ResponseApi>(`${this.urlApi}/Login` , {correo , clave})
  }

}
