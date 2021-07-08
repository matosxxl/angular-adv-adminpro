import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

    menu: any[] = [
        {
            titulo: "Dashboard",
            icono: "mdi mdi-gauge",
            submenu: [
                {titulo: "Main", url: '/'},
                {titulo: "Grafica", url: 'grafica1'},
                {titulo: "ProgressBar", url: 'progress'},
                {titulo: "Promesas", url: 'promesas'},
                {titulo: "Rxjs", url: 'rxjs'},

            ]
        },

        {
            titulo: "Mantenimientos",
            icono: "mdi mdi-folder-lock-open",
            submenu: [
                {titulo: "Usuarios", url: 'usuarios'},
                {titulo: "Medicos", url: 'medicos'},
                {titulo: "Hospitales", url: 'hospitales'}

            ]
        }
    ];

  constructor() { }
}
