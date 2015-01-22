/*!
 * misc.js
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
	 * Slugify
	 * @param  {[string]} string
	 * @return {[string]}
	 */
	Hero2D.slugify = function(string) {
		var Text = string.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
	    var lastCharacter = Text.slice(-1);

	    if(lastCharacter == '-') { return Text.slice(0, -1); }
	    else { return Text; }
	}