	/**
	 * NodeJS Modules
	 */
	var fs = require('fs');

 	/**
 	 * Include Javascript File
 	 * @param  {String}
 	 * @return {Javascript}
 	 */
 	var join = function(source) {

 		function read(source) {
			return fs.readFileSync(source).toString();
		}

		return eval.apply(global, [read(source)]);

 	};

 	join('bin/ext/pixi.min.js');

    function createWindow(width, height) {
    	var renderer = new PIXI.WebGLRenderer(width, height)
    	document.body.appendChild(renderer.view);
    	return renderer;
    }

    var renderer = createWindow(640, 480);

    function level() {
    	return new PIXI.Stage;
    }

    function loadSprite(path, x, y) {
    	var texture = PIXI.Texture.fromImage(path);
    	var object = new PIXI.Sprite(texture);

    	if(typeof x === "undefined" && typeof y === "undefined") {
    		x = 0;
    		y = 0;
    	}

    	object.position.x = x;
    	object.position.y = y;

    	return object;
    }

    function position(source, type, value) {
    	if(type == 'x') {
    		return source.position.x = value;
    	} else {
    		return source.position.y = value;
    	}
    }

    var stage = new level();

    function displaySprite(sprite) {
    	return stage.addChild(sprite);
    }

    function render() {
    	return renderer.render(stage);
    }

    function play(callback) {
    	requestAnimationFrame(looper);
    	
    	function looper() {
    		callback();
    		render();
    		return requestAnimationFrame(looper);
    	}
    }





    var bunny = loadSprite("../sprites/bunny.png", 250, 250);
    displaySprite(bunny);

    play(function() {
        bunny.rotation += 0.1;
    });