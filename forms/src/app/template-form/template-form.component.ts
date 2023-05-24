import { Component } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { ConsultaCepService } from '../shared/services/consulta-cep.service'

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {
  constructor(private http: HttpClient, private cepService: ConsultaCepService) { }
  usuario: any = {
    nome: "",
    email: ""
  }
  onSubmit(form: any) {
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value)).pipe(map((res) => res)).subscribe(dados => { console.log(dados), form.form.reset() })
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
  consultaCEP(cep: any, form: any) {
    this.cepService.consultaCep(cep, this.resetaDadosForm, form)
      .subscribe((dados: any) => this.populaDadosForm(dados, form));
  }


}
