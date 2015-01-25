/*!
 *	 _   _                 _____  _____ 
 *	| | | |               / __  \|  _  \
 *	| |_| | ___ _ __ ___  `' / /'| | | |
 *	|  _  |/ _ \ '__/ _ \   / /  | | | |
 *	| | | |  __/ | | (_) |./ /___| |/ / 
 *	\_| |_/\___|_|  \___/ \_____/|___/                                    
 * 
 * Hero2D Game Builder
 * Version : 0.0.1
 * Author : Christophe Corbalan @RedStarZOn
 * http://www.christophecorbalan.com/
 *
 * Copyright 2015 HeroJS
 * Released under the MIT license
 *
 * Date: 2015-01-21
 */

/** @type {[object]} [Because everyone needs a hero] */
var Hero2D = Hero2D || {};

(function() {

	'use strict';

 	/**
 	 * Application informations & settings
 	 * @type {Object}
 	 */
 	Hero2D.data = {

 		/** Environment */
 		_ENV: "dev",

 		/** Application informations */
		name: "Hero2D",
 		version: "Alpha 0.0.1",
 		author: "@RedStarZOn",
 		website: "http://www.hero2D.com/",

 		/** Window settings */
		window_width: 820,
		window_height: 550,

		/** Cryptage settings */
		algorithm: "aes-256-ctr",
		hash: "(:?hMpLos).?/_HK",

		/** Application locations */
		source: "src/app/",
		build: "src/build/",

		/** Data files */
		settings: "src/data/main.data",

		/** Last project */
		last_project: null

 	}

 	/**
 	 * Default project data
 	 * @type {Object}
 	 */
 	Hero2D.project = {

 		name: null,
 		window_width: 640,
 		window_height: 480,

 	}

 	/**
 	 * Default game JSON parameters
 	 * @type {Object}
 	 */
 	Hero2D.JSON = {

 		name: Hero2D.project.name,
 		main: "bin/start.app",
 		window: {
 			toolbar: false,
 			frame: true,
 			width: Hero2D.project.window_width,
 			height: Hero2D.project.window_height,
 			resizable: false
 		}

 	}

 	/**
	 * NodeJS Modules
	 */
	Hero2D.module = {
		fs: require('fs'),
		crypto: require('crypto'),
		path: require('path')
	}

 	/**
 	 * Application location (DEV or PROD ?)
 	 */
 	if(Hero2D.data._ENV == "prod") { // Prod
 		Hero2D.data.location = Hero2D.data.build;
 	} else { // Dev
 		Hero2D.data.location = Hero2D.data.source;
 	}

 	/**
 	 * Include Javascript File
 	 * @param  {String}
 	 * @return {Javascript}
 	 */
 	Hero2D.join = function(source) {

 		function read(source) {
			source = Hero2D.data.location + source;
			return Hero2D.module.fs.readFileSync(source).toString();
		}

		return eval.apply(global, [read(source)]);

 	};

 	/**
	 * Load Crypt Library
	 */
	Hero2D.join('helpers/crypt.js');

	Hero2D.isJSON = function(str) {
	    try {
	        JSON.parse(str);
	    } catch (e) {
	        return false;
	    }
	    return true;
	}

 	/**
 	 * Read Crypted File
 	 * @param  {String}
 	 * @return {String or Object}
 	 */
 	Hero2D.readData = function(source) {
 		var content = Hero2D.decrypt(Hero2D.module.fs.readFileSync(source, 'utf8'));
 		if(Hero2D.isJSON(content)) {
 			return JSON.parse(content);
 		} else {
 			return content;
 		}
 	};

 	/**
 	 * Write Crypted File
 	 * @param  {String}
 	 * @param  {String or Object}
 	 * @return {Boolean}
 	 */
 	Hero2D.writeData = function(source, data) {
 		if(typeof data == 'object') {
 			return Hero2D.module.fs.writeFile(source, Hero2D.encrypt(JSON.stringify(data, null, 4)));
 		} else {
 			return Hero2D.module.fs.writeFile(source, Hero2D.encrypt(data));
 		}
 	};

 	/**
 	 * Check if file exists
 	 * @param  {String}
 	 * @return {Boolean}
 	 */
 	Hero2D.fileExists = function(source) {
		return Hero2D.module.fs.existsSync(source);
	}

	/**
	 * General settings file management
	 */
	if(!Hero2D.fileExists(Hero2D.data.settings)) {
 		// Create the file
 		Hero2D.writeData(Hero2D.data.settings, Hero2D.data);
 	} else {
 		Hero2D.data = Hero2D.readData(Hero2D.data.settings);
 	}

 	/**
 	 * Load Helpers
 	 */
 	Hero2D.join('helpers/misc.js');
	Hero2D.join('helpers/files.js');
	Hero2D.join('helpers/projects.js');

	/**
	 * Load External Libraries
	 */
	Hero2D.join('ext/jquery.min.js');
	Hero2D.join('ext/context.menu.js');
	Hero2D.join('ext/codemirror/lib/codemirror.js');
	Hero2D.join('ext/codemirror/mode/javascript/javascript.js');
	Hero2D.join('ext/codemirror/keymap/sublime.js');

	Hero2D.importView = function(source, target) {
		return $(target).load('../' + Hero2D.data.location + 'views/' + source);
	}

	Hero2D.loadEditor = function() {
		$('preload').hide();
		$('application').show();
	};

	/**
	 * Load Frontend components
	 */
	Hero2D.join('components/preload.frontend.js');
	Hero2D.join('components/editor.frontend.js');

	//Hero2D.createProject('Test de jeu !');

})(Hero2D);