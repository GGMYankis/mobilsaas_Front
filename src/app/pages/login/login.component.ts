import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../Services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { UtilService } from '../../Services/util.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formularrioLogin: FormGroup;
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private _usuarioService: UsuarioService,
    private _utilService: UtilService,
    private fb: FormBuilder
  ) {
    this.formularrioLogin = this.fb.group({
      correo: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  login() {
    const user = {
      correo: this.formularrioLogin.value.correo,
      clave: this.formularrioLogin.value.clave,
    };

    this._usuarioService.Login(user.correo, user.clave).subscribe({
      next: (data) => {
        if (data.status) {
         this._utilService.guardarSesionUsuario(data.value); 
          this.router.navigate(['pages']);
        } else {
          this._snackBar.open(data.msg, 'Oops', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000,
          });
        }
      },
    });
  }
}
