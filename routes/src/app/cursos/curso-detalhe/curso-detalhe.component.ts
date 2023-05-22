import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit, OnDestroy {
  id!: string
  inscricao!: Subscription
  curso!: any
  constructor(private route: ActivatedRoute, private cursosService: CursosService, private router: Router) {
    // this.id = this.route.snapshot.params['id']
  }
  ngOnInit() {
    this.inscricao = this.route.params.subscribe((params: any) => { this.id = params['id'] })
    this.curso = this.cursosService.getCursoById(this.id)
    if (this.curso == null) {
      this.router.navigate(['/naoEncontrado'])
    }
  }
  ngOnDestroy() {
    this.inscricao.unsubscribe()
  }
}
