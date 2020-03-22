import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { ShoppingListItemsComponent } from './shopping-list-items/shopping-list-items.component';
import { ShoppingEditComponent } from './shopping-list-items/shopping-edit/shopping-edit.component';
import { AuthenticationSectionComponent } from './authenticationSection/authenticationSection.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {ProductEditComponent} from './products/product-edit/product-edit.component';
import {HttpClientModule} from '@angular/common/http';
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingListService} from './shopping-list-items/shopping-list-items.service';
import {ProductService} from './products/product.service';
import {ProductStartComponent} from './products/product-start/product-start.component';
import {AppRoutingModule} from './app-routing.module';
import {AdminSectionComponent} from './adminSection/adminSection.component';
import { AdminEditComponent } from './adminSection/admin-edit/admin-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductListComponent,
    ProductItemComponent,
    ShoppingListItemsComponent,
    ShoppingEditComponent,
    AuthenticationSectionComponent,
    HeaderComponent,
    ProductEditComponent,
    DropdownDirective,
    ProductStartComponent,
    AdminSectionComponent,
    AdminEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ShoppingListService,
    ProductService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
