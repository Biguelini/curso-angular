import { Component, OnInit, ViewChild } from '@angular/core'
import { Curso } from '../cursos'
import { EMPTY, Observable, Subject, catchError, empty, switchMap, take } from 'rxjs'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { AlertModalService } from 'src/app/shared/alert-modal.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Cursos2Service } from '../cursos2.service'

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {
  deleteModalRef!: BsModalRef
  cursos!: Observable<Curso[]>
  error = new Subject<boolean>()
  cursoSelecionado!: Curso
  @ViewChild('deleteModal') deleteModal: any
  constructor(private service: Cursos2Service, private alertService: AlertModalService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.onRefresh()
  }
  onRefresh() {
    this.cursos = this.service.list().pipe(catchError(error => {
      console.log(error)
      this.handleError()
      this.error.next(true)
      return empty()
    }))
  }
  handleError() {

    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.')

  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], { relativeTo: this.route })
  }

  onDelete(curso: any) {
    this.cursoSelecionado = curso
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' })

    const result$ = this.alertService.showConfirm('Confirmacao', 'Tem certeza que deseja remover esse curso?')
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.remove(curso.id) : EMPTY)
      )
      .subscribe(
        success => {
          this.onRefresh()
        },
        error => {
          this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.')
        }
      )
  }

  onConfirmDelete() {
    this.service.remove(this.cursoSelecionado.id)
      .subscribe(
        (success: any) => {
          this.onRefresh()
          this.deleteModalRef.hide()
        },
        (error: any) => {
          this.alertService.showAlertDanger('Erro ao remover curso. Tente novamente mais tarde.')
          this.deleteModalRef.hide()
        }
      )
  }

  onDeclineDelete() {
    this.deleteModalRef.hide()
  }
}
