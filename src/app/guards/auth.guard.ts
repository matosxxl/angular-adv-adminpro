import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor( private usuarioService: UsuarioService,
                 private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    
    return this.usuarioService.verificarToken()
    .pipe(
      tap( autenticado => {
        if( !autenticado ){
            this.router.navigateByUrl('/login')
        }
      })
    );
  }
  
}
