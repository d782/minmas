import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { StoreComponent } from './components/store/store.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { CustomersComponent } from './components/customers/customers.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"sign-up",component:SignUpComponent},
    {path:"home",component:HomeComponent,canActivate:[authGuardGuard]},
    {path:"profile",component:ProfileComponent,canActivate:[authGuardGuard]},
    {path:"users",component:UsersComponent,canActivate:[authGuardGuard]},
    {path:"store",component:StoreComponent,canActivate:[authGuardGuard]},
    {path:"customers",component:CustomersComponent,canActivate:[authGuardGuard]},
    {path:"invoices",component:InvoicesComponent,canActivate:[authGuardGuard]},
    {path:"**",component:PageNotFoundComponent},
];
