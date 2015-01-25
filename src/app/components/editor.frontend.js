/*!
 * editor.frontend.js
 * Location : components/editor.frontend.js
 * Author : Christophe Corbalan @RedStarZOn
 * http://www.christophecorbalan.com/
 *
 * Copyright 2015 HeroJS
 * Released under the MIT license
 *
 * Date: 2015-01-24
 */

 	function deployCategory($target) {
 		$target.find('i').removeClass('icon-folder');
 		$target.find('i').addClass('icon-folder-open');
 		$target.parent('[category]').addClass('deployed');
 	}

 	function undeployCategory($target) {
 		$target.find('i').removeClass('icon-folder-open');
 		$target.find('i').addClass('icon-folder');
 		$target.parent('[category]').removeClass('deployed');
 	}

 	/** Deploy/Undeploy structure */
 	$(document).on('click', '[category] > span', function(event){
 		if($(this).parent('[category]').hasClass('deployed')) {
 			return undeployCategory($(this));
 		}
 		else {
 			return deployCategory($(this));
 		}
 		event.stopPropagation();
 		event.preventDefault();
	});

	/** Open file */
	$(document).on('click', 'li[item]', function(event){
 		$('li[active]').removeAttr('active');
 		$(this).attr('active', '');
 		event.stopPropagation();
 		event.preventDefault();
	});

	/** Toolbar active links */
	$(document).on('click', 'header > a[can-be-active]', function(event){
 		$('header > a[active]').removeAttr('active');
 		$(this).attr('active', '');
 		event.stopPropagation();
	});

	$(document).on('a', function(event){
 		event.preventDefault();
	});

	//var myCodeMirror = CodeMirror.fromTextArea(document.getElementById('hero-editor'));
	var heroEditor = CodeMirror(document.getElementById('editor'), {
		mode: "javascript",
		lineNumbers: true,
		autofocus: true,
		smartIndent: false,
		keyMap: "sublime",
		autoCloseBrackets: true,
		matchBrackets: true,
		theme: "hero2D"
	});

	heroEditor.setValue('lol');