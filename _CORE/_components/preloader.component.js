/*!
 *
 * File: preloader.component.js
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

 		/** Preloader called ! */
 		Preloader.called = true;

 		/** Keep files data */
 		this.files = files;
 		this.queries = {};
 		this.type = {}; // Type of file (Sprite or Sound)
 		this.buffers = {}; // Sounds buffer

 		for(var key in files) {

 			/** Check if it's a sprite or a sound */
 			var ext = this.files[key].split('.').pop();
 			if(ext == "ogg" || ext == "mp3" || ext == "wav") {
 				this.type[key] = "sound";
 			} else {
 				this.type[key] = "sprite";
 			}

 			/** Every new files in progress */
 			this.queries[key] = "progress";

 		}

 	};

 	/**
 	 * Preload in progress
 	 * @param  {Function} callback
 	 * @return {Function}
 	 * Ex:
 	 * 		preload.progress(function() {});
 	 */
 	Preloader.prototype.progress = function(callback) {

 		/** Request every files */
 		for(var key in this.files) this.requestFile(key, this.files[key], callback);

 		/** Return the callback function */
 		return callback;

 	};

 	/**
 	 * Preload complete
 	 * @param  {Function} callback
 	 * @return {Function}
 	 */
 	Preloader.prototype.done = function(callback) {

 		/** Keep the done callback in memory */
 		this.doneCallback = callback;

 	};

 	/**
 	 * [getPercent description]
 	 * @return {[type]} [description]
 	 */
 	Preloader.prototype.getPercent = function() {

 		/** Number of files */
 		var files = Object.keys(this.files).length;
 		var doneFiles = [];

 		/** Okay, we need to get the number of preloaded files */
 		for(var key in this.queries) {
 			if(this.queries[key] == "done") doneFiles.push(key);
 		}

 		/** Forget division by 0 ! (donesFiles / files) * 100 */
 		if(doneFiles.length > 0)
 			var percent = (doneFiles.length / files) * 100;
 		else
 			var percent = 0;

 		/** Return global preload percentage */
 		return percent;
 		
 	};

 	/**
 	 * Request a new file
 	 * @param  {[string]} file
 	 * @return {[N/A]}
 	 */
 	Preloader.prototype.requestFile = function(filename, file, callback) {

 		/** Create the XMLHttpRequest element */
 		var self = this;
 		var filename = filename;
 		var requestedFile = file;
 		var currentQuery = self.queries[requestedFile];
 		currentQuery = new XMLHttpRequest();

 		/** Define listeners */
		currentQuery.addEventListener("progress", progress, false);
		currentQuery.addEventListener("load", done, false);
		currentQuery.addEventListener("error", error, false);

		/** Ask for the requested file */
		currentQuery.open("GET", requestedFile, true);

		/** It's a sound ! */
		if(this.type[filename] == "sound") currentQuery.responseType = 'arraybuffer';

		/** Send the query */
		currentQuery.send();

		/**
		 * In Progress
		 * @param  {[object]} event
		 * @return {[N/A]}
		 */
		function progress(event) {
			if(self.type[filename] == "sound") {
				self.buffers[filename] = new Audio(requestedFile);
			}
			return callback(self.getPercent());
		}

		/**
		 * Complete !
		 * @return {Function} [description]
		 */
		function done() {
			if(self.type[filename] == "sound") {
				self.buffers[filename].oncanplay = function() {
					self.queries[requestedFile] = "done"; // Okay, done for this file !
					if(self.getPercent() >= 100) self.doneCallback();
				}
			} else {
				self.queries[requestedFile] = "done"; // Okay, done for this file !
				if(self.getPercent() >= 100) self.doneCallback();
			}
			/**
			 * Old method (works but too long)
			 * /
			if(self.type[filename] == "sound") {
				// Decode audio buffer now !
				H2D_audioContext.decodeAudioData(currentQuery.response, function(buffer) {
					self.buffers[filename] = buffer; // Keep the buffer
					self.queries[requestedFile] = "done"; // Okay, done for this file !
					if(self.getPercent() >= 100) self.doneCallback(); // Already done ?
				}, function(err) {
					throw new Error(err);
				});
			} else { // Normal file
			**/
		}

		/**
		 * Damn, it's an error
		 * @param  {[object]} event
		 * @return {[type]}
		 */
		function error(event) {
			H2D_error('PRELOAD', 'Problem with preloading. Please check the files to preload.');
		}

 	};

 	/**
 	 * Select a preloaded file
 	 * @return {[string]}
 	 * Ex:
 	 * 		new Sprite(preload.$('mapTileset'));
 	 */
 	Preloader.prototype.$ = function(name) {
 		if(this.type[name] == "sound") {
			return this.buffers[name];
		} else {
			return this.files[name];
		}
 	}