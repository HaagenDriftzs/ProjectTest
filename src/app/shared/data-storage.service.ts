import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Product } from '../products/product.model';
import { ProductService } from '../products/product.service';
import { AuthenticationSectionService } from '../authenticationSection/authenticationSection.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private authService: AuthenticationSectionService
  ) {}

  storeProducts() {
    const products = this.productService.getProducts();
    this.http
      .put(
        'https://fyp-database-493f6.firebaseio.com/products.json',
        products
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchProducts() {
    return this.http
      .get<Product[]>(
        'https://fyp-database-493f6.firebaseio.com/products.json'
      )
      .pipe(
        map(products => {
          return products.map(product => {
            return {
              ...product,
              properties: product.properties ? product.properties : []
            };
          });
        }),
        tap(products => {
          this.productService.setProducts(products);
        })
      );
  }
}
