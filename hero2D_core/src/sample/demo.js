/*!
 *
 * File: demo.js
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

    windowSettings({
        title: "My game",
        width: 320,
        height: 240,
        scale: true
    });

    var bunny = loadSprite("src/sprites/bunny.png", 20, 20);
    displaySprite(bunny);

    play(function() {});