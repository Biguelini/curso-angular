import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {
  constructor(private http: HttpClient) { }
  usuario: any = {
    nome: "",
    email: ""
  }
  onSubmit(form: any) {
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value)).pipe(map((res) => res)).subscribe(dados => {console.log(dados), form.form.reset()})
  }
  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
    }
  }
  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }
  populaDadosForm(dados: any, formulario: any) {


    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })

  }
  consultaCEP(cep: string, form: any) {
    cep = cep.replace(/\D/g, '')

    if (cep != "") {

      var validacep = /^[0-9]{8}$/

      if (validacep.test(cep)) {
        this.resetaDadosForm(form)
        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .pipe(map((dados: any) => dados))
          .subscribe(dados => this.populaDadosForm(dados, form))
      }
    }

  }


}
