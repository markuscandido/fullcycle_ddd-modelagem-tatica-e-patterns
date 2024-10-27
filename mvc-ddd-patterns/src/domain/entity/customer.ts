import Address from "./address";

export default class Customer {

	private _id: string;
	private _name: string = "";
	private _document: string = "";
	private _address?: Address;
	private _active: boolean = false;
	private _rewardPoints: number = 0;

	constructor(
		id: string,
		name: string,
		document: string,
		address?: Address,
		active: boolean = false,
		rewardPoints: number = 0
	) {
		this._id = id;
		this._name = name;
		this._document = document;
		this._address = address;

		this._active = active;
		this._rewardPoints = rewardPoints;

		this.validate();
	}

	get id(): string {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get document(): string{
		return this._document;
	}

	get Address(): Address | undefined {
		return this._address;
	}

	get rewardPoints(): number {
		return this._rewardPoints;
	}

	isActive(): boolean {
		return this._active;
	}

	validate(): void {
		if (this._id.trim().length === 0) {
			throw new Error("Customer::Id is required");
		}
		if (this._name.trim().length === 0) {
			throw new Error("Customer::Name is required");
		}

		if (this._document.trim().length === 0) {
			throw new Error("Customer::Document is required");
		}
	}

	changeName(name: string) {
		this._name = name;
		this.validate();
	}

	changeAddress(address: Address) {
		this._address = address;
	}

	activate() {
		if (this._address === undefined) {
			throw new Error("Address is mandatory to activate a customer");
		}
		this._active = true;
	}

	deactivate() {
		this._active = false;
	}

	addRewardPoints(points: number): void{
		if(points <= 0){
			throw new Error("Points reward must be greater than 0");
		}

		this._rewardPoints += points;
	}

}