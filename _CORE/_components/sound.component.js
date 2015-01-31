/*!
 *
 * File: sound.component.js
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

 	/** Audio Context */
	var H2D_audioContext = new AudioContext();

	/**
	 * Create the Sound Object
	 * @param {[string or object]}
	 */
    function Sound(source) {

        console.log(source);

    	/** Audio Object & Volume */
    	this.object = source;
    	this.volume = 1;

    	/** Wait wait, it's not an object ! */
    	if(typeof source !== "object") {
    		this.object = new Audio(source); // Create the audio object
    	}

    };

    /**
     * Play the sound
     * @return {[N/A]}
     */
    Sound.prototype.play = function() {
    	return this.object.play();
    };

    /**
     * Pause the sound
     * @return {[N/A]}
     */
    Sound.prototype.pause = function() {
    	return this.object.pause();
    };

    /**
     * Stop the sound (restart)
     * @return {[N/A]}
     */
    Sound.prototype.stop = function() {
    	this.object.pause();
    	return this.object.currentTime = 0;
    };

    /**
     * Enable or disable Loop
     * @param  {[integer]} value
     * @return {[N/A]}
     */
    Sound.prototype.loop = function(value) {
    	if(typeof value === "undefined") value = true;
    	return this.object.loop = value;
    };

    /**
     * Sound volume
     * @param  {[integer]} value
     * @return {[N/A]}
     */
    Sound.prototype.volume = function(value) {
    	if(typeof value === "undefined") {
    		return this.object.volume * 100;
    	}
    	this.volume = value; // Change the new volume !
    	return this.object.volume = value / 100;
    };

    /**
     * Sound is finished ?
     * @return {[boolean]}
     */
    Sound.prototype.end = function() {
    	return this.object.ended;
    };

    /**
     * Sound is paused ?
     * @return {[boolean]}
     */
    Sound.prototype.paused = function() {
    	return this.object.paused;
    };

    /**
     * Mute sound
     * @return {[N/A]}
     */
    Sound.prototype.mute = function() {
    	return this.object.volume = 0;
    };

    /**
     * Unmute sound
     * @return {[N/A]}
     */
    Sound.prototype.unMute = function() {
    	return this.object.volume = this.volume;
    };

    /**
     * Sound duration (Seconds)
     * @return {[integer]}
     */
    Sound.prototype.duration = function() {
    	return this.object.duration;
    };

    /**
     * Sound current time in seconds
     * @return {[integer]}
     */
    Sound.prototype.currentTime = function() {
    	return this.object.currentTime;
    };