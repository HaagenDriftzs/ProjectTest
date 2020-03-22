import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Product} from './product.model';
import {DataStorageService} from '../shared/data-storage.service';
import {ProductService} from './product.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(private dataStorageService: DataStorageService, private productService: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const products = this.productService.getProducts();

    if (products.length === 0) {
      return this.dataStorageService.fetchProducts();
    } else {
      return products;
    }
  }
}
