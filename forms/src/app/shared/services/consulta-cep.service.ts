import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }


  consultaCep(cep: string, resetaFormCallback: any, formulario: any): any {
    cep = cep.replace(/\D/g, '')

    if (cep != "") {

      var validacep = /^[0-9]{8}$/

      if (validacep.test(cep)) {
        resetaFormCallback(formulario);

        return this.http.get(`//viacep.com.br/ws/${cep}/json/`)

      }
    }

  }
}
