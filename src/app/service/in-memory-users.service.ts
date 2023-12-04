import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UserLdap } from '../model/user-ldap';
import { LDAP_USERS } from '../model/ldap-mock-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InMemoryUsersService implements InMemoryDbService {

  private usersUrl = 'api/users';
  createDb() {
    console.log('InMemoryUsersService.createDb');
    const users: UserLdap[] = LDAP_USERS;
    return {users};
  }

  genId(users: UserLdap[]): number {
    console.log('InMemoryUsersService.genId');
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 4;
  
  }
  // constructor(private http: HttpClient) { }
}
