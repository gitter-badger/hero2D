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
 		this.queries = {};

 		/** Preload every files */
 		for(var i = 0; i < this.files.length; i++) this.queries[this.files[i]] = "progress";

 	};

 	Preloader.prototype.state = function() {

 		var isDone = true;
 		var self = this;

 		for(var key in this.queries) {
 			if(this.queries[key] != "done") {
 				isDone = false;
 				break;
 			}
 		}

 		return (isDone) ? console.log('fini') : console.log('pas fini');

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
 		return callback();
 	};

 	Preloader.prototype.getPercent = function() {

 		var files = this.files.length;
 		var doneFiles = [];

 		for(var key in this.queries) {
 			if(this.queries[key] == "done") doneFiles.push(key);
 		}

 		if(doneFiles.length > 0)
 			var percent = (doneFiles.length / this.files.length) * 100;
 		else
 			var percent = 0;

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
			//console.log('Done for : ' + requestedFile);
			self.queries[requestedFile] = "done"; // Okay, done for this file !
			//console.log(self.queries);
			return self.state();
		}

		/**
		 * Damn, it's an error
		 * @param  {[object]} event
		 * @return {[type]}
		 */
		function error(event) {
			alert('erreur');
		}
 	};