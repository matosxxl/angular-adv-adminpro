import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

   public imagenSubir: File;
   public imgTemp: any = null;

  constructor( public modalImagenService: ModalImagenService,
               private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
      this.imgTemp = null;
      this.modalImagenService.cerrarModal();
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
      
    this.fileUploadService
        .actualizarFoto( this.imagenSubir, tipo , id )
        .then( img => {
            Swal.fire('Cambios realizados', 'La imagen se ha actualizado', 'success');

            this.modalImagenService.imagenCambio.emit(img);

            this.cerrarModal();
        }).catch( err => {
            console.log(err);
            Swal.fire('Error', 'No se pudo actualizar', 'error')
        })

  }

}
