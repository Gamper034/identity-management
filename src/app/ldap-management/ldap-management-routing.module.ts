import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LdapListComponent } from './ldap-list/ldap-list.component';
import { LdapAddComponent } from './ldap-add/ldap-add.component';
import { LdapEditComponent } from './ldap-edit/ldap-edit.component';
import { AuthGuard } from '../security/auth.guard';

// const routes: Routes = [
//   {path: 'users/list', component: LdapListComponent},
//   {path: 'user/add', component: LdapAddComponent},
//   {path: 'user/:id', component: LdapEditComponent},
//   {path: '', redirectTo: 'users/list', pathMatch: 'full' }
// ];

const adminRoutes: Routes = [
  {
    path: 'users',
    canActivate: [AuthGuard],
    children: [
      {path: 'list', component: LdapListComponent},
      {path: 'add', component: LdapAddComponent},
      {path: ':id', component: LdapEditComponent},
      {path: '', redirectTo: '/users/list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class LdapManagementRoutingModule { }
