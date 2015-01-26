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
    /** Window parameters */
    windowSettings({
        title: "Welcome to Hero2D !",
        width: 320,
        height: 240,
        scale: true
    });

    /** Call the tileset */
    var texture = new texture("src/sprites/tileset.png");

    /** Tileset & Tiles properties */
    var tileset_width = tileset_height = 512;
    var tile_width = tile_height = 16;
    var tiles = [];

    function getTiles() {
        for (var i = 0; i < tileset_height / tile_height; i++) {
            for (var j = 0; j < tileset_width / tile_width; j++) {
                var tile = new frame({
                    texture: texture,
                    x: j * tile_width,
                    y: i * tile_height,
                    width: tile_width,
                    height: tile_height
                });
                tiles.push(tile);
            }
        }
        return tiles;
    }

    function generateMap(options) {
        getTiles();
        var out = [];
        for (var y = 0; y < options.height; y++) {
            out.push([]);
     
            for (var x = 0; x < options.width; x++) {
                out[y].push([]);
     
                // out[y][x].push(options.tileNumber);
                out[y][x].push(Math.floor((Math.random() * 2) + 0));
            }
        }
        return out;
    }

    var tile1 = new frame({
        texture: texture,
        x: 0,
        y: 0,
        width: tile_width,
        height: tile_height
    });

    var map = generateMap({
        width: 50,
        height: 50
    });

    // Affichage tiles
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            var tile = new sprite(tiles[map[y][x]]);
            displaySprite(tile, x * tile_width, y * tile_height);
        }
    }

    /** Create the player sprite */
    var player = new sprite("src/sprites/bunny.png");
    displaySprite(player);

    play(function() {
        if(press('up')) {
            player.position.y -= 2;
        }
        if(press('down')) {
            player.position.y += 2;
        }
        if(press('left')) {
            player.position.x -= 2;
        }
        if(press('right')) {
            player.position.x += 2;
        }

        if(press('right') && press('left')) {
            console.info('yolo');
        }
    });