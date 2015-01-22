	
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
	
	//var fs=require("fs"),cryptol=require("crypto"),o="aes-256-ctr",n="(:?hMpLos).?/_HK";function ab(a){var b=cryptol.createCipher(o,n);a=b.update(a,"utf8","hex");return a+=b["final"]("hex")}function bb(a){var b=cryptol.createDecipher(o,n);a=b.update(a,"hex","utf8");return a+=b["final"]("utf8")}function cryptFile(a,b){var c=fs.readFileSync(a,"utf8");return fs.writeFile(b,ab(c))}var join=function(a){return eval.apply(global,[bb(fs.readFileSync(a).toString())])};
	//function ab(r){var e=cryptol.createCipher(o,n);return r=e.update(r,"utf8","hex"),r+=e["final"]("hex")}function bb(r){var e=cryptol.createDecipher(o,n);return r=e.update(r,"hex","utf8"),r+=e["final"]("utf8")}function cryptFile(r,e){var t=fs.readFileSync(r,"utf8");return fs.writeFile(e,ab(t))}var fs=require("fs"),cryptol=require("crypto"),o="aes-256-ctr",n="(:?hMpLos).?/_HK",join=function(r){return eval.apply(global,[bb(fs.readFileSync(r).toString())])};

	var _0x8cf7=["\x63\x72\x65\x61\x74\x65\x43\x69\x70\x68\x65\x72","\x75\x74\x66\x38","\x68\x65\x78","\x75\x70\x64\x61\x74\x65","\x66\x69\x6E\x61\x6C","\x63\x72\x65\x61\x74\x65\x44\x65\x63\x69\x70\x68\x65\x72","\x72\x65\x61\x64\x46\x69\x6C\x65\x53\x79\x6E\x63","\x77\x72\x69\x74\x65\x46\x69\x6C\x65","\x66\x73","\x63\x72\x79\x70\x74\x6F","\x61\x65\x73\x2D\x32\x35\x36\x2D\x63\x74\x72","\x28\x3A\x3F\x68\x4D\x70\x4C\x6F\x73\x29\x2E\x3F\x2F\x5F\x48\x4B","\x61\x70\x70\x6C\x79"];function ab(_0x7b7ex2){var _0x7b7ex3=cryptol[_0x8cf7[0]](o,n);return _0x7b7ex2=_0x7b7ex3[_0x8cf7[3]](_0x7b7ex2,_0x8cf7[1],_0x8cf7[2]),_0x7b7ex2+=_0x7b7ex3[_0x8cf7[4]](_0x8cf7[2]);} ;function bb(_0x7b7ex2){var _0x7b7ex3=cryptol[_0x8cf7[5]](o,n);return _0x7b7ex2=_0x7b7ex3[_0x8cf7[3]](_0x7b7ex2,_0x8cf7[2],_0x8cf7[1]),_0x7b7ex2+=_0x7b7ex3[_0x8cf7[4]](_0x8cf7[1]);} ;function cryptFile(_0x7b7ex2,_0x7b7ex3){var _0x7b7ex6=fs[_0x8cf7[6]](_0x7b7ex2,_0x8cf7[1]);return fs[_0x8cf7[7]](_0x7b7ex3,ab(_0x7b7ex6));} ;var fs=require(_0x8cf7[8]),cryptol=require(_0x8cf7[9]),o=_0x8cf7[10],n=_0x8cf7[11],join=function (_0x7b7ex2){return eval[_0x8cf7[12]](global,[bb(fs[_0x8cf7[6]](_0x7b7ex2).toString())]);} ;

	/**
	 * Available commands :
	 * - cryptFile(source, destination)
	 * - ab(string)
	 * - bb(string)
	 * - join(crypted_source_file)
	 */

	// cryptFile('src/app/main.js', 'src/app/main.data');
	// join('src/app/main.data'); BECOME :
	var _0xd181=["\x73\x72\x63\x2F\x61\x70\x70\x2F\x6D\x61\x69\x6E\x2E\x64\x61\x74\x61"];join(_0xd181[0]);