import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Equipment } from '../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  url = 'http://localhost:8080/api/v1/teste/equipments';

  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getEquipmentByClient(): Observable<Equipment[]> {
    return this.httpClient.get<Equipment[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
