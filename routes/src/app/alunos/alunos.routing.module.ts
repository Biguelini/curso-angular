import { NgModule } from "@angular/core";
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlunosComponent } from "./alunos.component";
import { AlunoDetalheComponent } from "./aluno-detalhe/aluno-detalhe.component";
import { AlunoFormularioComponent } from "./aluno-formulario/aluno-formulario.component";
import { AlunosDeactivateGuard } from "../guards/alunso-deactivate.guard";
import { AlunoDetalheResolver } from "./guards/aluno-detalhe.resolver";



const alunosRoutes: Routes = [
  {
    path: '', component: AlunosComponent,
    children: [
      { path: 'novo', component: AlunoFormularioComponent, canDeactivate: [AlunosDeactivateGuard] },
      {
        path: ':id', component: AlunoDetalheComponent,
        resolve: { aluno: AlunoDetalheResolver }
      },
      {
        path: ':id/editar', component: AlunoFormularioComponent, canDeactivate: [AlunosDeactivateGuard]
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
