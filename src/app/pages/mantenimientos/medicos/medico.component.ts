import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { delay } from 'rxjs/operators';

import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';

import { MedicoService } from '../../../services/medico.service';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoActivo: Medico;
  public hospitalActivo: Hospital;

  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({id}) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
        hospital: ['', Validators.required],
        nombre:   ['', Validators.required]
    })

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
        .subscribe( hospitalId => {
        
            this.hospitalActivo = this.hospitales.find( h => h._id === hospitalId );

        })

  }

  cargarMedico( id: string ){

      if(id === 'nuevo'){
          return
      }

      this.medicoService.obtenerMedicoPorId( id )
          .pipe(
              delay(150)
          )
          .subscribe( medico => {

              if(!medico){
                  return this.router.navigateByUrl('/dashboard/medicos');
              }

              const { nombre, hospital:{ _id } } = medico;
              this.medicoActivo = medico;
              this.medicoForm.setValue({ nombre, hospital: _id });
          })
  }

  cargarHospitales(){

      this.hospitalService.obtenerHospitales()
          .subscribe( (hospitales: Hospital[]) => {
              this.hospitales = hospitales;
          })
  }

  guardarMedico(){

      const { nombre } = this.medicoForm.value;
      
      if( this.medicoActivo ){
          //actualizar
          this.medicoService.actualizarMedico( this.medicoActivo._id, this.medicoForm.value )
                .subscribe( resp => {
                    Swal.fire('El medico ha sido actualizado', 'Se han realizado los cambios con exito', 'success');
                })

      } else {
          this.medicoService.crearMedico( this.medicoForm.value )
              .subscribe( (resp: any) => {
                  Swal.fire('El medico ha sido creado', this.medicoForm.value.nombre, 'success');
                  this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`);
              })
      }

  }

}
