import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators'
import { DropdownService } from '../shared/services/dropdown.service'
import { ConsultaCepService } from '../shared/services/consulta-cep.service'
import { FormValidations } from '../shared/form-validations'
import { VerificaEmailService } from './services/verifica-email.service'
import { empty } from 'rxjs'
import { BaseFormComponent } from '../shared/base-form/base-form.component'

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {


  estados!: any
  cargos!: any
  tecnologias!: any
  newsletterOp: any
  frameworks = ['Angular', 'React', 'Vue', 'Sencha']
  constructor(private formBuilder: FormBuilder, private cepService: ConsultaCepService, private http: HttpClient, private dropDownService: DropdownService, private verificaEmailService: VerificaEmailService) { super() }
  ngOnInit() {
    this.estados = this.dropDownService.getEstadoBr()
    this.cargos = this.dropDownService.getCargos()
    this.tecnologias = this.dropDownService.getTecnologias()
    this.newsletterOp = this.dropDownService.getNewsletter()
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.email, Validators.required], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      cargo: [null],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      tecnologias: [null],
      newsletter: [null],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    })
    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCep((this.formulario.get('endereco.cep')?.value), this.resetaDadosForm, this.formulario)
          : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {})


  }


  override submit(): void {
    let valueSubmit = Object.assign({}, this.formulario.value)

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    })
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value)).pipe(map((res) => res)).subscribe((dados) => {
      console.log(dados)
      this.resetar()
    }, (error: any) => alert('error'))
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
    })
  }
  consultaCep() {
    let cep = this.formulario.get('endereco.cep')?.value
    this.cepService.consultaCep(cep, this.resetaDadosForm, this.formulario)
      .subscribe((dados: any) => this.populaDadosForm(dados))
  }
  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' }
    this.formulario.get('cargo')?.setValue(cargo)
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nivel === obj2.nivel) : obj1 === obj2
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php'])
  }
  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null
  }
  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false))
    return this.formBuilder.array(values, FormValidations.requiredMinCheckBox(1))

  }
  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null))
  }
}
