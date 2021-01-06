import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`
  }

  @Input('valor') progreso: number = 20;
  @Input() btnClass: string = "btn-primary";
  // @Input() progreso: number = 20;

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  //Logica para incrementar y disminuir la longitud de la barra

  cambiarValor(valor: number) {

    if( this.progreso >= 100 && valor > 0 ){
      this.valorSalida.emit(100)
      return this.progreso = 100
    }

    if( this.progreso <= 0 && valor < 0 ){
      this.valorSalida.emit(0)
      return this.progreso = 0
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso)
  }

  //Fin

  onChange( nuevoValor: number ){

    if ( nuevoValor >= 100 ){
      this.progreso = 100
    }
    else if ( nuevoValor <= 0 ){
      this.progreso = 0
    }
    else {
      this.progreso = nuevoValor;
    }

    this.valorSalida.emit(this.progreso);
  }

}
