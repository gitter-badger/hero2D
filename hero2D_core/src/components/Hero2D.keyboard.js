/*!
 *
 * File: Hero2D.keyboard.js
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

    /**
     * Pressed keys
     */
    var H2D_keyboard = {

            /** Keys codes */
            '38': 'up',
            '40': 'down',
            '37': 'left',
            '39': 'right',

            /** Keys names */
            up: false,
            down: false,
            left: false,
            right: false

        };

    /**
     * Init keyboard
     * @return {[object]}
     */
    function resetKey(e) {
        H2D_keyboard[H2D_keyboard[e.keyCode]] = false;
        return H2D_keyboard;
    }

    /**
     * Target pressed keys
     * @param  {[object]} e
     * @return {[N/A]}
     */
    function keyDown(e) {
        e = e || window.event;
        H2D_keyboard[H2D_keyboard[e.keyCode]] = true;
        return e;
    }


    /** Window listeners */
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', resetKey);

    /**
     * This key is pressed ?
     * @param  {[string]} key
     * @return {[boolean]}
     */
    function press(key) {
        return H2D_keyboard[key];
    }