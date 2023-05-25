import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, tap, delay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private http: HttpClient) { }

  verificarEmail(email: string): any {
    return this.http.get('assets/dados/verificarEmail.json')
      .pipe(
        delay(2000),
        map((dados: any) => {
          return dados.emails

        }),
        map((dados: any) => {
          return dados.filter((v: any) => v.email === email)
        }),
        map((dados: any) => dados.length > 0)
      )
  }
}
