import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';
import { StoreComponent } from './components/store/store.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"sign-up",component:SignUpComponent},
    {path:"home",component:HomeComponent},
    {path:"profile",component:ProfileComponent},
    {path:"users",component:UsersComponent},
    {path:"store",component:StoreComponent},
    {path:"**",component:PageNotFoundComponent},
];
