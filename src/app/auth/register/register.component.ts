import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public formSubmitted = false;

  public registerForm = this.fb.group({
    // nombre: ['', [ Validators.required, Validators.minLength(3) ]],
    nombre: ['Jose', Validators.required],
    email: ['testy@gmail.com', [Validators.required, Validators.email]],
    password:  ['12345', Validators.required],
    password2: ['12345', Validators.required],
    terminos: [false, Validators.required]
  }, {
    validators: [
        this.passwordsIguales('password', 'password2'),
        this.terminosAceptados('terminos')
    ]
  });

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router ) { }

  crearUsuario() {
      this.formSubmitted = true;
      console.log(this.registerForm.value);

      if( this.registerForm.invalid ){
          return;
      }

      //Posteo del formulario

      this.usuarioService.crearUsuario( this.registerForm.value )
              .subscribe( resp => {
                  console.log('Usuario creado');
                  //para el Dashboard mi hijo
                  this.router.navigateByUrl('/');
              }, (err) => {
                  //Si sucede algun error
                  Swal.fire('Error', err.error.msg, 'error');
              });
  }

  campoNoValido( campo:string ):boolean {
      
      if( this.registerForm.get(campo).invalid && this.formSubmitted ){
          return true
      } else {
          return false
      }

  }

  contrasenasNoValidas(){

        const pass1 = this.registerForm.get('password').value;
        const pass2 = this.registerForm.get('password2').value;
      
        if(  (pass1 !== pass2) && this.formSubmitted){
            return true
        } else {
            return false
        }

  }

  aceptaTerminos() {
      return !this.registerForm.get('terminos').value && this.formSubmitted
  }

  passwordsIguales( pass1name: string, pass2name: string ) {
      
    return ( formGroup: FormGroup ) => {
    
        const pass1Control = formGroup.get(pass1name);
        const pass2Control = formGroup.get(pass2name);

        if( pass1Control.value === pass2Control.value ){
            pass2Control.setErrors(null)
        } else {
            pass2Control.setErrors({ noEsIgual: true })
        }

    }

  }

  terminosAceptados( terminosName: string ) {
      
    return ( formGroup: FormGroup ) => {
        
        const terminosControl = formGroup.get(terminosName);
    
        if( terminosControl.value === false  ){
            terminosControl.setErrors({ noSeAceptaron: true })
        } else {
            terminosControl.setErrors(null)
        }

    }

  }

}
