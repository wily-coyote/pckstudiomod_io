/// <reference path="../../../types/index.d.ts" />

import { Property } from "./property";
import { Box, REQUIRED_GROUPS } from "./box";
import { is_in_array, create_groups, move_group, flat_group, find_group, generate_texture_template } from "./utils";

(function() {

let import_action;
let export_action;
let codec;
let format;

// When updating, apply meta data changes to plugins.json entry!
BBPlugin.register("pckstudio_tsv", {
	title: "pckstudio-mod propdump IO",
	icon: "icon.png",
	author: "coyote",
	description: "Handles import and export for pckstudio-mod propdumps (.tsv).",
	tags: ["Minecraft: Legacy Console Edition", "Importer", "Exporter"],
	version: "0.0.0",
	min_version: "4.9.0",
	variant: "both",
	onload() {
		codec = new Codec("pckstudio_tsv", {
			name: "pckstudio-mod Propdump (.tsv)",
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
					new Property("FREE", "1"),
					new Property("DISPLAYNAME", options.displayname),
					new Property("THEMENAME", options.themename),
					new Property("GAME_FLAGS", options.game_flags),
					new Property("ANIM", options.anim)
				]
				// in all groups
				Project.groups.forEach(group => {
					// check if a group is valid
					if(is_in_array(group.name, REQUIRED_GROUPS)){
						// for all Cube descendants
						for(let cube of flat_group(group)){
							// do not export root parts
							if(cube.name != "_"+group.name){
								let box = new Box();
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
				create_groups();
				for(let line of lines){
					// get key-value pair
					let tab = line.indexOf("\t")
					let key = line.substring(0, tab)
					let value = line.substring(tab+1, line.length)
					// key comparison
					if(key == "BOX"){
						let box = Box.fromStr(value);
						// find existing group
						let group = find_group(box.t);
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
				move_group(find_group("HEAD"), [0, 24, 0])
				move_group(find_group("BODY"), [0, 24, 0])
				move_group(find_group("LEG0"), [-2, 12, 0])
				move_group(find_group("LEG1"), [2, 12, 0])
				move_group(find_group("ARM0"), [-5, 22, 0])
				move_group(find_group("ARM1"), [5, 22, 0])
				Canvas.updateAll();
			}
		});
		format = new ModelFormat({
			id: "pckstudio_tsv",
			name: "pckstudio-mod BOX model",
			category: "minecraft",
			target: ["pckstudio-mod", "Minecraft: Legacy Console Edition"],
			description: "Custom player model for pckstudio-mod.",
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
						'* You can then import the resulting TSV into pckstudio-mod by right-clicking an existing skin and selecting `Import > Import property dump`.\n' +
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
				generate_texture_template();
			}
		})
		import_action = new Action("pckstudio_tsv_importer", {
			name: "Import pckstudio-mod Propdump",
			category: "file",
			description: "Import a .tsv file exported from pckstudio-mod.",
			icon: "fa-file-import",
			click(){
				Blockbench.import({
					extensions: ["tsv"],
					type: "pckstudio-mod Propdump",
					readtype: "text",
				}, (files) => {
					console.log("This is Chinese Slavery");
					codec.parse(files[0].content)
				})
			}
		});
		export_action = new Action("pckstudio_tsv_export", {
			name: "Export pckstudio-mod Propdump",
			category: "file",
			description: "Exports a .tsv file for importing in pckstudio-mod.",
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
