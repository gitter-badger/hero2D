/*!
 * projects.js
 * Location : helpers/crypt.js
 * Author : Christophe Corbalan @RedStarZOn
 * http://www.christophecorbalan.com/
 *
 * Copyright 2015 HeroJS
 * Released under the MIT license
 *
 * Date: 2015-01-22
 */

	/**
	 * Create project file
	 * @param  {string} destination
	 * @return {[boolean]}
	 */
 	Hero2D.createProjectFile = function(destination) {
 		return Hero2D.writeData(destination, Hero2D.project);
 	};

 	/**
 	 * Generate the JSON Application File
 	 * @param  {[string]} destination
 	 * @return {[boolean]}
 	 */
 	Hero2D.generateJSON = function(destination) {
 		Hero2D.createJSON(destination, Hero2D.JSON);
 	};

	/**
	 * Create a new project
	 * @param  {[string]} string
	 * @return {[boolean]}
	 */
	Hero2D.createProject = function(name) {

		/**
		 * Directory project path
		 * @type {[string]}
		 */
		var dir = 'projects/' + Hero2D.slugify(name) + '/';

		/** Create the new project directory */
		Hero2D.createDir(dir);

		/** Copy binary files */
		Hero2D.copy('Hero2D.exe',			dir + 'game.exe');
		Hero2D.copy('d3dcompiler_47.dll', 	dir + 'd3dcompiler_47.dll');
		Hero2D.copy('ffmpegsumo.dll', 		dir + 'ffmpegsumo.dll');
		Hero2D.copy('icudtl.dat', 			dir + 'icudtl.dat');
		Hero2D.copy('libEGL.dll', 			dir + 'libEGL.dll');
		Hero2D.copy('libGLESv2.dll', 		dir + 'libGLESv2.dll');
		Hero2D.copy('nw.pak', 				dir + 'nw.pak');
		Hero2D.copy('pdf.dll', 				dir + 'pdf.dll');

		/** Create the project file */
		Hero2D.createProjectFile(dir + 'game.hproj');

		/** Create the JSON Application file */
		Hero2D.generateJSON(dir + 'package.json');

	};