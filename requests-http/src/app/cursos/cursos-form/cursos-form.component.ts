import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CursosService } from '../cursos.service'
import { AlertModalService } from 'src/app/shared/alert-modal.service'
import { Location } from '@angular/common'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs'

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.css']
})
export class CursosFormComponent implements OnInit {
  form!: FormGroup
  submitted = false
  constructor(private fb: FormBuilder, private service: CursosService, private modal: AlertModalService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    const curso = this.route.snapshot.data['curso']
    this.form = this.fb.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3)]]
    })
  }
  hasError(field: string) {
    return this.form.get(field)?.errors

  }
  onSubmit() {
    if (this.form.valid) {
      this.submitted = true
      console.log('oi')
      console.log(this.form.value)


      this.service.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(this.form.value.id ? 'Atualizado com sucesso!' : 'Criado com sucesso!')
          this.location.back()
        },
        error => this.modal.showAlertDanger(this.form.value.id ? 'Erro ao atualizar' : 'Erro ao atualizar'),
        () => console.log('request OK')

      )

    }

  }
  onCancel() {
    this.submitted = false
  }

}
