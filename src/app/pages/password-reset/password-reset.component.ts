import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../Services/usuario.service';
import { ResetPasswordService } from '../../Services/reset-password.service';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css',
})
export class PasswordResetComponent {
  formularioReset: FormGroup;
  emailFound: boolean = false;
  emailNotFound: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _resetPasswordService: ResetPasswordService
  ) {
    this.formularioReset = this.fb.group({
      email: ['', Validators.required],
    });
  }

  resetPassword() {
    const email = {
      para: this.formularioReset.value.email,
      asunto: 'Reset your mobilsoft password',
      contenido: `<h1>Someone (hopefully you) has requested a password reset for your mobilsoft account. Follow the link below to set a new password</h1>
      <p>Si deseas cambiar tu clave, ingresa las nuevas credenciales más este token</p>
      `,
    };

    this._resetPasswordService.resetPassword(email).subscribe({
      next: (data) => {
        if (data.status) {
          this.emailNotFound = false;
          this.emailFound = true;
        } else {
          this.emailFound = false;
          this.emailNotFound = true;
        }
      },
      error: () => {},
    });
  }
}
