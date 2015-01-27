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
    new Window({
        title: "Welcome to Hero2D !",
        width: 640,
        height: 480,
        scale: true
    });

    /** Create the player sprite */
    var player = new Sprite("src/sprites/characters.png");

    player.anim({
        name: 'walk_up',
        frames: [36, 38, 64],
        width: 32,
        height: 32
    });

    player.anim({
        name: 'walk_down',
        frames: [47, 56, 65],
        width: 32,
        height: 32
    });

    player.anim({
        name: 'walk_left',
        frames: [45, 54, 63],
        width: 32,
        height: 32
    });

    player.anim({
        name: 'walk_right',
        frames: [37, 46, 55],
        width: 32,
        height: 32
    });

    player.frame({
        name: 'static_up',
        frame: 36,
        width: 32,
        height: 32
    });

    player.frame({
        name: 'static_down',
        frame: 47,
        width: 32,
        height: 32
    });

    player.frame({
        name: 'static_left',
        frame: 54,
        width: 32,
        height: 32
    });

    player.frame({
        name: 'static_right',
        frame: 37,
        width: 32,
        height: 32
    });
    
    player.play('walk_down');
    player.display((320 / 2) - (32 / 2), (240 / 2) - (32 / 2) + 30);

    //displaySprite(player, x, y);

    var direction = 'down';

    play(function() {

        if(press('up')) {
            direction = 'up';
            player.play('walk_up');
            player.y(player.y() - 1.5);
        }
        if(press('down')) {
            direction = 'down';
            player.play('walk_down');
            player.y(player.y() + 1.5);
        }
        if(press('left')) {
            direction = 'left';
            player.play('walk_left');
            player.x(player.x() - 1.5);
        }
        if(press('right')) {
            direction = 'right';
            player.play('walk_right');
            player.x(player.x() + 1.5);
        }

        /** Diagonal movements */
        if(press('right') && press('up')) player.play('walk_up');
        if(press('left') && press('up')) player.play('walk_up');
        if(press('right') && press('down')) player.play('walk_down');
        if(press('left') && press('down')) player.play('walk_down');

        //if(!press()) player.play('static_' + direction);

    });