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

        /** Parameters */
        this.anims = {}; // Registered animations
        this.animType = {}; // Animation or frame ?
        this.usedAnim = null; // Last used anim
        this.isRemoved = false; // Object removed from canvas ?
        this.object; // Main sprite

        /** Sprite creation */
        this.object = new PIXI.Sprite(this.spriteTexture);
        this.object.position.x = 0;
        this.object.position.y = 0;

    }

    /**
     * Add a frame to the sprite
     * @param {[object]} options
     * Ex:
     * player.frame({
     *     name: "static_down",
     *     frame: 35,
     *     width: 32,
     *     height: 32
     * });
     */
    Sprite.prototype.frame = function(options) {

        /** Frame creation */
        this.anims[options.name] = new Frame({
            texture: this.spriteTexture, // We keep the base sprite texture
            frame: options.frame, // Select the frame !
            width: options.width, // Width of the frame
            height: options.height // Height of the frame
        });

        /** Type of frame */
        this.animType[options.name] = "frame";

    };

    /**
     * Animated Sprite creation
     * @param  {[object]} options
     * Ex:
     * player.anim({
     *     name: "walk_down",
     *     frames: [35, 36, 37],
     *     width: 32,
     *     height: 32
     * });
     */
    Sprite.prototype.anim = function(options) {

        /** Frames container */
        var keys = [];

        /** Global var for sprite texture (thanks foreach) */
        var spriteTexture = this.spriteTexture;

        /** So, it's time to create all the frames ! */
        options.frames.forEach(function(el) {
            keys.push(new Frame({
                texture: spriteTexture, // Same sprite texture
                frame: el, // Actual key
                width: options.width, // Frame width
                height: options.height // Frame height
            }));
        });

        /** Okay, now we need to create our animation ! */
        this.anims[options.name] = new PIXI.MovieClip(keys);
        this.anims[options.name].animationSpeed = ("speed" in options) ? options.speed: 0.1;
        this.anims[options.name].currentFrame = 0;
        this.anims[options.name].position.x = 0;
        this.anims[options.name].position.y = 0;

        /** Hide this animation */
        this.anims[options.name].stop();
        this.anims[options.name].visible = false;
        displaySprite(this.anims[options.name], this.anims[options.name].position.x, this.anims[options.name].position.y);

        /** This is an animation ! */
        this.animType[options.name] = "anim";

    };

    /**
     * Launch sprite animation !
     * @param  {[string]} anim [description]
     */
    Sprite.prototype.animate = function(anim) {

        /** Change the actual used animation */
        this.usedAnim = anim;

        /** Hey buddy, please keep the same position than the original sprite */
        this.anims[anim].position.x = this.object.position.x;
        this.anims[anim].position.y = this.object.position.y;

        /** Okay, ready to play ! */
        this.anims[anim].visible = true;
        this.anims[anim].play();

    };

    /**
     * Play a frame or an animation
     * @param  {[string]} anim
     * Ex:
     *     player.play('walk_down');
     */
    Sprite.prototype.play = function(anim) {

        /** Someone is asking a simple frame ! */
        if(this.animType[anim] == "frame") {

            /** Okay wait, we found an used animation, stop this one */
            if(this.usedAnim) {
                this.anims[this.usedAnim].visible = false;
                this.anims[this.usedAnim].stop();
                this.usedAnim = null; // Reset the last used animation !
            }

            /** Display the new frame ! */
            this.object.visible = true;
            this.object.setTexture(this.anims[anim]); // Change sprite texture

        } 
        else { /** Damn wait, it's an animation ! */

            /** Okay we need to stop the last animation */
            if(this.usedAnim) {
                this.anims[this.usedAnim].visible = false;
                this.anims[this.usedAnim].stop();
            }

            /** Hide the default sprite and launch the animation ! */
            this.object.visible = false;
            if(!this.isRemoved) this.animate(anim);

        }

    }

    /**
     * Get the X position of the sprite
     * @param  {[integer]} value
     * @return {[integer or N/A]}
     * Ex:
     *     player.x();
     *     OR
     *     player.x(15);
     */
    Sprite.prototype.x = function(value) {

        if(typeof value === "undefined") {
            return this.object.position.x; // Return the sprite position
        } else {
            // Value is not empty, so we need to change the X position !
            if(this.usedAnim) this.anims[this.usedAnim].position.x = value;
            this.object.position.x = value;
        }

    };

    /**
     * Get the Y position of the sprite
     * @param  {[integer]} value
     * @return {[integer or N/A]}
     * Ex: Same than player.x() method
     */
    Sprite.prototype.y = function(value) {

        if(typeof value === "undefined") {
            return this.object.position.y; // Return the sprite position
        } else {
            // Value is not empty, change the Y position
            if(this.usedAnim) this.anims[this.usedAnim].position.y = value;
            this.object.position.y = value;
        }

    };

    /**
     * Display the sprite on canvas
     * @param  {[integer]} x
     * @param  {[integer]} y
     * @return {[object]}
     */
    Sprite.prototype.display = function(x, y) {

        // It's not removed !
        this.isRemoved = false;

        // Update global sprite position
        if(typeof x !== 'undefined' && typeof y !== 'undefined') {
            this.object.position.x = x;
            this.object.position.y = y;

            // An animation is used, update her position then !
            if(this.usedAnim) {
                this.anims[this.usedAnim].position.x = x;
                this.anims[this.usedAnim].position.y = y;
            }
        }

        /** Add the sprite to the canvas */
        return displaySprite(this.object, this.object.position.x, this.object.position.y);

    };

    /**
     * Remove sprite from canvas
     */
    Sprite.prototype.remove = function() {
        this.isRemoved = true;
        H2D_game_container.removeChild(this.anims[this.usedAnim]);
        H2D_game_container.removeChild(this.object);
    }

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

        /** We need a specific frame ! */
        if("frame" in options) {

            /** Picture size (width & height) */
            var size = getPictureSize(options.texture.baseTexture.imageUrl);
            var texture_width = size.width;
            var texture_height = size.height;

            /** Total number of frames */
            var frames = (texture_height / options.height) * (texture_width / options.width);

            /** Frames by line in the tileset */
            var framesPerLine = texture_width / options.width;

            /** Frame required */
            var stopTo = options.frame;

            /** Frames while */
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

            /** Create the required frame ! */
            var frame = new PIXI.Texture(options.texture.baseTexture, position);

        } else {

            /** Okay give me this frame */
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

        /** If we are on the demo file */
        if(!H2D_fileExists('src/game.js')) {
            return sizeOf('hero2D_core/' + source);
        } else {
            /** Normal game path */
            return sizeOf('src/' + source);
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
     * Remove sprite from stage
     * @param  {[string]} sprite
     * @return {[object]}
     */
    function removeSprite(sprite) {
        return H2D_game_container.removeChild(sprite);
    }