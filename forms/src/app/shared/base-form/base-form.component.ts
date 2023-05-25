import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<br>'
})
export abstract class BaseFormComponent {
  formulario!: FormGroup
  abstract submit(): any
  onSubmit() {
    if (this.formulario.valid) {
      this.submit()
    } else {
      this.verificaValidacoesForm(this.formulario)
    }
  }
  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo: any) => {
      const controle = formGroup.get(campo)
      controle?.markAsDirty()
      controle?.markAsTouched()
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle)
      }
    })

  }
  resetar() {
    this.formulario.reset()
  }
  verificaValidTouched(campo: any): any {
    return !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
  }
  verificaRequired(campo: any): any {
    return this.formulario.get(campo)?.hasError('required') && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
  }
  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email')
    if (campoEmail?.errors) {
      return campoEmail?.errors['email'] && campoEmail.touched
    }
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
    }
  }
}
