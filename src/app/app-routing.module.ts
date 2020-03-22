import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {AuthenticationSectionGuard} from './authenticationSection/authenticationSection.guard';
import {ProductStartComponent} from './products/product-start/product-start.component';
import {ProductEditComponent} from './products/product-edit/product-edit.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {ProductsResolverService} from './products/products-resolver.service';
import {ShoppingListItemsComponent} from './shopping-list-items/shopping-list-items.component';
import {AuthenticationSectionComponent} from './authenticationSection/authenticationSection.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthenticationSectionGuard],
    children: [
      { path: '', component: ProductStartComponent },
      { path: 'new', component: ProductEditComponent },
      {
        path: ':id',
        component: ProductDetailComponent,
        resolve: [ProductsResolverService]
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
        resolve: [ProductsResolverService]
      }
    ]
  },
  { path: 'shopping-list-items', component: ShoppingListItemsComponent },
  { path: 'authenticationSection', component: AuthenticationSectionComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})


export class AppRoutingModule {}
