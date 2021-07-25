import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { BusquedasService } from '../../../services/busquedas.service';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

import { Medico } from '../../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public loading: boolean = true;
  private imgSubs: Subscription

  constructor( private medicoService: MedicoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

    ngOnDestroy(): void {
        this.imgSubs.unsubscribe();
    }

  ngOnInit(): void {

    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.imagenCambio
    .pipe(delay(100))
    .subscribe( img => this.cargarMedicos() );

  }

  cargarMedicos(){
  
    this.loading = true;
    this.medicoService.obtenerMedicos()
            .subscribe( medicos => {
                this.medicos = medicos;
                this.loading = false;
            })

  }

  crearMedico(){
      console.log('Crear medico');
  }

  actualizarMedico(){
      console.log('Actualizar medico');
  }

  borrarMedico( medico: Medico ){

      Swal.fire({
      title: 'Desea borrar este usuario?',
      text: `Esta a punto de borrar a ${ medico.nombre }!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

          this.medicoService.borrarMedico( medico._id )
              .subscribe( resp => {
                  Swal.fire(`${medico.nombre} ha sido borrado con exito!`, 'Se ha eliminado correctamente', 'success');
                  this.cargarMedicos();
              });

      }
    })
  }

  cambiarImagen( medico: Medico ){
      this.modalImagenService.abrirModal( 'medicos', medico._id, medico.img );
  }

  buscarMedico( termino: string ){

      if( termino.length === 0 ){
            return this.cargarMedicos();
        }
        this.loading = true;
        
        this.busquedasService.buscar('medicos', termino)
                .subscribe( (resultados:Medico[]) => {

                    this.medicos = resultados;
                    if( this.medicos.length === 0 ){
                        Swal.fire('Sin anexos!', 'No se ha encontrado en la BD', 'warning');
                    }
                    this.loading = false;
                })
  }

}
