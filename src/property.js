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

export class Property{
	constructor(key, value){
		this.key = key.toUpperCase();
		this.value = value;
	}
	toString(){
		return `${this.key}\t${this.value}`;
	}
}
