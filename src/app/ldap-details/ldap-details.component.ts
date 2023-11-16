import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { UsersService } from '../service/users.service';
import { UserLdap } from '../model/user-ldap'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmValidParentMatcher, passwordMatchingValidator } from './passwords-validator.directive';

// @Component({
//   selector: 'app-ldap-details',
//   templateUrl: './ldap-details.component.html',
//   styleUrls: ['./ldap-details.component.css']
// })

export abstract class LdapDetailsComponent {
  user: UserLdap | undefined;
  processLoadRunning = false;
  processValidateRunning = false;
  passwordPlaceHolder: string;
  errorMessage = '';
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  passwordForm: FormGroup;

  protected constructor(
    public addForm: boolean,
    private fb: FormBuilder,
    private router: Router,
    // protected route:ActivatedRoute
    ) {
      this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : ' (laisser vide pour ne pas le modifier)');
      this.passwordForm = this.fb.group({ // Initialisez la propriété passwordForm
        password: [''],
        confirmPassword: ['']
      });
      if (this.addForm) {
        this.passwordForm?.get('password')?.addValidators(Validators.required);
        this.passwordForm?.get('confirmPassword')?.addValidators(Validators.required);
      }
     }

  protected onInit(): void {
    //this.getUser();
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
    this.validateForm();
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

  isFormValid(): boolean { 
    return this.userForm.valid
    //Exemple de validation d'un champ : 
    && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  abstract validateForm(): void;

  private formGetValue(name: string): string {
    const control = this.userForm.get(name);
    if(control === null) {
      console.error("L'objet '" + name + "' du formulaire n'existe pas");
      return '';
    }
    return control.value;
  }

  private formSetValue(name: string, value: string | number): void {
    const control = this.userForm.get(name);
    if (control == null) {
      console.error("L'objet '" + name + "' du formulaire n'existe pas");
      return ;
    }
    control.setValue(value);
  }

  protected copyUserToFormControl(): void {
    if (this.user === undefined) {
      return;
    }
    
    this.formSetValue('login', this.user.login);
    this.formSetValue('nom', this.user.nom);
    this.formSetValue('prenom', this.user.prenom);
    this.formSetValue('mail', this.user.mail);
    
  }
  // this.formSetValue('employeNumero', this.user.employeNumero);
  // this.formSetValue('employeNiveau', this.user.employeNiveau);
  // this.formSetValue('dateEmbauche', this.user.dateEmbauche);
  // this.formSetValue('publisherId', this.user.publisherId);
  // this.formSetValue('active', this.user.active);

  protected getUserFormControl(): UserLdap {
    return {
      login: this.formGetValue('login'),
      nom: this.formGetValue('nom'),
      prenom: this.formGetValue('prenom'),
      nomComplet: this.formGetValue('prenom') + ' ' + this.formGetValue('nom'),
      mail: this.formGetValue('mail'),
      // les valeurs suivantes devraient être reprise du formulaire
      employeNumero: 1,
      employeNiveau: 1,
      dateEmbauche: '2020-04-24',
      publisherId: 1,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER'
    };
  }

  getErrorMessage(): string {
    if (this.passwordForm?.errors) {
      return 'Les mots de passe ne correspondent pas';
    }
    return 'Entrez un mot de passe';
  }



  userForm: FormGroup = this.fb.group({
    login: [''],
    nom: [''],
    prenom: [''],
    //Groupe de données imbriqué
    passwordGroup: this.fb.group({
      password: [''],
      confirmPassword: [''],
    }, {validators: passwordMatchingValidator}),
    mail: {value: '', disabled: true},
  });
}
