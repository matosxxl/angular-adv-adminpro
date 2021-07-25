import { Component, OnInit, OnDestroy } from '@angular/core';

import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';

import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public loading: boolean = true;
  public desde: number = 0;
  private imgSubs: Subscription;

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService ) { }

    ngOnDestroy(): void {
        this.imgSubs.unsubscribe();
    }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.imagenCambio
    .pipe(delay(100))
    .subscribe( img => this.cargarHospitales() );
  }

  cargarHospitales(){
    this.loading = true;

    this.hospitalService.obtenerHospitales( this.desde )
        .subscribe( hospitales => {
            this.hospitales = hospitales;
            this.loading = false;
        });
  }

//   cambiarPagina( valor:number ){
//      this.desde += valor;
//       if( this.desde < 0 ){
//           this.desde = 0;
//       } else if( this.desde >= this. ){
//           this.desde -= valor
//       }
//       this.cargarHospitales();
//   }

    guardarCambios( hospital:Hospital ){
        
        this.hospitalService.actualizarHospital( hospital._id, hospital.nombre )
                .subscribe( resp => {
                    Swal.fire('Cambios guardados', hospital.nombre , 'success');
                })

    }

    borrarHospital( hospital:Hospital ){

        Swal.fire({
            title: 'Desea borrar este hospital?',
            text: `Esta a punto de borrar al ${ hospital.nombre }!`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, deseo borrarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
            
            this.hospitalService.borrarHospital( hospital._id)
                .subscribe( resp => {
                    Swal.fire('Hospital eliminado', hospital.nombre , 'success');
                    this.cargarHospitales();
                });
            }
        })

    }

    async abrirSweetAlert(){
        const {value} = await Swal.fire<string>({
          title: 'Crear Hospital',
          input: 'text',
          inputLabel: 'Ingrese el nombre del hospital a crear',
          inputPlaceholder: 'Nombre del hospital',
          showCancelButton: true
        })

        if( value ){
            if( value.trim().length > 0 ){
                this.hospitalService.crearHospital( value )
                        .subscribe( resp => {
                            Swal.fire('Hospital Creado', `Se creo ${value}`, 'success');
                            this.cargarHospitales();
                        })
            } else {
                return Swal.fire('Error', 'No se proporciono ningun nombre para el hospital', 'error');
            }
        } else {
            return;
        }
        
    }

    cambiarImagen( hospital: Hospital ){

        this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);

    }

    buscarHospital( termino: string ){
        if( termino.length === 0 ){
            return this.cargarHospitales();
        }

        this.loading = true;
        
        this.busquedasService.buscar('hospitales', termino)
                .subscribe( (resultados:Hospital[]) => {
                    this.hospitales = resultados;
                    this.loading = false;
                })

    }

}
