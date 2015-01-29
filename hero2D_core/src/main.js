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
    var sizeOf = require('image-size');
    var cryptJS = require('crypto');

    // Get the current window
    var win = gui.Window.get(); 

    /**
     * File Exists ?
     * @param  {[string]} source
     * @return {[boolean]}
     */
    var H2D_fileExists = function(source) {
        return fs.existsSync(H2D_currentPath + source);
    }

    // Current path
    var H2D_currentPath = path.dirname(process.execPath) + '/';
    if(H2D_fileExists('src/game.js')) {
        H2D_currentPath = path.dirname(process.execPath) + '/src/';
        XMLH2D_currentPath = H2D_currentPath;
        H2D_systemPath = '';
    } else {
        H2D_systemPath = 'hero2D_core/';
        H2D_currentPath = H2D_systemPath + 'src/';
        XMLH2D_currentPath = 'src/';
    }

    /**
     * Include Javascript File
     * @param  {[string]} source
     * @return {[string]}
     */
    var join = function(source) {
        source = H2D_currentPath + source;

        function read(source) {
            return fs.readFileSync(source).toString();
        }

        try {
            eval.apply(global, [read(source)]);
        } catch(err) { // Damn, something is going wrong !
            displayError(source, err);
        }
    };

    var systemJoin = function(source) {
        source = 'hero2D_core/src/' + source;

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
    if(H2D_fileExists('../locales')) {
        fs.rmdirSync(H2D_currentPath + '../locales');
    }

    /**
     * Load External Libraries
     */
    systemJoin('ext/pixi.min.js');

    /** Load Hero2D */
    systemJoin('components/hero2D.js');
    
    /** Join the game to the party ! */
    if(H2D_fileExists('../src/game.js')) {
        join('../src/game.js');
    } else {
        systemJoin('sample/demo.js');
    }

    /** Come on, you can't create a game without a window ! */
    if(!Window.called) { displayError('main.js', 'You need to create the Window with "Window()" method.<br />Example :<br />new Window({title:"My game", width:640, height:480});'); }

    /** Oups, play function is not called ! */
    if(!play.called && !Preloader.called) play(function() {});