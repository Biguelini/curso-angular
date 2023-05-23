import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  mostrarMenuEmitter = new EventEmitter<boolean>()
  constructor(private router: Router) { }
  private usuarioAutenticado: boolean = false
  fazerLogin(usuario: Usuario) {
    if (usuario.nome === 'joao@teste.com' && usuario.senha === 'joao') {
      this.usuarioAutenticado = true
      this.mostrarMenuEmitter.emit(true)
      this.router.navigate(['/'])
    } else {
      this.usuarioAutenticado = false
    }
  }
  usuarioEstaAutenticado() {
    return this.usuarioAutenticado
  }
}
