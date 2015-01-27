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

    var preload = new Preloader(['src/sprites/tileset.png', 'src/sprites/characters.png']);

    preload.progress(function(percent) {
        alert(percent);
    });

    preload.done(function() {

    });

    /** Window management */
    join('src/sample/demo.window.js');

    /** Map management */
    join('src/sample/demo.map.js');

    /** Player management */
    join('src/sample/demo.player.js');

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

        if(!press()) {
            player.play('static_' + direction);
        }

    });