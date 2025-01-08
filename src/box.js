/**
 * pckstudiomod_io: Provides import/export support for pckstudio-mod in Blockbench.
 * Copyright (c) 2025  wily-coyote
 *
 * pckstudiomod_io is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * pckstudiomod_io is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * pckstudiomod_io. If not, see <https://www.gnu.org/licenses/>. 
 **/

export const REQUIRED_GROUPS = ["HEAD", "BODY", "ARM0", "ARM1", "LEG0", "LEG1"];

/**
 * blockbench starts at bottom right front corner and ends at top left back corner
 * 4J starts at top left front corner
 **/
export class Box{
	/**
	 * type, x, y, z, xsize, ysize, zsize, u, v, armorflag, mirror, scale
	 **/
	constructor(){
		this.t = "";
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.xs = 0;
		this.ys = 0;
		this.zs = 0;
		this.u = 0;
		this.v = 0;
		this.f = 0;
		this.m = 0;
		this.s = 0;
	}
	
	/**
	 * X Y Z Xs Ys Zs U V A M S
	 **/
	static fromStr(str){
		let box = new Box();
		let values = str.split(" ")
		let type = values.shift()
		values = values.map(x => Number.parseFloat(x))
		box.t = type;
		box.x = values[0]
		box.y = values[1]
		box.z = values[2]
		box.xs = values[3]
		box.ys = values[4]
		box.zs = values[5]
		box.u = values[6]
		box.v = values[7]
		box.f = values[8]
		box.m = values[9]
		box.s = values[10]
		return box;
	}

	set position(xyz){
		this.x = xyz[0];
		this.y = xyz[1];
		this.z = xyz[2]; 
	}
	
	set size(xyz){
		this.xs = xyz[0];
		this.ys = xyz[1];
		this.zs = xyz[2]; 
	}
	
	set uv(uv){
		this.u = uv[0];
		this.v = uv[1];
	}
	
	/**
	 * Blockbench coord conversion
	 * @returns {ArrayVector3} vec
	 **/
	get from(){
		return [(-this.x)-this.xs, (-this.y)-this.ys, this.z]
	}

	/**
	 * Blockbench coord conversion
	 * @returns {ArrayVector3} vec
	 **/
	get to(){
		return [(-this.x), (-this.y), this.z+this.zs]
	}

	get uv(){
		return [this.u, this.v]
	}

	get array(){
		return [
			this.t,
			this.x,
			this.y,
			this.z,
			this.xs,
			this.ys,
			this.zs,
			this.u,
			this.v,
			this.f,
			this.m,
			this.s
		]
	}

	addPos(arr){
		this.x += arr[0];
		this.y += arr[1];
		this.z += arr[2];
	}
	
	subPos(arr){
		this.x -= arr[0];
		this.y -= arr[1];
		this.z -= arr[2];
	}

	toString(){
		return `BOX\t${this.array.join(" ")}`
	}
}
