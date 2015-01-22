/*!
 * Crypt.js
 * Location : helpers/crypt.js
 * Author : Christophe Corbalan @RedStarZOn
 * http://www.christophecorbalan.com/
 *
 * Copyright 2015 HeroJS
 * Released under the MIT license
 *
 * Date: 2015-01-21
 */

	/**
	 * Encrypt data
	 * @param  {String}
	 * @return {Crypted Data}
	 */
	Hero2D.encrypt = function(string) {
		var cipher = Hero2D.module.crypto.createCipher(Hero2D.data.algorithm, Hero2D.data.hash);
		var crypted = cipher.update(string, 'utf8', 'hex');
		crypted += cipher.final('hex');
		return crypted;
	}

	/**
	 * Decrypt Data
	 * @param  {Crypted Data}
	 * @return {String}
	 */
	Hero2D.decrypt = function(string) {
		var decipher = Hero2D.module.crypto.createDecipher(Hero2D.data.algorithm, Hero2D.data.hash);
		var dec = decipher.update(string, 'hex', 'utf8');
		dec += decipher.final('utf8');
		return dec;
	}