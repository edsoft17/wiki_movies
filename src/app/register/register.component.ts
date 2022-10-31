import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterValidationsMessages } from '../core/helpers/messages/validations/register.validations.messages';
import { UserModel } from '../core/models/user.model';
import { AuthService } from '../core/services/auth.service';

interface ErrorValid{
  type: string;
  message: string;
}
interface MessageErrorForm {
  firstName:  ErrorValid[];
  lastName:   ErrorValid[];
  email:   ErrorValid[];
  password:   ErrorValid[];
}

export interface Temperatures {
  firstName: Email[];
  lastName:  Email[];
  email:     Email[];
  password:  Email[];
}

export interface Email {
  type:    string;
  message: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('templateModal')
  templateRefModal!: TemplateRef<any>;

  message = '';
  messageError!: Temperatures;
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.messageError = RegisterValidationsMessages;
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }


  handleSignUp(userToRegister: UserModel) {
    if(this.registerForm.invalid){
      this.snackBar.open("Debe llenar el formulario correctamente","OK",{
        duration: 2000
      });
      return;
    }
    
    this.authService.signUp(userToRegister).subscribe({
      next: (response) => {
        this.openModal('El usuario se registró correctamente.');
      },
      error: (error) => {
        if (error.status === 400)
          this.snackBar.open('El usuario ya existe.', 'OK');
      },
    });
  }
  openModal(message: string) {
    this.message = message;
    const openDialog = this.dialog.open(this.templateRefModal);
    openDialog.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
  ngOnInit(): void {}
}
