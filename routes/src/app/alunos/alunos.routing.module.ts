import { NgModule } from "@angular/core";
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from "./alunos.component";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunoFormularioComponent } from "./aluno-formulario/aluno-formulario.component";



const alunosRoutes: Routes = [
  {
    path: 'alunos', component: AlunosComponent,
    children: [
      { path: 'novo', component: AlunoFormularioComponent },
      {
        path: ':id', component: AlunoDetalheComponent,

      },
      {
        path: ':id/editar', component: AlunoFormularioComponent,
      }
    ]
  }

];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(alunosRoutes);

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
