import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {
  formulario!: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }
  ngOnInit() {

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.email, Validators.required]]
    })
  }
  onSubmit() {
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value)).pipe(map((res) => res)).subscribe((dados) => {
      console.log(dados)
      this.resetar()
    }, (error: any) => alert('error'))
  }
  resetar() {
    this.formulario.reset()
  }
  verificaValidTouched(campo: any): any {
    return !this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched;
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');
    if (campoEmail?.errors) {
      return campoEmail?.errors['email'] && campoEmail.touched;
    }
  }

  aplicaCssErro(campo: any) {
    console.log(this.verificaValidTouched(campo))
    return {
      'is-invalid': this.verificaValidTouched(campo),
    }
  }
}
