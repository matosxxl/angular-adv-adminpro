import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private fileUploadService: FileUploadService ) {

    this.usuario = usuarioService.usuario;

}

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
        nombre: [this.usuario.nombre, Validators.required],
        email: [this.usuario.email, [Validators.required, Validators.email]]
    })

  }

//   actualizarPerfil() {
//     this.usuarioService.actualizarPerfil( this.perfilForm.value )
//         .subscribe( (resp:any) => {

//             if( resp.ok === true ){

//               const { nombre, email } = this.perfilForm.value;
//               this.usuario.nombre = nombre;
//               this.usuario.email = email;

//               Swal.fire('Usuario Actualizado', '', 'success')

//             } else {
//                 return Swal.fire( 'Error', resp.msg, 'warning' );
//             }
//         });
//   }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
        .subscribe( () => {
              const { nombre, email } = this.perfilForm.value;
              this.usuario.nombre = nombre;
              this.usuario.email = email;
              Swal.fire('Usuario Actualizado', '', 'success')
        }, (err) => {
            return Swal.fire( 'Error', err.error.msg, 'error' );
        });
}

  cambiarFoto( file: File ){
      this.imagenSubir = file;

      if( !file ){ 
        return this.imgTemp = null;
      }

      const reader = new FileReader();
      reader.readAsDataURL( file );

      reader.onloadend = () => {
          this.imgTemp = reader.result;
          console.log(reader.result);
      }
  }

  subirImagen(){
      
    this.fileUploadService
        .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
        .then( img => {
            this.usuario.img = img;
            Swal.fire('Cambios realizados', 'La imagen se ha actualizado', 'success');
        }).catch( err => {
            console.log(err);
            Swal.fire('Error', 'No se pudo actualizar', 'error')
        })

  }

}
