import { NgModule } from "@angular/core";
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./guards/auth.guard";
import { CursoGuard } from "./guards/cursos.guard";
import { AlunosGuard } from "./guards/alunos.guard";
import { PaginaNaoEncontradaComponent } from "./pagina-nao-encontrada/pagina-nao-encontrada.component";

const appRoutes: Routes = [
  { path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then(x => x.CursosModule), canActivate: [AuthGuard], canActivateChild: [CursoGuard], canLoad: [AuthGuard] },
  {
    path: 'alunos',
    loadChildren: () => import('./alunos/alunos.module').then(x => x.AlunosModule), canActivate: [AuthGuard], canActivateChild: [AlunosGuard], canLoad: [AuthGuard]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PaginaNaoEncontradaComponent }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
