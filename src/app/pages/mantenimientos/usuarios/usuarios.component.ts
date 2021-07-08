import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
    
    // public uid = this.usuarioService.usuario.uid;
    public totalUsuarios: number = 0;
    public usuarios: Usuario[] = [];
    public usuariosTemp: Usuario[] = [];

    public imgSubs: Subscription;
    public desde: number = 0;
    public loading: boolean = true;

  constructor( private usuarioService: UsuarioService,
               private busquedasService: BusquedasService,
               private modalImagenService: ModalImagenService ) { }

  ngOnDestroy(): void {
      this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerUsuarios();

    this.imgSubs = this.modalImagenService.imagenCambio
    .pipe(delay(100))
    .subscribe( img => this.obtenerUsuarios() );
  }

  obtenerUsuarios(){
    this.loading = true;
    this.usuarioService.obtenerUsuarios( this.desde )
    .subscribe( ({ total, usuarios }) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.loading = false;
    })
  }

  cambiarPagina( valor: number ){
      this.desde += valor;

      if( this.desde < 0 ){
          this.desde = 0;
      } else if( this.desde >= this.totalUsuarios ){
          this.desde -= valor
      }

      this.obtenerUsuarios();
  }

  buscarUsuarios( termino: string ) {

      if( termino.length === 0 ){
        //   Swal.fire('Oh-oh', 'No hay nada escrito', 'info');
          return this.usuarios = this.usuariosTemp;
      }

      this.loading = true;

      return this.busquedasService.buscar('usuarios', termino)
              .subscribe( resultados => {

                    this.usuarios = resultados;
                    this.loading = false;
              })
  }

  eliminarUsuario( usuario: Usuario ){

      if( usuario.uid === this.usuarioService.uid ){
          return Swal.fire('Error', 'No puede eliminar su usuario usted mismo', 'error');
      }

      Swal.fire({
      title: 'Desea borrar este usuario?',
      text: `Esta a punto de borrar a ${ usuario.nombre }!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.usuarioService.eliminarUsuario( usuario )
            .subscribe( resp => {

                this.obtenerUsuarios();
                Swal.fire(
                  'Listo!',
                  `${ usuario.nombre } eliminado con exito!`,
                  'success'
                )
            });

      }
    })
  }

  cambiarRole( usuario: Usuario) {
      this.loading = true;

      return this.usuarioService.guardarUsuario( usuario )
          .subscribe( resp => {
              console.log(resp);
              this.usuarioService.usuario.role = usuario.role;
              this.loading = false;
          })
  }

  cambiarImagen( usuario:Usuario ){
      console.log(usuario);
      this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
