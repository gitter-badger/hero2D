    
    /** Create the player sprite */
    var playerTexture = new Texture(preload.$('playerSprite'));
    var playerFrame = new Frame({
        texture: playerTexture,
        frame: 38,
        width: 32,
        height: 32
    });
    console.log('test');
    var player = new Sprite(playerFrame);

    /**
     * Player Animations
     */
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

    /**
     * Player Static Frames
     */
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
    
    /**
     * Default animation
     */
    player.display((320 / 2) - (32 / 2), (240 / 2) - (32 / 2) + 30);