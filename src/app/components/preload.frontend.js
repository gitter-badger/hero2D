/*!
 * preload.frontend.js
 * Location : components/preload.frontend.js
 * Author : Christophe Corbalan @RedStarZOn
 * http://www.christophecorbalan.com/
 *
 * Copyright 2015 HeroJS
 * Released under the MIT license
 *
 * Date: 2015-01-21
 */

 	/**
 	 * Show/Hide Modal
 	 * @return {}
 	 */
	function modalManagement() {
		$('modal').each(function() {
			var width = $(this).width();
			var height = $(this).height();

			$(this).css({
				'marginLeft': '-' + (width / 2) - 30,
				'marginTop': '-' + (height / 2) - 30
			});
		});
		$('modal > close-icon, [close-modal]').click(function() {
			$('black-layer').hide();
			$('modal').hide();
		});
		$('[show-modal]').click(function(event) {
			var target = '#' + $(this).attr('show-modal');
			$('black-layer').show();
			$(target).show();
			event.preventDefault();
		});
	}

	/**
	 * Load a project
	 * @return {}
	 */
	$('[file-browser]').click(function() {
		var $target = $('[' + $(this).attr('file-browser') + ']');
		$target.change(function(evt) {
			Hero2D.loadEditor();
			Hero2D.data.last_project = $(this).val();
			Hero2D.writeData(Hero2D.data.settings, Hero2D.data);
		});
		$target.trigger('click');
	});

	$('#new-project [button]').click(function() {
		var projectName = $('#new-project input').val();
		if(projectName) {
			$('#new-project input').attr('value', '');
			Hero2D.project.name = projectName;
			Hero2D.loadEditor();
		}
	});

	/** Modal management */
	modalManagement();

	/** Existing Project ? */
	if(Hero2D.data.last_project && Hero2D.fileExists(Hero2D.data.last_project)) {
		Hero2D.loadEditor();
	} else {
		
	}