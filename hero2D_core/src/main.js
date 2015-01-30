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
    function Hero2DParser(code, indent, partial) {

        /** Final source code */
        this.result = code;
        this.indent = (typeof indent !== "undefined") ? indent : 0;
        this.partial = (typeof partial !== "undefined") ? true : false;
        var self = this;

        /** Get every file lines */
        var mainLines = this.result.split("\n");

        /** 
         * File lines content
         * Can't explain the "s" missing character
         */
        var mainLinesContent = new String('#[s]toDelete' + "\n");

        /** Start the while */
        mainLines.forEach(function(line) {

            /** Try to find include file line  */
            var includeLine = line.match(/@include \"(.*?)\"/ig);

            /** Some indents ? */
            var indentsLine = line.match(/([\t])/ig);
            var indents = (indentsLine) ? (indentsLine.length + self.indent) : self.indent;

            /** Damn it's an include file line ! */
            if(includeLine) {

                /** File to include with his content & his lines */
                var joinFile = includeLine[0].match(/\"(.*?)\"/ig)[0].replace(/"/g, "");
                var joinFileContent = fs.readFileSync(joinFile).toString();
                var joinFileLines = joinFileContent.split("\n");
                mainLinesContent += Hero2DParser(joinFileContent, indents, true);

                /** Delete @include line */
                mainLinesContent = mainLinesContent.replace(joinFile[0], '');

            } else { 
                if(self.indent && self.partial) {
                    var newIndent = '';
                    for(var i = 0; i < self.indent; i++) newIndent += "\t";
                    mainLinesContent += newIndent + line + "\n";
                } else {
                    mainLinesContent += line + "\n";
                }
            }

        });

        // Remove characters deleter system
        mainLinesContent = mainLinesContent.replace('#[s]toDelete' + "\n", '');
        mainLinesContent = mainLinesContent.replace('#[]toDelete' + "\n", '');

        /** It's not a partial file ! */
        this.partial = false;

        this.result = mainLinesContent;

        return this.result;

    };


// executes `pwd`
child = exec("node node_modules/coffee-stir/bin/Main.js src/game.coffee", function (error, stdout, stderr) {
  var content = stdout;

  var parsedContent = Hero2DParser(content);

  console.log(parsedContent);

  var render = coffee.compile(parsedContent);

  eval.apply(global, [render]);
});