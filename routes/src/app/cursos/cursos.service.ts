import { Injectable } from '@angular/core';

interface ICursos {
  id: string
  nome: string
}

@Injectable({
  providedIn: 'root'
})

export class CursosService {

  cursos: ICursos[] = [{ id: '1', nome: 'Angular' }, { id: '2', nome: 'Java' }]
  getCursos() {
    return this.cursos
  }
  getCursoById(id: string) {
    const curso = this.cursos.filter(curso => curso.id === id)
    return curso[0]
  }
  constructor() { }
}
