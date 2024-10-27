export default class OrderItem {

	private _id: string;
	private _name: string;
	private _price: number;
	private _productId: string;
	private _quantity: number;
	//private _total: number;


	constructor(
		id: string,
		name: string,
		price: number,
		productId: string,
		quantity: number
	) {
		this._id = id;
		this._name = name;
		this._price = price;
		this._productId = productId;
		this._quantity = quantity;

		this.validate();

		//this._total = this.total();
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

	get productId(): string {
		return this._productId;
	}

	get quantity(): number {
		return this._quantity;
	}

	validate(): void {
		if (this._id.trim().length === 0) {
			throw new Error("OrderItem::Id is required");
		}
		if (this._name.trim().length === 0) {
			throw new Error("OrderItem::Name is required");
		}
		if (this._price <= 0) {
			throw new Error("OrderItem::Price must be greater than 0");
		}
		if (this._productId.trim().length === 0) {
			throw new Error("OrderItem::ProductId is required");
		}
		if (this._quantity <= 0) {
			throw new Error("OrderItem::Quantity must be greater than 0");
		}
	}

	total(): number {
		return this._price * this._quantity;
	}
}