import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { map } from 'rxjs/operators'
import { DropdownService } from '../shared/services/dropdown.service'
import { EstadoBr } from '../shared/models/estado-br'
import { ConsultaCepService } from '../shared/services/consulta-cep.service'

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario!: FormGroup
  estados!: EstadoBr[]
  constructor(private formBuilder: FormBuilder, private cepService: ConsultaCepService, private http: HttpClient, private dropDownService: DropdownService) { }
  ngOnInit() {
    this.estados = [];
    this.dropDownService.getEstadoBr().subscribe((res: EstadoBr) => {
      this.estados.push(res)
    })
    console.log(this.estados)
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.email, Validators.required]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    })
  }
  onSubmit() {
    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value)).pipe(map((res) => res)).subscribe((dados) => {
        console.log(dados)
        this.resetar()
      }, (error: any) => alert('error'))
    } else {
      this.verificaValidacoesForm(this.formulario)
    }
  }
  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((campo: any) => {
      const controle = formGroup.get(campo)
      controle?.markAsDirty()
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle)
      }
    })

  }
  resetar() {
    this.formulario.reset()
  }
  verificaValidTouched(campo: any): any {
    return !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty);
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');
    if (campoEmail?.errors) {
      return campoEmail?.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
    }
  }
  populaDadosForm(dados: any) {


    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })

  }
  resetaDadosForm(formulario: any) {
    formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
  consultaCep() {
    let cep = this.formulario.get('endereco.cep')?.value;
    this.cepService.consultaCep(cep, this.resetaDadosForm, this.formulario)
      .subscribe((dados: any) => this.populaDadosForm(dados));
  }
}
