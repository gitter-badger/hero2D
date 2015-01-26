/*!
 *
 * File: Hero2D.window.js
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
     * Default window settings
     */
    var H2D_game_width = 640;
    var H2D_game_height = 480;
    var H2D_window_width = 640;
    var H2D_window_height = 480;
    var H2D_window_scale = false;
    var H2D_window_renderer;

    /**
     * Default stage settings
     */
    var H2D_game_stage;
    var H2D_game_container; // Default container (sprites, etc)

    // Come on buddy Pixi, stop with your blur, this is so uggly.
    PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;

    function windowSettings(options) {
        if('width' in options && 'height' in options) {
            if('scale' in options && options.scale) {
                options.width = options.width * 2;
                options.height = options.height * 2;
                H2D_window_scale = true;
            }
            if(typeof H2D_window_renderer != 'object') {
                H2D_window_renderer = new PIXI.WebGLRenderer(options.width, options.height);
                document.body.appendChild(H2D_window_renderer.view);
            }
            H2D_window_renderer.resize(options.width, options.height);
            win.resizeTo(options.width, options.height);
        }
        if('title' in options) { document.title = options.title; }

        /** Create the level */
        createLevel();

        return H2D_window_renderer;
    }

    /**
     * Default window settings
     * @type {object}
     */
    windowSettings({
        width: H2D_game_width,
        height: H2D_game_height,
        winWidth: H2D_window_width,
        winHeight: H2D_window_height
    });

    /**
     * Create the canvas stage
     * @return {[object]}
     */
    function createLevel() {
        H2D_game_stage = new PIXI.Stage;
        H2D_game_container = (H2D_window_scale) ? new PIXI.DisplayObjectContainer() : H2D_game_stage;
        if(H2D_window_scale) { 
            H2D_game_container.scale.x = H2D_game_container.scale.y = 2;
            H2D_game_stage.addChild(H2D_game_container);
        }
        return H2D_game_stage;
    }