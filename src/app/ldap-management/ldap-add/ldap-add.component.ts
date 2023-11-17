import { Component, OnInit } from '@angular/core';
import { LdapDetailsComponent } from '../ldap-details/ldap-details.component';
import { UsersService } from '../../service/users.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-details/ldap-details.component.html',
  styleUrls: ['../ldap-details/ldap-details.component.css']
})


export class LdapAddComponent extends LdapDetailsComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    fb: FormBuilder,
    router: Router,
    private snackBar: MatSnackBar
    ) {
    super(true, fb, router);
  }

  ngOnInit(): void {
      super.onInit();
  }

  validateForm(): void {
    console.log('LdapAddCoponent - validateForm');

    this.processValidateRunning = true;
    this.usersService.addUser(this.getUserFormControl()).subscribe({
      next: () => {
        this.processValidateRunning = false;
        this.errorMessage = '';
        this.snackBar.open('Utilisateur ajouté', 'X');
      },
      error: (err) => {
        this.processValidateRunning = false;
        console.error('Ajout utilisateur', err);
        this.errorMessage = 'Une erreur est survenue dans l\'ajout !';
        this.snackBar.open('Erreur lors de l\'ajout de l\'utilisateur', 'X');
      }
    })
  }

}
