export default class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  get id(): string {
    return this._id;
  }
  
  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate(): void {
    if (this._id.trim().length === 0) {
      throw new Error("Product::Id is required");
    }
    if (this._name.trim().length === 0) {
      throw new Error("Product::Name is required");
    }
    if (this._price <= 0) {
      throw new Error("Product::Price must be greater than zero");
    }
  }
}
