import { Property } from '../shared/property.model';

export class Product {
  public productId: string;
  public name: string;
  public price: string;
  public imagePath: string;
  public properties: Property[];

  constructor(productId: string, name: string, price: string, imagePath: string, properties: Property[]) {
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.imagePath = imagePath;
    this.properties = properties;
  }
}
