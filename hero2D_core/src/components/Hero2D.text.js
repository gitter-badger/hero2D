/*!
 *
 * File: Hero2D.text.js
 * Hero2D Framework
 * Version : 0.0.1
 * Author : Christophe Corbalan @RedStarZOn
 * http://www.christophecorbalan.com/
 *
 * Copyright 2015 Hero2D
 * Released under the MIT license
 *
 * Date: 2015-01-28
 * 
 */

    /**
     * Create a new text object
     * @param {[string]} value
     * @param {[object]} options
     */
    function Text(value, options) {

        /** Global vars */
        this.value = value;
        this.options = (typeof options !== "undefined" && typeof options == 'object') ? options : null;
        this.object = new PIXI.Text(this.value, this.options);
        this.object.position.x = 0;
        this.object.position.y = 0;

    };

    /**
     * Display text to canvas
     * @param  {[integer]} x
     * @param  {[integer]} y
     * @return {[N/A]}
     */
    Text.prototype.display = function(x, y) {
        if(typeof x !== "undefined" && typeof y !== "undefined") {
            this.object.position.x = x;
            this.object.position.y = y;
        }
        return H2D_game_container.addChild(this.object, this.object.position.x, this.object.position.y);
    };

    /**
     * Change text value
     * @param  {[string]} value
     * @return {[N/A]}
     */
    Text.prototype.text = function(value) {
        return this.object.setText(value);
    };

    /**
     * Change text options/style
     * @param  {[object]} options
     * @return {[N/A]}
     */
    Text.prototype.options = function(options) {
        return this.object.setStyle(options);
    };

    /**
     * Remove from stage
     * @return {[N/A]}
     */
    Text.prototype.remove = function() {
        return H2D_game_container.removeChild(this.object);
    };