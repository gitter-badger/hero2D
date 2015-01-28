/*!
 *
 * File: Hero2D.files.js
 * Hero2D Framework
 * Version : 0.0.1
 * Author : Christophe Corbalan @RedStarZOn
 * http://www.christophecorbalan.com/
 *
 * Copyright 2015 Hero2D
 * Released under the MIT license
 *
 * Date: 2015-01-28
 * 
 */ 

    /** Crypt algorithm */
    var H2D_algorithm = 'aes-256-ctr';

    /**
     * File exists ?
     * @param  {[string]} source
     * @return {[boolean]}
     */
    function fileExists(source) {
        return fs.existsSync('src/' + source);
    };

    /**
     * Write an existing/new file
     * @param  {[string]} source
     * @param  {[string]} content
     * @return {[boolean]}
     */
    function writeFile(source, content) {
        return fs.writeFile('src/' + source, content);
    };

    /**
     * Read a file
     * @param  {[string]} source
     * @return {[boolean]}
     */
    function readFile(source) {
        return fs.readFileSync('src/' + source).toString();
    };

    /**
     * Create a new data crypted file
     * @param  {[object]} content
     * @param  {[string]} source
     * @param  {[N/A]} hash
     * @return {[boolean]}
     */
    function writeDataFile(content, source, hash) {
        var content = encrypt(JSON.stringify(content), hash);
        return writeFile(source, content);
    };

    /**
     * Read data file
     * @param  {[string]} source
     * @param  {[N/A]} hash
     * @return {[object]}
     */
    function readDataFile(source, hash) {
        return JSON.parse(decrypt(readFile(source), hash));
    };

    /**
     * Encrypt data
     * @param  {[string]} value
     * @param  {[N/A]} hash
     * @return {[string]}
     */
    function encrypt(value, hash) {
        var cipher = cryptJS.createCipher(H2D_algorithm, hash);
        var crypted = cipher.update(value, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    };

    /**
     * Decrypt data
     * @param  {[string]} value
     * @param  {[N/A]} hash
     * @return {[string]}
     */
    function decrypt(value, hash) {
        var decipher = cryptJS.createDecipher(H2D_algorithm, hash);
        var dec = decipher.update(value, 'hex','utf8');
        dec += decipher.final('utf8');
        return dec;
    };