import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {UserLdap} from "../../model/user-ldap";
// import {LDAP_USERS} from "../model/ldap-mock-data";
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css']
})
export class LdapListComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);

  //Permet d'injecter 'mat-paginator' dans l'attribut paginator. L'attribut paginator de la classe LdapListComponent est lié à la balise HTML mat-paginator dans la vue
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;

  constructor(private usersService: UsersService, private router: Router) {
    this.paginator = null;
  }

  addUser() {
    this.router.navigate(['user/add']).then((e) => {
      if (!e) {
        console.error('Navigation has failed');
      }
    });
  }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter: string) => this.filterPredicate(data, filter);
    this.getUsers();
  }
  unactiveSelected = false;
  

  // ngOnInit(): void {
  //   console.log('ngOnInit:');
  //   this.dataSource.paginator = this.paginator;
  //   console.log('Mat Paginator:', this.paginator);
  // }

  // ngAfterViewInit(): void {
  //   console.log('ngAfterViewInit:');
  //   console.log('Mat Paginator:', this.paginator);
  // }

  filterPredicate(data: UserLdap, filter: string): boolean {
    const filterValue = filter.trim().toLowerCase();
    const nomComplet = data.nomComplet.toLowerCase();
    const employeNumero = data.employeNumero.toString().toLowerCase();
    return !filterValue || nomComplet.toLowerCase().startsWith(filter) || employeNumero.startsWith(filter);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  private getUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      if (this.unactiveSelected) {
        this.dataSource.data = users.filter(user => !user.active);
      } else {
        this.dataSource.data = users;
      }
    });
  }

  unactiveChanged($event: MatSlideToggleChange): void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  edit(login: string): void {
    this.router.navigate(['user/', login]).then((e) => {
      if (!e) {
        console.error('Navigation has failed');
      }
    });
  }






}
