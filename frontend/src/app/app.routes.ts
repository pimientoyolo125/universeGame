import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchProductsComponent } from './pages/search-products/search-products.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/login/signin/signin.component';
import { SignupComponent } from './pages/login/signup/signup.component';

export const routes: Routes = [
    {
        path: 'search',
        component: SearchProductsComponent
    },
    {
        path: 'login',
        component: LoginComponent,
        children: [
          { path: 'signin', component: SigninComponent },
          { path: 'signup', component: SignupComponent },
          { path: '', redirectTo: 'signin', pathMatch: 'full' } // Redirigir al signin por defecto
        ]    
    },
    {
        path: '**',
        component: HomeComponent,
    },
    {
        path: '',
        component: HomeComponent,
    }
];
