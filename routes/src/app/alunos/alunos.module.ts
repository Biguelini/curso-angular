import { NgModule } from '@angular/core';

import { AlunosComponent } from './alunos.component';
import { CommonModule } from '@angular/common';
import { AlunoFormularioComponent } from './aluno-formulario/aluno-formulario.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunosRoutingModule } from './alunos.routing.module';
import { AlunosService } from './alunos.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AlunosRoutingModule,
    FormsModule
  ],
  exports: [],
  declarations: [AlunosComponent, AlunoFormularioComponent, AlunoDetalheComponent],
  providers: [AlunosService],
})
export class AlunosModule { }
