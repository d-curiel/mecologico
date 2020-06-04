import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CatalogsService {
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

  findAll(): Observable<any> {
    return this.http
      .get<any>(this.base_path, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  findProductosClasificadosByIdCatalogo(idCatalogo: Number): Observable<any> {
    return this.http
      .get<any>(
        this.base_path + idCatalogo + "/ClasificacionProductos",
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }
}
