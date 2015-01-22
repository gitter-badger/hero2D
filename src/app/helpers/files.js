/*!
 * files.js
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
	 * Copy/Paste a file
	 * @param  {[string]} source
	 * @param  {[string]} destination
	 * @return {[boolean]}            
	 */
	Hero2D.copy = function(source, destination){
		return Hero2D.module.fs.createReadStream(source).pipe(Hero2D.module.fs.createWriteStream(destination));
	};

	/**
	 * Create directory
	 * @param  {[string]} destination
	 * @return {[boolean]}
	 */
	Hero2D.createDir = function(destination) {
		return (!Hero2D.module.fs.existsSync(destination)) ? Hero2D.module.fs.mkdirSync(destination) : false;
	};

	/**
	 * Create a JSON File
	 * @param  {[string]} destination
	 * @param  {[object]} data
	 * @return {[boolean]}
	 */
	Hero2D.createJSON = function(destination, data) {
		return Hero2D.module.fs.writeFile(destination, JSON.stringify(data, null, 4));
	};

	/**
	 * Create Simple File
	 * @param  {[string]} destination
	 * @param  {[string]} data
	 * @return {[boolean]}
	 */
	Hero2D.createFile = function(destination, data) {
		return Hero2D.module.fs.writeFile(destination, Hero2D.encrypt(data));
	}