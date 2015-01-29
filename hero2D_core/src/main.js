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
    var compiler = require("nw-coffee");

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

    /** Come on, you can't create a game without a window ! */
    //if(!Window.called) { displayError('main.js', 'You need to create the Window with "Window()" method.<br />Example :<br />new Window({title:"My game", width:640, height:480});'); }

    /** Oups, play function is not called ! */
    //if(!play.called && !Preloader.called) play(function() {});


var hero2DParser = function(source) {

    this.result = source;

    var perLines = this.result.match(/[^\r\n]+/g);

    var fileLines = '';

    perLines.forEach(function(line) {
        var includeFile = line.match(/@include \"(.*?)\"/ig);
        if(includeFile) {
            var indents = line.match(/([\t])/ig);
            
            if(indents) {

                var numberOfIndents = indents.length;

                /** Ok bon on a la ligne, on a le nombre d'indentations */
                var fileToJoin = includeFile[0].match(/\"(.*?)\"/ig)[0].replace(/"/g, "");
                var content = fs.readFileSync(fileToJoin).toString();

                var filePerLines = content.match(/[^\r\n]+/g);

                filePerLines.forEach(function(l) {
                    var newIndent = '';
                    for(var i = 0; i < numberOfIndents; i++)
                        newIndent += indents[i];

                    fileLines += newIndent + l + "\n";
                });                

               // console.log(content);

            }
            fileLines = fileLines.replace(includeFile[0], '');
        } else {
            fileLines += line + "\n";
        }

    });

    this.result = fileLines;

    return this.result;

};


// executes `pwd`
child = exec("node node_modules/coffee-stir/bin/Main.js src/game.coffee", function (error, stdout, stderr) {
  var content = stdout;

  var parsedContent = hero2DParser(content);

  var render = coffee.compile(parsedContent);

  eval.apply(global, [render]);
});