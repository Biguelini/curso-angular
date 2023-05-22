import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  private alunos: any[] = [{
    "id": 1,
    "nome": "joao",
    "email": "joao@teste.com"
  },
  {
    "id": 2,
    "nome": "maria",
    "email": "maria@teste.com"
  },
  {
    "id": 3,
    "nome": "pedro",
    "email": "pedro@teste.com"
  },
  {
    "id": 4,
    "nome": "ana",
    "email": "ana@teste.com"
  },
  {
    "id": 5,
    "nome": "carlos",
    "email": "carlos@teste.com"
  },
  {
    "id": 6,
    "nome": "laura",
    "email": "laura@teste.com"
  },
  {
    "id": 7,
    "nome": "felipe",
    "email": "felipe@teste.com"
  },
  {
    "id": 8,
    "nome": "bruna",
    "email": "bruna@teste.com"
  },
  {
    "id": 9,
    "nome": "gustavo",
    "email": "gustavo@teste.com"
  },
  {
    "id": 10,
    "nome": "sara",
    "email": "sara@teste.com"
  },
  {
    "id": 11,
    "nome": "rodrigo",
    "email": "rodrigo@teste.com"
  },
  {
    "id": 12,
    "nome": "camila",
    "email": "camila@teste.com"
  },
  {
    "id": 13,
    "nome": "eduardo",
    "email": "eduardo@teste.com"
  },
  {
    "id": 14,
    "nome": "lucas",
    "email": "lucas@teste.com"
  },
  {
    "id": 15,
    "nome": "julia",
    "email": "julia@teste.com"
  },
  {
    "id": 16,
    "nome": "fernando",
    "email": "fernando@teste.com"
  },
  {
    "id": 17,
    "nome": "amanda",
    "email": "amanda@teste.com"
  },
  {
    "id": 18,
    "nome": "rafael",
    "email": "rafael@teste.com"
  },
  {
    "id": 19,
    "nome": "patricia",
    "email": "patricia@teste.com"
  },
  {
    "id": 20,
    "nome": "henrique",
    "email": "henrique@teste.com"
  },]

  getAlunos() {
    return this.alunos
  }
  getAluno(id: number) {
    for (let i = 0; i < this.alunos.length; i++) {
      let aluno = this.alunos[i];
      if (aluno.id == id) {
        return aluno;
      }
    }
    return null;
  }
  constructor() { }
}
