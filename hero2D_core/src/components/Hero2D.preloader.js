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

 		/** Preloader called ! */
 		Preloader.called = true;

 		/** Keep files data */
 		this.files = files;
 		this.queries = {};

 		/** Preload every files */
 		for(var i = 0; i < this.files.length; i++) this.queries[this.files[i]] = "progress";

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
 		for(var i = 0; i < this.files.length; i++) this.requestFile(this.files[i], callback);

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

 		/** Damn, no play() functiond found ! */
 		if(!play.called) play(function() {});

 	};

 	/**
 	 * [getPercent description]
 	 * @return {[type]} [description]
 	 */
 	Preloader.prototype.getPercent = function() {

 		/** Number of files */
 		var files = this.files.length;
 		var doneFiles = [];

 		/** Okay, we need to get the number of preloaded files */
 		for(var key in this.queries) {
 			if(this.queries[key] == "done") doneFiles.push(key);
 		}

 		/** Forget division by 0 ! (donesFiles / files) * 100 */
 		if(doneFiles.length > 0)
 			var percent = (doneFiles.length / this.files.length) * 100;
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
 	Preloader.prototype.requestFile = function(file, callback) {

 		/** Create the XMLHttpRequest element */
 		var self = this;
 		var requestedFile = file;
 		var currentQuery = self.queries[requestedFile];
 		currentQuery = new XMLHttpRequest();

 		/** Define listeners */
		currentQuery.addEventListener("progress", progress, false);
		currentQuery.addEventListener("load", done, false);
		currentQuery.addEventListener("error", error, false);

		/** Ask for the requested file */
		currentQuery.open("GET", requestedFile, true);
		currentQuery.send();

		/**
		 * In Progress
		 * @param  {[object]} event
		 * @return {[N/A]}
		 */
		function progress(event) {
			return callback(self.getPercent());
		}

		/**
		 * Complete !
		 * @return {Function} [description]
		 */
		function done() {
			self.queries[requestedFile] = "done"; // Okay, done for this file !
			if(self.getPercent() >= 100) return self.doneCallback();
		}

		/**
		 * Damn, it's an error
		 * @param  {[object]} event
		 * @return {[type]}
		 */
		function error(event) {
			displayError('main.js', 'Problem with preloading. Please check the files to preload.');
		}
 	};