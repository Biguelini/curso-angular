import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, take } from 'rxjs/operators';
import { Curso } from './cursos';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.API)
  }
  getById(id: any) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1))
  }
  create(curso: Curso) {
    return this.http.post<Curso[]>(this.API, curso).pipe(take(1))
  }
  update(curso: Curso) {
    return this.http.put<Curso[]>(`${this.API}/${curso.id}`, curso).pipe(take(1))

  }
  save(curso: Curso) {
    if (curso.id) {
      return this.update(curso)
    }
    return this.create(curso)
  }
  delete(id: any) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1))
  }
}
