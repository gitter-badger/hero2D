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

    /** Sprite constructor */
    function Sprite(source) {

        /**
         * Is a texture object or an url ?
         */
        if(typeof source == "object") {
            this.spriteTexture = source;
        } else { 
            this.spriteTexture = new Texture(source);
        }

        /**
         * Parameters
         */
        this.anims = {};
        this.animType = {};
        this.usedAnim = null;
        this.object = new PIXI.Sprite(this.spriteTexture);
        this.object.position.x = 0;
        this.object.position.y = 0;

    }

    Sprite.prototype.addFrame = function(options) {
        this.anims[options.name] = new Frame({
            texture: this.spriteTexture,
            frame: options.frame,
            width: options.width,
            height: options.height
        });
        this.animType[options.name] = "frame";
    };

    Sprite.prototype.addAnim = function(options) {
        var keys = [];
        var spriteTexture = this.spriteTexture;

        options.frames.forEach(function(el) {
            keys.push(new Frame({
                texture: spriteTexture,
                frame: el,
                width: options.width,
                height: options.height
            }));
        });
        this.anims[options.name] = new PIXI.MovieClip(keys);
        this.anims[options.name].animationSpeed = 0.1;
        this.anims[options.name].currentFrame = 0;
        this.anims[options.name].position.x = 0;
        this.anims[options.name].position.y = 0;
        this.anims[options.name].play();
        this.anims[options.name].visible = false;

        this.animType[options.name] = "anim";
    };

    Sprite.prototype.animate = function(anim) {
        if(this.usedAnim) this.anims[this.usedAnim].visible = false;
        this.usedAnim = anim;
        this.anims[anim].position.x = this.object.position.x;
        this.anims[anim].position.y = this.object.position.y;
        this.anims[anim].visible = true;
    };

    Sprite.prototype.play = function(anim) {
        // It's a simple sprite
        if(this.animType[anim] == "frame") {
            if(this.usedAnim) {
                this.anims[this.usedAnim].visible = false;
                this.usedAnim = null;
            }
            this.object.visible = true;
            this.object.setTexture(this.anims[anim]);
        } else { // It's an animation
            this.object.visible = false;
            this.animate(anim);
        }
    }

    Sprite.prototype.x = function(value) {
        if(typeof value === "undefined") {
            return this.object.position.x;
        } else {
            if(this.usedAnim) this.anims[this.usedAnim].position.x = value;
            this.object.position.x = value;
        }
    };

    Sprite.prototype.y = function(value) {
        if(typeof value === "undefined") {
            return this.object.position.y;
        } else {
            if(this.usedAnim) this.anims[this.usedAnim].position.y = value;
            this.object.position.y = value;
        }
    };

    Sprite.prototype.display = function(x, y) {

        // Update position
        this.object.position.x = x;
        this.object.position.y = y;

        // Display all animations
        for(var key in this.anims) {
            if(this.animType[key] == "anim") displaySprite(this.anims[key], x, y);
        }

        displaySprite(this.object, x, y);
    };

    /**
     * Load a new texture
     * @param  {[string]} source
     * @return {[object]}
     */
    function Texture(source) {
        return PIXI.Texture.fromImage(source);
    }

    /**
     * Create a new texture frame
     * @param  {[object]} options
     * @return {[object]}
     */
    function Frame(options) {
        if("frame" in options) { // Need a specific frame
            var size = getPictureSize(options.texture.baseTexture.imageUrl);
            var texture_width = size.width;
            var texture_height = size.height;
            var frames = (texture_height / options.height) * (texture_width / options.width);
            var framesPerLine = texture_width / options.width;
            var stopTo = options.frame;
            var item = -1;
            var line = 0;
            for(var i = 0; i < frames; i++) {
                if(item <= framesPerLine) { item++; }
                if(item >= framesPerLine) { item = 0; line++; }
                if(i == stopTo) {
                    // I want this frame !
                    var position = new PIXI.Rectangle(item * options.width, line * options.height, options.width, options.height);
                }
            }
            var frame = new PIXI.Texture(options.texture.baseTexture, position);
        } else {
            var position = new PIXI.Rectangle(options.x, options.y, options.width, options.height);
            var frame = new PIXI.Texture(options.texture.baseTexture, position);
        }
        return frame;
    }

    /**
     * Get actual picture size (width & height)
     * @param  {[sintrg]} source
     * @return {[object]}
     */
    function getPictureSize(source) {
        if(!fileExists('src/game.js')) {
            return sizeOf('hero2D_core/' + source);
        } else {
            return sizeOf(source);
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