import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchProductsComponent } from './pages/search-products/search-products.component';

export const routes: Routes = [
    { 
        path: 'search', 
        component: SearchProductsComponent
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
