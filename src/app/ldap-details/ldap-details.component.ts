import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { UsersService } from '../service/users.service';
import { UserLdap } from '../model/user-ldap'; 
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ldap-details',
  templateUrl: './ldap-details.component.html',
  styleUrls: ['./ldap-details.component.css']
})
export class LdapDetailsComponent {
  user: UserLdap | undefined;
  processLoadRunning = false;
  processValidateRunning = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService, 
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    const login = this.route.snapshot.paramMap.get('id');

    if (login == null) {
      console.error("Can't retreive user id from URL");
      return;
    }

    this.usersService.getUser(login).subscribe(
      user => {
        this.user = user;
        console.log('LdapDetails getUser =' + user);
      }
    );
  }

  goToLdap(): void {
    this.router.navigate(['/users/list']).then((e): void => {
      if (!e) {
        console.error('Navigation has failed!')
      }
    })
  }

  onSubmitForm(): void {
    //Validation des données (à voir plus tard)
  }

  updateLogin(): void {
    const control = this.userForm.get('login');
    if (control === null) {
      console.error("L'objet 'login' du formulaire n'existe pas");
      return ;
    }
    control.setValue((this.formGetValue('prenom') + '.' + this.formGetValue('nom')).toLowerCase());
    this.updateMail();
  }

  updateMail(): void {
    const control = this.userForm.get('mail');
    if (control === null) {
      console.error("L'objet 'mail' du formulaire n'existe pas");
      return ;
    }
    control.setValue(this.formGetValue('login') + '@epsi.fr');
  }

  isFormValid(): boolean { return false;}

  private formGetValue(name: string): any {
    const control = this.userForm.get(name);
    if(control === null) {
      console.error("L'objet '" + name + "' du formulaire n'existe pas");
      return '';
    }
    return control.value;
  }

  userForm: FormGroup = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],
    //Groupe de données imbriqué
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: [''],
    }),
    mail: {value: '', disabled: true},
  });
}
