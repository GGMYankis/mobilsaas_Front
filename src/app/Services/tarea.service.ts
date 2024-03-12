import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/Response';
import { ITarea, ITareaSend } from '../Interfaces/AllInterfaces';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private urlApi:string =  "http://localhost:5083/api/tarea";

  constructor(
    private http:HttpClient
  ) {
       

   }


   Lista():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Lista`);
   }

   Registrar(request:ITareaSend):Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}/Registrar` , request);
   }
   Editar(request:ITareaSend):Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}/Editar` , request);
   }
   Eliminar(id:Number):Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}/Eliminar/${id}`);
   }
   
}
