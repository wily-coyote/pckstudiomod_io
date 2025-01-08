/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./box.js":
/*!****************!*\
  !*** ./box.js ***!
  \****************/
/*! exports provided: REQUIRED_GROUPS, Box */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REQUIRED_GROUPS", function() { return REQUIRED_GROUPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Box", function() { return Box; });
const REQUIRED_GROUPS = ["HEAD", "BODY", "ARM0", "ARM1", "LEG0", "LEG1"];

/**
 * blockbench starts at bottom right front corner and ends at top left back corner
 * 4J starts at top right front corner
 **/
class Box{
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
		return [this.x, (-this.y)-this.ys, this.z]
	}

	/**
	 * Blockbench coord conversion
	 * @returns {ArrayVector3} vec
	 **/
	get to(){
		return [this.x+this.xs, (-this.y), this.z+this.zs]
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


/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./property */ "./property.js");
/* harmony import */ var _box__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./box */ "./box.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./utils.js");
/// <reference path="../../../types/index.d.ts" />





(function() {

let import_action;
let export_action;
let codec;
let format;

// When updating, apply meta data changes to plugins.json entry!
BBPlugin.register("pckstudio_tsv", {
	title: "PCK Studio-mod propdump IO",
	icon: "icon.png",
	author: "coyote",
	description: "Handles import and export for PCK Studio-mod propdumps (.tsv).",
	tags: ["Minecraft: Legacy Console Edition", "Importer", "Exporter"],
	version: "0.0.0",
	min_version: "4.9.0",
	variant: "both",
	onload() {
		codec = new Codec("pckstudio_tsv", {
			name: "PCK Studio-mod Propdump (.tsv)",
			extension: "tsv",
			export_options: {
				displayname: {
					label: "Display name",
					type: "text",
					value: "Exported Model"
				},
				themename: {
					label: "Theme name",
					type: "text",
					value: "Blockbench"
				},
				game_flags: {
					label: "Game flags",
					type: "text",
					value: "0x16"
				},
				anim: {
					label: "Anim",
					type: "text",
					value: "0x00000000"
				}
			},
			compile(){
				let options = this.getExportOptions()
				// for easy importing in PCK studio
				let boxes = [
					new _property__WEBPACK_IMPORTED_MODULE_0__["Property"]("FREE", "1"),
					new _property__WEBPACK_IMPORTED_MODULE_0__["Property"]("DISPLAYNAME", options.displayname),
					new _property__WEBPACK_IMPORTED_MODULE_0__["Property"]("THEMENAME", options.themename),
					new _property__WEBPACK_IMPORTED_MODULE_0__["Property"]("GAME_FLAGS", options.game_flags),
					new _property__WEBPACK_IMPORTED_MODULE_0__["Property"]("ANIM", options.anim)
				]
				// in all groups
				Project.groups.forEach(group => {
					// check if a group is valid
					if(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["is_in_array"])(group.name, _box__WEBPACK_IMPORTED_MODULE_1__["REQUIRED_GROUPS"])){
						// for all Cube descendants
						for(let cube of Object(_utils__WEBPACK_IMPORTED_MODULE_2__["flat_group"])(group)){
							// do not export root parts
							if(cube.name != "_"+group.name){
								let box = new _box__WEBPACK_IMPORTED_MODULE_1__["Box"]();
								// type
								box.t = group.name;
								// size
								box.size = cube.getSize()
								// calculate position
								box.position = cube.to
								box.subPos(group.origin)
								box.z -= box.zs;
								box.x -= box.xs;
								box.y = -box.y;
								// arm exceptions (do i need this?)
								//if(group.name == "ARM1")
								//	box.x += 2;
								//else if(group.name == "ARM0")
								//	box.x -= 2;
								// uvs
								box.uv = cube.uv_offset;
								// mirror
								box.m = cube.mirror_uv ? 1 : 0
								boxes.push(box);
							}
						}
					}
				})
				// quack quack
				return boxes.map(x => x.toString()).join("\n");
			},
			parse(data){
				let lines = data.split(/(?:\r\n|\n)+/);
				Object(_utils__WEBPACK_IMPORTED_MODULE_2__["create_groups"])();
				for(let line of lines){
					// get key-value pair
					let tab = line.indexOf("\t")
					let key = line.substring(0, tab)
					let value = line.substring(tab+1, line.length)
					// key comparison
					if(key == "BOX"){
						let box = _box__WEBPACK_IMPORTED_MODULE_1__["Box"].fromStr(value);
						// find existing group
						let group = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["find_group"])(box.t);
						// otherwise, init new group
						if(group == undefined){
							group = new Group({
								name: box.t
							}).init().addTo()
						}
						// add cube to group
						let cube = new Cube({
							from: box.from,
							to: box.to,
							autouv: 1
						}).init()
						cube.setUVMode(true);
						cube.extend({
							uv_offset: box.uv
						})
						// apply the texture if the user has one selected
						if(Project.selected_texture != null)
							cube.applyTexture(Project.selected_texture);
						cube.addTo(group)
					}
				}
				// move body parts to a more logical position
				Object(_utils__WEBPACK_IMPORTED_MODULE_2__["move_group"])(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["find_group"])("HEAD"), [0, 24, 0])
				Object(_utils__WEBPACK_IMPORTED_MODULE_2__["move_group"])(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["find_group"])("BODY"), [0, 24, 0])
				Object(_utils__WEBPACK_IMPORTED_MODULE_2__["move_group"])(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["find_group"])("LEG0"), [-2, 12, 0])
				Object(_utils__WEBPACK_IMPORTED_MODULE_2__["move_group"])(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["find_group"])("LEG1"), [2, 12, 0])
				Object(_utils__WEBPACK_IMPORTED_MODULE_2__["move_group"])(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["find_group"])("ARM0"), [-5, 22, 0])
				Object(_utils__WEBPACK_IMPORTED_MODULE_2__["move_group"])(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["find_group"])("ARM1"), [5, 22, 0])
				Canvas.updateAll();
			}
		});
		format = new ModelFormat({
			id: "pckstudio_tsv",
			name: "PCK Studio-mod BOX model",
			category: "minecraft",
			target: ["PCK Studio-mod", "Minecraft: Legacy Console Edition"],
			description: "Custom player model for PCK Studio-mod.",
			icon: "icon-player",
			meshes: false,
			rotate_cubes: false,
			bone_rig: false,
			box_uv: true,
			uv_rotation: false,
			animation_mode: false,
			animated_textures: false,
			centered_grid: true,
			edit_mode: true,
			single_texture: true,
			codec: codec,
			format_page: {
				content: [
					{type: 'h3', text: tl("mode.start.format.informations")},
					{text:
						'* You can export the model as a propdump using the `File > Export` action or with the `Save Model` action.\n' +
						'* You can then import the resulting TSV into PCK Studio-mod by right-clicking an existing skin and selecting `Import > Import property dump`.\n' +
						'* Raw property import/export in TSV is a feature only available in [my fork of PCK Studio](https://github.com/wily-coyote/PCK-Studio), which is what this format is built around.'
					},
					{type: 'h3', text: tl("mode.start.format.resources")},
					{text:
						'* [The fork of PCK Studio this model format works with](https://github.com/wily-coyote/PCK-Studio)'
					},
				]
			},
			new(){
				// imports an empty tsv file,
				// which should just generate
				// the root parts
				newProject(this);
				Project.texture_width = 64;
				Project.texture_height = 32;
				codec.parse("")
				Object(_utils__WEBPACK_IMPORTED_MODULE_2__["generate_texture_template"])();
			}
		})
		import_action = new Action("pckstudio_tsv_importer", {
			name: "Import PCK Studio-mod Propdump",
			category: "file",
			description: "Import a .tsv file exported from PCK Studio-mod.",
			icon: "fa-file-import",
			click(){
				Blockbench.import({
					extensions: ["tsv"],
					type: "PCK Studio-mod Propdump",
					readtype: "text",
				}, (files) => {
					console.log("This is Chinese Slavery");
					codec.parse(files[0].content)
				})
			}
		});
		export_action = new Action("pckstudio_tsv_export", {
			name: "Export PCK Studio-mod Propdump",
			category: "file",
			description: "Exports a .tsv file for importing in PCK Studio-mod.",
			icon: "fa-file-export",
			click(){
				codec.export();
			}
		})
		MenuBar.menus["file"].addAction(import_action, "import");
		MenuBar.menus["file"].addAction(export_action, "export");
	},
	onunload() {
		MenuBar.menus["file"].removeAction(import_action);
		MenuBar.menus["file"].removeAction(export_action);
		import_action.delete();
		export_action.delete();
		codec.delete();
		format.delete();
	}
});

})()


