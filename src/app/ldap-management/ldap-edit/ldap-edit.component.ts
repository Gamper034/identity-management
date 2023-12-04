import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../service/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LdapDetailsComponent } from '../ldap-details/ldap-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-details/ldap-details.component.html',
  styleUrls: ['../ldap-details/ldap-details.component.css']
})
export class LdapEditComponent extends LdapDetailsComponent implements OnInit {

  constructor(
    private usersService: UsersService,
              private route: ActivatedRoute,
              fb: FormBuilder,
              router: Router,
              private snackBar: MatSnackBar) {
    super(false, fb, router);
  }

  ngOnInit(): void {
      super.onInit();
      this.getUser();
  }

  // private getUser(): void {
  //   const login = this.route.snapshot.paramMap.get('id');

  //   if (login == null) {
  //     console.error("Can't retreive user id from URL");
  //     return;
  //   }

  //   this.usersService.getUser(login).subscribe(
  //     user => {
  //       this.user = user;
  //       console.log('LdapDetails getUser =' + user);
  //     }
  //   );
  // }

  validateForm(): void {
    console.log('LdapEditCoponent - validateForm');
    this.processValidateRunning = true;
    this.usersService.updateUser(this.getUserFormControl()).subscribe({
      next: () => {
        this.processValidateRunning = false;
        this.errorMessage = '';
        this.snackBar.open('Utilisateur modifié', 'X');
      },
      error: (err) => {
        this.processValidateRunning = false;
        this.errorMessage = 'Une erreur est survenue dans la modification !';
        console.error('Modification utilisateur', err);
        this.snackBar.open('Erreur lors de la modification de l\'utilisateur', 'X');
      }
    })
  }

  private getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if(id === null){
      console.error("Can't retreive user id from URL");
      return;
    }

    this.usersService.getUser(id).subscribe({
      next: (user) => {
        this.user = user;
        this.copyUserToFormControl();
        console.log('LdapDetails getUser =', user);
      },
      error: (err) => {
        this.processValidateRunning = false;
        this.errorMessage = "L'utilisateur n'existe pas";
        console.error('Obtention utilisateur', err);
        this.snackBar.open('Utilisateur non trouvé ! ', 'X');
      }
    });
  }

}
