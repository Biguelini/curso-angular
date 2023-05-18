import { Component } from '@angular/core';

@Component({
  selector: 'app-elvis',
  templateUrl: './elvis.component.html',
  styleUrls: ['./elvis.component.css']
})
export class ElvisComponent {
  tarefa:any={
    desc: 'Descrição',
    responsavel: null
  }
}
