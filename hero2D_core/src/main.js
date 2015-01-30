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
    var exec = require('child_process').exec;
    var coffee = require('coffee-script');

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
    if(H2D_fileExists('src/game.coffee')) {
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

    var specialJoin = function(source) {
        compiler("./src/" + source);
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
    if(H2D_fileExists('../src/game.coffee')) {
        //join('../src/game.hero');
        //compiler("./src/game.coffee");
        var content = fs.readFileSync('src/game.coffee').toString();
        //console.log(coffee.compile(content));
    } else {
        systemJoin('sample/demo.js');
    }

    /**
     * Hero2D CoffeeScript Parser
     * @param {[string]} code
     */
    function Hero2DParser(filename, code, indent, partial) {

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
                var joinFileContent = fs.readFileSync(this.fullPath + joinFile).toString();
                var joinFileLines = joinFileContent.split("\n");
                mainLinesContent += Hero2DParser(this.fullPath + joinFile, joinFileContent, indents, true);

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
            coffee.compile(this.result);
        }
        catch(e) {
            displayError(filename, e.message);
        }

        /** Return our beautiful coffee-code */
        return this.result;

    };


// executes `pwd`
child = exec("node node_modules/coffee-stir/bin/Main.js src/game.coffee", function (error, stdout, stderr) {

  var content = stdout;

  var parsedContent = Hero2DParser('src/game.coffee', content);

  console.log(parsedContent);

  var render = coffee.compile(parsedContent);

  eval.apply(global, [render]);
});