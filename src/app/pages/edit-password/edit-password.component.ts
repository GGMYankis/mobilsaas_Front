import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material/material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../Services/usuario.service';
import { ResetPasswordService } from '../../Services/reset-password.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-password',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css',
})
export class EditPasswordComponent implements OnInit {

  formularioActualizar: FormGroup;
  passWordSave:boolean = false;
  token:string = '';

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
     private _resetPasswordService:ResetPasswordService
    ) {
    this.formularioActualizar = this.fb.group({
         newPassword:["" , Validators.required],
         confirmPassword:["" , Validators.required],
    });
  }

   ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  actualizarPassword() {
    if(this.formularioActualizar.value.newPassword == this.formularioActualizar.value.confirmPassword){
      const request  = {
        "token":this.token.substring(6),
        "NuevaClave":this.formularioActualizar.value.newPassword,
      }
     

      this._resetPasswordService.UpdatePassword(request).subscribe({
        next:(data) => {
          if(data.status){
            this.passWordSave = true;
            this.router.navigate(['login'])

          }else{
            this._snackBar.open('Token invalido', 'Oops', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 3000,
            });
          }
        }
      })


    }

  }

}
