import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

    public menu: [];

    getMenu() {
    
        this.menu = JSON.parse(localStorage.getItem('menu')) || [];

        // if( this.menu.length === 0 ){
        //     this.router.navigateByUrl('/login');
        // }
    }

    // menu: any[] = [
    //     {
    //         titulo: "Dashboard",
    //         icono: "mdi mdi-gauge",
    //         submenu: [
    //             {titulo: "Main", url: '/'},
    //             {titulo: "Grafica", url: 'grafica1'},
    //             {titulo: "ProgressBar", url: 'progress'},
    //             {titulo: "Promesas", url: 'promesas'},
    //             {titulo: "Rxjs", url: 'rxjs'},

    //         ]
    //     },

    //     {
    //         titulo: "Mantenimientos",
    //         icono: "mdi mdi-folder-lock-open",
    //         submenu: [
    //             {titulo: "Usuarios", url: 'usuarios'},
    //             {titulo: "Hospitales", url: 'hospitales'},
    //             {titulo: "Medicos", url: 'medicos'},

    //         ]
    //     }
    // ];

}
