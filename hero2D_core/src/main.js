/*!
 *   _   _                 _____  _____ 
 *  | | | |               / __  \|  _  \
 *  | |_| | ___ _ __ ___  `' / /'| | | |
 *  |  _  |/ _ \ '__/ _ \   / /  | | | |
 *  | | | |  __/ | | (_) |./ /___| |/ / 
 *  \_| |_/\___|_|  \___/ \_____/|___/                                    
 * 
 * Hero2D Framework
 * Version : 0.0.1
 * Author : Christophe Corbalan @RedStarZOn
 * http://www.christophecorbalan.com/
 *
 * Copyright 2015 Hero2D
 * Released under the MIT license
 *
 * Date: 2015-01-25
 */ 

    /**
     * NodeJS Modules
     */
    var fs = require('fs');
    var path = require('path');
    var gui = require('nw.gui');

    // Get the current window
    var win = gui.Window.get(); 

    /**
     * Include Javascript File
     * @param  {[string]} source
     * @return {[string]}
     */
    var join = function(source) {

        function read(source) {
            return fs.readFileSync(source).toString();
        }

        try {
            eval.apply(global, [read(source)]);
        } catch(err) { // Damn, something is going wrong !
            displayError(source, err);
        }

    };

    /**
     * File Exists ?
     * @param  {[string]} source
     * @return {[boolean]}
     */
    var fileExists = function(source) {
        return fs.existsSync(source);
    }

    /**
     * Display a new error
     * @param  {[string]} err
     * @return {[N/A]}
     */
    var displayError = function(source, err) {
        document.getElementById('hero2D-error-modal').style.display = 'block';
        document.getElementById('file').innerHTML = source;
        document.getElementById('message').innerHTML = err;
        document.querySelector('canvas').style.display = 'none';
    }

    /** Remove this useless "locales" folder */
    if(fileExists('locales')) {
        fs.rmdirSync('locales');
    }

    /**
     * Load External Libraries
     */
    join('hero2D_core/src/ext/pixi.min.js');

    /** Load Hero2D */
    join('hero2D_core/src/components/hero2D.js');

    /** Default game or not ? */
    var mainFile = (fileExists('src/game.js')) ? 'src/game.js' : 'hero2D_core/src/sample/demo.js';
    
    /** Join the game to the party ! */
    join(mainFile);

    /** Oups, play function is not called ! */
    if(!play.called) {
        play(function() {});
    }