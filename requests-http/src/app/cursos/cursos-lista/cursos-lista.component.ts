import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../cursos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  cursos!: Observable<Curso[]>;

  constructor(private service: CursosService) { }

  ngOnInit() {
    this.cursos = this.service.list()
  }

}
