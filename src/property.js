export class Property{
	constructor(key, value){
		this.key = key.toUpperCase();
		this.value = value;
	}
	toString(){
		return `${this.key}\t${this.value}`;
	}
}
