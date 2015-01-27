/*!
 *
 * File: Hero2D.preload.js
 * Hero2D Framework
 * Version : 0.0.1
 * Author : Christophe Corbalan @RedStarZOn
 * http://www.christophecorbalan.com/
 *
 * Copyright 2015 Hero2D
 * Released under the MIT license
 *
 * Date: 2015-01-25
 * 
 */

 	/**
 	 * New Preloader
 	 * @param {[array]} files
 	 * Ex:
 	 * 		var preload = new Preloader(['sprite.png', 'sound.ogg']);
 	 */
 	function Preloader(files) {

 		/** Keep files data */
 		this.files = files;

 	};

 	/**
 	 * Preload in progress
 	 * @param  {Function} callback
 	 * @return {Function}
 	 * Ex:
 	 * 		preload.progress(function() {});
 	 */
 	Preloader.prototype.progress = function(callback) {
 		return callback();
 	};

 	/**
 	 * Preload complete
 	 * @param  {Function} callback
 	 * @return {Function}
 	 */
 	Preloader.prototype.done = function(callback) {
 		return callback();
 	};