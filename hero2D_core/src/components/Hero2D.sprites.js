/*!
 *
 * File: Hero2D.sprites.js
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
     * Load a sprite
     * @param  {[string or object]} path/texture
     * @return {[object]}
     */
    function sprite(path) {
        if(typeof path == "object") {
            var texture = path;
        } else { 
            var texture = PIXI.Texture.fromImage(path);
        }
        var object = new PIXI.Sprite(texture);

        object.position.x = 0;
        object.position.y = 0;

        return object;
    }

    /**
     * Load a new texture
     * @param  {[string]} source
     * @return {[object]}
     */
    function texture(source) {
        return PIXI.Texture.fromImage(source);
    }

    /**
     * Create a new texture frame
     * @param  {[object]} options
     * @return {[object]}
     */
    function frame(options) {
        var position = new PIXI.Rectangle(options.x, options.y, options.width, options.height);
        var frame = new PIXI.Texture(options.texture.baseTexture, position);
        return frame;
    }

    /**
     * Get or set sprite position
     * @param  {[string]} source
     * @param  {[string]} type
     * @param  {[integer]} value
     * @return {[integer]}
     */
    function position(source, type, value) {
        if(type == 'x') {
            if(value === 'undefined') value = source.position.x;
            return source.position.x = value;
        } else {
            if(value === 'undefined') value = source.position.y;
            return source.position.y = value;
        }
    }

    /**
     * Display sprite
     * @param  {[object]} options
     * @return {[object]}
     */
    function displaySprite(sprite, x, y) {
        if(typeof x !== "undefined") {
            sprite.position.x = x;
            sprite.position.y = y;
        }
        
        return H2D_game_container.addChild(sprite);
    }

    /**
     * Canvas render
     * @return {[N/A]}
     */
    function render() {
        return H2D_window_renderer.render(H2D_game_stage);
    }

    /**
     * Play loop function
     * @param  {[Function]} callback
     * @return {[loop]}
     */
    function play(callback) {
        play.called = true;
        requestAnimationFrame(looper);
        
        function looper() {
            callback();
            render();
            return requestAnimationFrame(looper);
        }
    }