/***/ }),

/***/ "./property.js":
/*!*********************!*\
  !*** ./property.js ***!
  \*********************/
/*! exports provided: Property */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Property", function() { return Property; });
class Property{
	constructor(key, value){
		this.key = key.toUpperCase();
		this.value = value;
	}
	toString(){
		return `${this.key}\t${this.value}`;
	}
}


/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/*! exports provided: make_root, create_groups, move_group, is_in_array, flat_group, find_group, generate_texture_template */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "make_root", function() { return make_root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create_groups", function() { return create_groups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "move_group", function() { return move_group; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is_in_array", function() { return is_in_array; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flat_group", function() { return flat_group; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find_group", function() { return find_group; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generate_texture_template", function() { return generate_texture_template; });
/* harmony import */ var _box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./box */ "./box.js");


/**
 * Creates the root part of a Group based on the BOX type.
 * @param {string} type
 **/
function make_root(type){
	let box = new _box__WEBPACK_IMPORTED_MODULE_0__["Box"]();
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
function create_groups(){
	for(let group of _box__WEBPACK_IMPORTED_MODULE_0__["REQUIRED_GROUPS"]){
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
function move_group(group, vector){
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
function is_in_array(thing, array){
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
function flat_group(group, loc=[]){
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
function find_group(name){
	return Project.groups.find(x => x.name == name);
}

/**
 * Does the equivalent of clicking Create Texture and selecting the "Texture Template" type.
 * The resulting Texture is added to the outliner.
 * @returns {Promise<Texture>} texture
 **/
function generate_texture_template(){
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


/***/ })

/******/ });