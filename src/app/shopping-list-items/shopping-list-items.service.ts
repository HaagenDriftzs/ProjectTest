import { Property } from '../shared/property.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  propertiesChanged = new Subject<Property[]>();
  startedEditing = new Subject<number>();
  private properties: Property[] = [
    new Property('Apples', 5),
    new Property('Tomatoes', 10),
  ];

  getProperties() {
    return this.properties.slice();
  }

  getProperty(index: number) {
    return this.properties[index];
  }

  addProperty(property: Property) {
    this.properties.push(property);
    this.propertiesChanged.next(this.properties.slice());
  }

  addProperties(properties: Property[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.properties.push(...properties);
    this.propertiesChanged.next(this.properties.slice());
  }

  updateProperty(index: number, newProperty: Property) {
    this.properties[index] = newProperty;
    this.propertiesChanged.next(this.properties.slice());
  }

  deleteProperty(index: number) {
    this.properties.splice(index, 1);
    this.propertiesChanged.next(this.properties.slice());
  }
}
