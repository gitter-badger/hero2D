/*!
 *
 * File: Hero2D.misc.js
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
	 * Remove array entry by name
	 * @param  {[array]} arr
	 * @param  {[string]} item
	 * @return {[array]}
	 */
	function removeArrayItem(arr, item) {
	    var removeCounter = 0;

	    for (var index = 0; index < arr.length; index++) {
	        if (arr[index] === item) {
	            arr.splice(index, 1);
	            removeCounter++;
	            index--;
	        }
	    }
	    return removeCounter;
	}