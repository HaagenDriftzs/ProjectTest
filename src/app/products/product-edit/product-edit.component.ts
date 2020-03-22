import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit {

  id: number;
  editMode = false;
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.productService.updateProduct(this.id, this.productForm.value);
    } else {
      this.productService.addProduct(this.productForm.value);
    }
    this.onCancel();
  }

  onAddProperty() {
    (<FormArray> this.productForm.get('properties')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteProperty(index: number) {
    (<FormArray> this.productForm.get('properties')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let productID = '';
    let productName = '';
    let productPrice = '';
    let productImagePath = '';
    const productProperties = new FormArray([]);

    if (this.editMode) {
      const product = this.productService.getProduct(this.id);
      productID = product.productId;
      productName = product.name;
      productPrice = product.price;
      productImagePath = product.imagePath;
      if (product['properties']) {
        for (const property of product.properties) {
          productProperties.push(
            new FormGroup({
              name: new FormControl(property.name, Validators.required),
              amount: new FormControl(property.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.productForm = new FormGroup({
      productId: new FormControl(productID, Validators.required),
      name: new FormControl(productName, Validators.required),
      price: new FormControl(productPrice, Validators.required),
      imagePath: new FormControl(productImagePath, Validators.required),
      properties: productProperties
    });
  }

}
