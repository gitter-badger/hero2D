	
	/*!
	 *	 _   _                 _____  _____ 
	 *	| | | |               / __  \|  _  \
	 *	| |_| | ___ _ __ ___  `' / /'| | | |
	 *	|  _  |/ _ \ '__/ _ \   / /  | | | |
	 *	| | | |  __/ | | (_) |./ /___| |/ / 
	 *	\_| |_/\___|_|  \___/ \_____/|___/                                    
	 * 
	 * BUILD FILE
	 *
	 * Copyright 2015 HeroJS
	 * Released under the MIT license
	 *
	 * Date: 2015-01-22
	 */
	
	var fs=require("fs"),cryptol=require("crypto"),algorithm="aes-256-ctr",hash="(:?hMpLos).?/_HK";function encrypt(a){var b=cryptol.createCipher(algorithm,hash);a=b.update(a,"utf8","hex");return a+=b["final"]("hex")}function decrypt(a){var b=cryptol.createDecipher(algorithm,hash);a=b.update(a,"hex","utf8");return a+=b["final"]("utf8")}function cryptFile(a,b){var c=fs.readFileSync(a,"utf8");return fs.writeFile(b,encrypt(c))}var join=function(a){return eval.apply(global,[decrypt(fs.readFileSync(a).toString())])};

	/**
	 * Available commands :
	 * - cryptFile(source, destination)
	 * - encrypt(string)
	 * - decrypt(string)
	 * - join(crypted_source_file)
	 */

	// cryptFile('src/app/helpers/crypt.js', 'src/app/helpers/crypt.data');
	join('src/app/main.data');