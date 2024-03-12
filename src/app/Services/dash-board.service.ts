import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/Response';


@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  private urlApi: string = 'http://localhost:5083/api/DashBoard';

  constructor(

    private http:HttpClient
  ){}


  list():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Lista`);
  }
}
