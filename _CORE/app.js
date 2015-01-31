/**                     
 *    
 *   _____             ___ ____  
 *  |  |  |___ ___ ___|_  |    \ 
 *  |     | -_|  _| . |  _|  |  |
 *  |__|__|___|_| |___|___|____/ 
 *
 * 
 *  Hero2D Framework
 *  Version : Alpha 0.0.1
 *  Github : https://github.com/RedStarZOn/hero2D
 *  Author : Christophe Corbalan @RedStarZOn
 *  http://www.christophecorbalan.com/
 *
 *	Copyright 2015 Hero2D
 * 	Released under the MIT license
 * 	http://www.opensource.org/licenses/mit-license.php
 *
 *	Date: 2015-01-21
 * 
 */

 	/**
 	 * ==============================================================
     * NodeJS Modules
     * [N/A]
     * ==============================================================
     */
	    var 
	    	fs 			= require('fs'),
	    	path 		= require('path'),
	    	gui 		= require('nw.gui'),
	    	sizeOf 		= require('image-size'),
	    	crypter		= require('crypto'),
	    	exec 		= require('child_process').exec,
	    	coffee 		= require('coffee-script')
	   	;

	/**
 	 * ==============================================================
     * Global variables
     * [Careful with these variables]
     * ==============================================================
     */
    	/**
    	 * Application Folder
    	 * @type {[string]}
    	 */
    	var _CORE = '_CORE/';

    	/**
    	 * Full Path of the application
    	 * @type {[string]}
    	 */
    	var _APP = path.dirname(process.execPath) + '/';

    	/**
    	 * Game Source Code Location
    	 * @type {[string]}
    	 */
    	var _SRC = _APP + 'src/';

    	/**
    	 * Get the current Window (Node-Webkit)
    	 * @type {[object]}
    	 */
    	var _WIN = gui.Window.get();

   	/**
 	 * ==============================================================
     * Primary Functions
     * [Don't change these functions, they are really important]
     * [Note : All application functions have the "H2D_" prefix]
     * ==============================================================
     */
    	/**
    	 * [Join a JS file]
    	 * @param {[string]} location
    	 * [Ex: H2D_join('_components/sprite.component.js')]
    	 */
    	var H2D_join = function(location) {

    		/** Change the location */
    		location = _CORE + location;

    		/** Get file content */
	        function read(location) {
	            return fs.readFileSync(location).toString();
	        }
	            
	        /** Execute JS Code */
	        return eval.apply(global, [read(location)]);

    	};

    	/**
    	 * [Check if file exists]
    	 * @param {[string]} location
    	 * [Ex: if(H2D_fileExists('game.hero'))]
    	 */
    	var H2D_fileExists = function(location) {
    		return fs.existsSync(_SRC + location);
    	};

        /**
         * [Read file]
         * @param {[string]} location
         */
        var H2D_getContent = function(location) {
            return fs.readFileSync(_SRC + location).toString();
        };

    	/**
    	 * [Remove a directory]
    	 * @param {[string]} location
    	 * [Ex: H2D_removeDir('../locales')]
    	 */
    	var H2D_removeDir = function(location) {
    		return fs.rmdirSync(_SRC + location);
    	};

    	/**
    	 * [Show the H2D_notfound Layer]
    	 */
    	var H2D_notFound = function() {
    		return document.querySelector('#not-found').style.display = 'block';
    	};

    	/**
    	 * [Generate & display a new error]
    	 * @param {[string]} title
    	 * @param {[string]} message
    	 * [Ex: H2D_error('main.hero', 'Sprite not found (line 24)')]
    	 */
    	var H2D_error = function(title, message) {
    		document.querySelector('#error-file').innerText = 'File name : ' + title;
    		document.querySelector('#error-message').innerText = 'ERROR : ' + message;
    		return document.querySelector('#error').display = 'block';
    	};

    	var H2D_parse = function(filename, code, indent, partial) {

	        /** Final source code */
	        this.result = code;
	        this.indent = (typeof indent !== "undefined") ? indent : 0;
	        this.partial = (typeof partial !== "undefined") ? true : false; /** There is a partial file ? */

	        /** Actual FULL path */
	        this.fullPath = path.dirname(process.execPath) + '/' + filename.replace(filename.match('[^/]*$'), '');
	        this.fullPath = this.fullPath.replace(path.dirname(process.execPath) + '/' + path.dirname(process.execPath) + '/', path.dirname(process.execPath) + '/');
	        var self = this;

	        /** Get every file lines */
	        var mainLines = this.result.split("\n");

	        /** 
	         * File lines content
	         */
	        var mainLinesContent = new String();

	        /** Start the while */
	        mainLines.forEach(function(line) {

	            /** Try to find include file line  */
	            var includeLine = line.match(/@include (\"|\')(.*?)(\"|\')/ig);

	            /** Try to find a file to include */
	            var anyFile = line.match(/(\"|\')(.*?)(\"|\')/ig);
	            var pattern = /^[\w&.\-]+$/;
	            if(Array.isArray(anyFile)) {
	                anyFile.forEach(function(element) {
	                    var newElement = element.replace(/["']/g, "");
	                    var nameOfTheFile = path.basename(newElement).replace(/["']/g, "");

	                    /** Check if the Path URL is correct */
	                    if(nameOfTheFile && newElement.indexOf(' ') <= -1 && nameOfTheFile.indexOf('.') > -1 && nameOfTheFile.indexOf('.hero') <= -1 && nameOfTheFile.indexOf('.coffee') <= -1) {
	                        /** New Path */
	                        var targetPath = (self.fullPath + newElement).replace(/\\/g, "\\\\");
	                        /** Replace the line */
	                        line = line.replace(newElement, targetPath);
	                    }
	                });
	            }

	            /** Some indents ? */
	            var indentsLine = line.match(/([\t])/ig);
	            var indents = (indentsLine) ? (indentsLine.length + self.indent) : self.indent;

	            /** Damn it's an include file line ! */
	            if(includeLine) {

	                /** File to include with his content & his lines */
	                var joinFile = includeLine[0].match(/(\"|\')(.*?)(\"|\')/ig)[0].replace(/["']/g, "");
                    if(!H2D_fileExists(joinFile)) {
                        return H2D_error(filename, joinFile + ' doesn\'t exists.');
                    }
	                var joinFileContent = fs.readFileSync(this.fullPath + joinFile).toString();
	                var joinFileLines = joinFileContent.split("\n");
	                mainLinesContent += H2D_parse(this.fullPath + joinFile, joinFileContent, indents, true);

	                /** Delete @include line */
	                mainLinesContent = mainLinesContent.replace(joinFile, '');

	            } else { 

	                /** It's not an include file, just add the lines ! */
	                if(self.indent && self.partial) { // Wait it's a partial file
	                    var newIndent = '';
	                    for(var i = 0; i < self.indent; i++) newIndent += "\t";
	                    mainLinesContent += newIndent + line + "\n";
	                } else { // It's the main file
	                    mainLinesContent += line + "\n";
	                }

	            }

	        });

	        /** Reset path ! */
	        this.fullPath = path.dirname(process.execPath) + '/';

	        /** It's not a partial file ! */
	        this.partial = false;

	        /** Update result */
	        this.result = mainLinesContent;

	        try {
	            var preCompile = coffee.compile(this.result);
	        }
	        catch(e) {
	            H2D_error(filename, e.message);
	        }

	        /** Return our beautiful coffee-code */
	        return this.result;

	    };

    	/**
    	 * [Compile coffee script to JS]
    	 */
    	var H2D_compile = function() {

            /** Let's parse the code ! (@include functions) */
            var parsedContent = H2D_parse('src/game.hero', H2D_getContent('game.hero'));

            /** Hope everything will be okay */
            try {
                var render = coffee.compile(parsedContent);
                eval.apply(global, [render]);
            } catch(error) {
                H2D_error('game.hero', error.message);
            }

    	};

    /**
 	 * ==============================================================
     * Delete "locales" folder generated by Node-Webkit
     * [I don't know why this folder is always generated.]
     * ==============================================================
     */
    	if(H2D_fileExists('../locales')) H2D_removeDir('../locales');

   	/**
 	 * ==============================================================
     * Game not found ?
     * [Here, we are checking if the src/game.hero file exists]
     * ==============================================================
     */
    	if(!H2D_fileExists('game.hero')) H2D_notFound();

    /**
 	 * ==============================================================
     * Github Link Page
     * [Open the github project page]
     * ==============================================================
     */
    	document.querySelector('#github-button').addEventListener("click", function(e) {
    		gui.Shell.openExternal('https://github.com/RedStarZOn/hero2D');
			return false;
		}, false);

	/**
 	 * ==============================================================
     * Include PixiJS, one of the best little things in this world.
     * [This file is the original code from http://www.pixijs.com/]
     * [File version : 2.2.3]
     * [Copyright (c) 2012-2014, Mat Groves]
     * ==============================================================
     */
    	H2D_join('_ext/pixi.min.js');

   	/**
 	 * ==============================================================
     * Hero2D Components
     * [Hero2D classes/components, the call order is important !]
     * [
     * 	Note:
     * 	You can easily extend a component with Coffeescript
     * 	like this :
     * 		Sprite::collision = ->
     * 			# Your code here
     * 	Javascript Translation :
     * 		Sprite.prototype.collision = function() {
     * 			// Your code here
     * 		}
     * ]
     * ==============================================================
     */
    	H2D_join('_components/misc.component.js');
	    H2D_join('_components/sound.component.js');
	    H2D_join('_components/preloader.component.js');
	    H2D_join('_components/keyboard.component.js');
	    H2D_join('_components/window.component.js');
	    H2D_join('_components/sprite.component.js');
	    H2D_join('_components/files.component.js');
	    H2D_join('_components/text.component.js');

	/**
 	 * ==============================================================
     * Launch the game !
     * [If the game is found, compile & launch src/game.hero]
     * ==============================================================
     */
     	if(H2D_fileExists('game.hero')) H2D_compile();