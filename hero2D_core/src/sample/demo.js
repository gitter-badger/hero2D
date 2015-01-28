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

    var preload = new Preloader({
        mapTileset: 'src/sprites/tileset.png',
        playerSprite: 'src/sprites/characters.png',
        logo: 'logo.png',
        music: 'src/sounds/theme.mp3'
    });

    preload.progress(function() {});

    preload.done(function() {

        /** Create sound object */
        var music = new Sound(preload.$('music'));

        music.play();
        music.loop();

        /** Map management */
        join('src/sample/demo.map.js');

        /** Player management */
        join('src/sample/demo.player.js');

        var logo = new Sprite(preload.$('logo'));
        logo.display(65, 0);

        var direction = 'down';

        var example = new Text('Hey !');
        example.display(30, 150);

        var welcome = new Text('Welcome to Hero2D ! For make a new game, create the src/main.js file. Enjoy !', {font: '11px Trebuchet MS', fill: 'white', stroke: 'gray', strokeThickness: 2, wordWrap: true, wordWrapWidth: 185, align: 'center'});

        var fps = new Text('', {font: '11px Trebuchet MS', fill: 'white', stroke: 'gray', strokeThickness: 2});

        fps.display(10, 10);
        welcome.display(70, 70);

        play(function() {

            fps.text('FPS : ' + getFps());

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
    });