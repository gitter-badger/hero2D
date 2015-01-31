/*!
 *
 * File: misc.component.js
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

	/** FPS settings vars */
	var H2D_fps = 0, H2D_lastUpdate = (new Date) * 1 - 1, H2D_now, H2D_fpsFilter = 50;

	/**
	 * Get actual FPS
	 * @return {[integer]}
	 */
	function getFps() {
		var thisFrameFPS = 1000 / ((H2D_now = new Date) - H2D_lastUpdate);
		if(H2D_now != H2D_lastUpdate){
			H2D_fps += (thisFrameFPS - H2D_fps) / H2D_fpsFilter;
			H2D_lastUpdate = H2D_now;
		}

		return Math.round(H2D_fps);
	};