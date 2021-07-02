import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any;
  public usuario: Usuario;

//   public imgUrl = '';
//   public nombre = '';

  constructor(private sidebarService: SidebarService,
              private usuarioService: UsuarioService) {
    this.menuItems = sidebarService.menu;
    this.usuario = usuarioService.usuario;

    // this.imgUrl = usuarioService.usuario.imagenUrl;
    // this.nombre = usuarioService.usuario.nombre;

  }

  ngOnInit(): void {
  }

}
