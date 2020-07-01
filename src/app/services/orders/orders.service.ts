import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
// API path
base_path = "http://api.mecologico.es/Catalogos/";

constructor(private http: HttpClient) {}

// Http Options
httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

// Handle API errors
handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error("An error occurred:", error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` + `body was: ${error.error}`
    );
  }
  // return an observable with a user-facing error message
  return throwError("Something bad happened; please try again later.");
}

realizarPedido(pedido: any): Observable<any> {
  return this.http
    .post<any>(
       "http://api.mecologico.es/Pedidos/",pedido,
      this.httpOptions
    )
    .pipe(catchError(this.handleError));
}

findPedidosByIdCatalogo(idCatalogo: Number): Observable<any> {
  return this.http
    .get<any>(
      this.base_path + idCatalogo + "/Pedidos",
      this.httpOptions
    )
    .pipe(catchError(this.handleError));
}
}
