import { Injectable } from '@angular/core';
import { UserLdap } from '../model/user-ldap';
import { LDAP_USERS } from '../model/ldap-mock-data';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment.development';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: UserLdap[] = LDAP_USERS;
  private httpOptions = new HttpHeaders({'Content-Type': 'application/json'})


  addUser(user: UserLdap): Observable<UserLdap> {
    //Ajout dans la liste
    return this.http.post<UserLdap>(this.usersUrl, user, {
      headers: this.httpOptions
    })
  }


  // updateUser(userToUpdate: UserLdap): Observable<UserLdap> {
  //   //Modificatio nde l'utilsiateur
  //   const user = this.users.find(u => u.login === userToUpdate.login);
  //   if (user) {
  //     //Modif
  //     user.nom = userToUpdate.nom;
  //     user.prenom = userToUpdate.prenom;
  //     user.nomComplet = user.nom + ' ' + user.prenom;
  //     user.motDePasse = userToUpdate.motDePasse;

  //     return of(userToUpdate);
  //   }

  //   throw new Error('Utilisateur non trouvé');
  // }

  updateUser(user: UserLdap): Observable<UserLdap> {
    //Modificatio nde l'utilsiateur
    return this.http.put<UserLdap>(this.usersUrl + '/' + user.id, user, {headers: this.httpOptions})
  }

  deleteUser(id: number): Observable<UserLdap> {
    return this.http.delete<UserLdap>(this.usersUrl + '/' + id, {headers: this.httpOptions})
  }


  private usersUrl = '';
  constructor(private http: HttpClient) { 
    this.usersUrl = environment.usersApiUrl;
  }



  getUsers(): Observable<UserLdap[]> {
    return this.http.get<UserLdap[]>(this.usersUrl);
  }

  getUser(id: number): Observable<UserLdap> {
    return this.http.get<UserLdap>(this.usersUrl + '/' + id);
  }
}
