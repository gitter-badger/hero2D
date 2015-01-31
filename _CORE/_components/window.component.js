/*!
 *
 * File: window.component.js
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
     * Global Window renderer
     */
    var H2D_window_renderer;

    /**
     * Default stage settings
     */
    var H2D_game_stage;
    var H2D_game_container; // Default container (sprites, etc)
    var H2D_window_scale;

    /** Come on buddy Pixi, stop with your blur, this is so uggly. */
    PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;

    /**
     * Window creation
     * @param {[object]} options
     * Ex:
     *     new Window({
     *         title: "My game",
     *         width: 320,
     *         height: 240,
     *         scale: true
     *     });
     */
    function Window(options) {

        /** Window is now called ! */
        Window.called = true;

        /** Okay someone is asking for change window size */
        if('width' in options && 'height' in options) {

            /** Okay, go go go Scale mode ! */
            if('scale' in options && options.scale) {
                H2D_window_scale = true;
            }

            /** Window is not created yet */
            if(typeof H2D_window_renderer != 'object') {
                H2D_window_renderer = new PIXI.WebGLRenderer(options.width, options.height);
                document.body.appendChild(H2D_window_renderer.view);
            }

            /** Resize the canvas & the window */
            H2D_window_renderer.resize(options.width, options.height);
            _WIN.resizeTo(options.width, options.height + 29);
        }

        /** Change the application title please ! */
        if('title' in options) { document.title = options.title; }

        /** Create the level */
        createLevel();

    }

    /**
     * Create the canvas stage
     * @return {[object]}
     */
    function createLevel() {

        /** Assign H2D_game_stage to the global stage */
        H2D_game_stage = new PIXI.Stage;

        /** Create the global container */
        H2D_game_container = (H2D_window_scale) ? new PIXI.DisplayObjectContainer() : H2D_game_stage;

        /** Asking for scale, let's go ! */
        if(H2D_window_scale) { 
            H2D_game_container.scale.x = H2D_game_container.scale.y = 2;
            H2D_game_stage.addChild(H2D_game_container);
        }

        /** Return the game stage */
        return H2D_game_stage;

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

        /** Now, play() is called ! */
        play.called = true;
        requestAnimationFrame(looper);
        
        /** Create the loop */
        function looper() {
            try {
                callback();
            } catch(error) {
                H2D_error('Play()', error.message);
            }
            render();
            return requestAnimationFrame(looper);
        }

    }