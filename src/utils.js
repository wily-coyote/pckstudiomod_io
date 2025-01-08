import { Box, REQUIRED_GROUPS } from "./box";

/**
 * Creates the root part of a Group based on the BOX type.
 * @param {string} type
 **/
export function make_root(type){
	let box = new Box();
	switch(type){
		case "HEAD":
			box.position = [-4, -8, -4];
			box.size = [8, 8, 8];
			box.uv = [0, 0];
			break;
		case "BODY":
			box.position = [-4, 0, -2];
			box.size = [8, 12, 4];
			box.uv = [16, 16];
			break;
		case "LEG0":
			box.position = [-2, 0, -2];
			box.size = [4, 12, 4];
			box.uv = [0, 16];
			break;
		case "LEG1":
			box.position = [-2, 0, -2];
			box.size = [4, 12, 4];
			box.uv = [0, 16];
			box.m = 1;
			break;
		case "ARM0":
			box.position = [-3, -2, -2];
			box.size = [4, 12, 4];
			box.uv = [40, 16];
			break;
		case "ARM1":
			box.position = [-1, -2, -2];
			box.size = [4, 12, 4];
			box.uv = [40, 16];
			box.m = 1;
			break;
	}
	let cube = new Cube({name: "_"+type});
	cube.extend({
		from: box.from,
		to: box.to,
		mirror_uv: box.m === 1,
		autouv: 1
	}).init();
	cube.setUVMode(true);
	cube.extend({
		uv_offset: box.uv
	});
	if(Project.selected_texture != null)
		cube.applyTexture(Project.selected_texture);
	return cube;
}

/**
 * Creates required groups for the TSV format.
 * Will re-use existing groups if needed.
 **/
export function create_groups(){
	for(let group of REQUIRED_GROUPS){
		let currentGroup = find_group(group);
		if(currentGroup == null){
			// create a new group
			// with our root part
			let newGroup = new Group({
				name: group
			}).init().addTo();
			// add root node
			let root = make_root(group);
			root.addTo(newGroup);
		} else {
			// try to move the group
			// back to world origin;
			// must be a previous import
			// also assumes that root is there
			let origin = currentGroup.origin;
			origin[0] = -origin[0];
			origin[1] = -origin[1];
			origin[2] = -origin[2];
			move_group(currentGroup, origin);
		}
	}
}

/**
 * Moves the contents of a group, changing its origin with it.
 * @param {Group} group
 * @param {ArrayVector3} vector
 **/
export function move_group(group, vector){
	group.forEachChild(obj => {
		obj.moveVector(vector, null, true)
		obj.transferOrigin(vector, true)
	}, Cube)
	group.transferOrigin(vector, true)
}

/**
 * General array containment checking function.
 * @param {any} thing
 * @param {any[]} array
 * @returns {boolean} check
 **/
export function is_in_array(thing, array){
	for(let k of array){
		if(thing === k) return true;
	}
	return false;
}

/**
 * Recursively flatten a Group into an array of Cubes.
 * @param {Group} group
 * @param {Cube[]} loc
 * @returns {Cube[]} cubes
 **/
export function flat_group(group, loc=[]){
	for(let item of group.children){
		if(item instanceof Group)
			flat_group(item, loc);
		else if(item instanceof Cube)
			loc.push(item)
	}
	return loc;
}

/**
 * Finds a Group of the given name in the current Project.
 * @param {string} name
 * @returns {Group[] | undefined} group
 **/
export function find_group(name){
	return Project.groups.find(x => x.name == name);
}

/**
 * Does the equivalent of clicking Create Texture and selecting the "Texture Template" type.
 * The resulting Texture is added to the outliner.
 * @returns {Promise<Texture>} texture
 **/
export function generate_texture_template(){
	return new Promise((res, rej) => {
		SharedActions.runSpecific("select_all", "outliner");
		TextureGenerator.addBitmap({resolution: [64, 32]}, (x) =>
			TextureGenerator.generateTemplate({
				box_uv: true,
				resolution: 16,
				rearrange_uv: false
			}, x).then(x => {
				SharedActions.runSpecific("unselect_all", "outliner")
				res(x);
			}).catch(x => {
				rej(x)
			})
		); 
	})
}
