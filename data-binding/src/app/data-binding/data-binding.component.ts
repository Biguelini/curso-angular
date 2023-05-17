import { Component } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent {
  url: string = 'http://joao.com.br'
  cursoAngular: boolean = true
  urlImagem = 'http://lorempixel.com.br/500/400/?1'
  valorAtual: string = ''
  valorSalvo: string = ''
  isMouseOver: boolean = false
  nomeDoCurso: string = 'Angular'
  valorInicial: number = 15
  getValor() {
    return 1
  }
  getCurtirCurso() {
    return true
  }
  botaoClicado() {
    alert('Botão clicado')
  }
  onKeyUp(evento: KeyboardEvent) {
    this.valorAtual = (<HTMLInputElement>evento.target).value
  }
  salvarValor(valor: string) {
    this.valorSalvo = valor
  }
  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver
  }

  onMudouValor(evento: any) {
    console.log(evento)
  }
}
