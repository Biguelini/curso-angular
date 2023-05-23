import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from '../alunos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent {
  aluno!: any;
  inscricao!: Subscription;
  constructor(private route: ActivatedRoute, private alunosService: AlunosService, private router: Router,) { }

  ngOnInit() {
    this.inscricao = this.route.data.subscribe((data) => { this.aluno = data['aluno'] })
  }
  editarContato() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
