import { Injectable } from '@angular/core'
import { CrudService } from '../shared/crud-service'
import { HttpClient } from '@angular/common/http'
import { Curso } from './cursos'
import { environment } from 'src/environments/environments'

@Injectable({
  providedIn: 'root'
})
export class Cursos2Service extends CrudService<Curso> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}cursos`)
  }

}
