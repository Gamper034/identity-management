import { Injectable } from '@angular/core';
import { UserLdap } from '../model/user-ldap';
import { LDAP_USERS } from '../model/ldap-mock-data';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: UserLdap[] = LDAP_USERS;

  addUser(user: UserLdap): Observable<UserLdap> {
    //Ajout dans la liste
    this.users.push(user);
    return of(user);
  }


  updateUser(userToUpdate: UserLdap): Observable<UserLdap> {
    //Modificatio nde l'utilsiateur
    const user = this.users.find(u => u.login === userToUpdate.login);
    if (user) {
      //Modif
      user.nom = userToUpdate.nom;
      user.prenom = userToUpdate.prenom;
      user.nomComplet = user.nom + ' ' + user.prenom;
      user.motDePasse = userToUpdate.motDePasse;

      return of(userToUpdate);
    }

    throw new Error('Utilisateur non trouvé');
  }
  
  // constructor() { }


  getUsers(): Observable<UserLdap[]> {
    return of(this.users)
  }

  getUser(login: string): Observable<UserLdap | undefined> {
    return of(this.users.find(user => user.login === login));
  }
}
