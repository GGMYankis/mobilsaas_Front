import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private urlApi: string = 'http://localhost:5083/api/Usuario';


  constructor(private http: HttpClient) {}

  resetPassword(request: any):Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}/EnviarCorreo`, request);
  }
  
   
  UpdatePassword(request: any):Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}/Actualizar`, request);
  }
}
