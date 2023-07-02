import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',  // This line is important
})
export class TextGeneratorService {
  private generateUrl = 'https://bible-ai.onrender.com/generate';  // URL to web api

  constructor(private http: HttpClient) { }

  generateText(startingString: string, maxNewTokens: number): Observable<any> {
    return this.http.post(this.generateUrl, { starting_string: startingString, max_new_tokens: maxNewTokens })
      .pipe(
        catchError((error: any) => {
          // Handle the error here
          console.error('An error occurred:', error);

          // Optionally, you can re-throw the error to propagate it to the subscriber
          return throwError(error);
        })
      );
  }
}
