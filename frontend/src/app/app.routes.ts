import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchProductsComponent } from './pages/search-products/search-products.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/login/signin/signin.component';
import { SignupComponent } from './pages/login/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/dashboard/profile/profile.component';
import { ShoppingCartComponent } from './pages/dashboard/shopping-cart/shopping-cart.component';
import { OrderHistoryComponent } from './pages/dashboard/order-history/order-history.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { InventoryComponent } from './pages/dashboard-admin/inventory/inventory.component';
import { IndividualReportComponent } from './pages/dashboard-admin/individual-report/individual-report.component';
import { JointReportComponent } from './pages/dashboard-admin/joint-report/joint-report.component';

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
          { path: '', redirectTo: 'signin', pathMatch: 'full' } 
        ]    
    },
    {
        path: 'account',
        component: DashboardComponent,
        children: [
          { path: 'profile', component: ProfileComponent },
          { path: 'shoppingCart', component: ShoppingCartComponent },
          { path: 'orderHistory', component: OrderHistoryComponent },
          { path: '', redirectTo: 'profile', pathMatch: 'full' } 
        ]    
    },
    {
        path: 'manager',
        component: DashboardAdminComponent,
        children: [
          { path: 'inventory', component: InventoryComponent },
          { path: 'indReport', component: IndividualReportComponent },
          { path: 'jointReport', component: JointReportComponent },
          { path: '', redirectTo: 'inventory', pathMatch: 'full' } 
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
