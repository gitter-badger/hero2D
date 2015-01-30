
new Window title: "test", width: 640, height: 480

console.log "Premier fichier, nous allons rechercher dossier1/fichier1.coffee"

@include "dossier1/fichier1.coffee"

###
files =
	mapTileset: "sprites/tileset.png"
	playerSprite: "sprites/characters.png"
	music: "sounds/theme.mp3"

preload = new Preloader files

preload.progress (percent) -> console.log percent

preload.done ->

	# Player creation
	player = new Sprite preload.$ "playerSprite"

	nombre = 22

	
	console.log texte

	# Music
	music = new Sound preload.$ "music"

	# Walk down animation
	player.anim
		name: "walk_down"
		frames: [47, 56, 65]
		width: 32
		height: 32

	player.play "walk_down"

	player.display 20, 20

	play ->

		if press "up"
			player.y(player.y() - 1.5)
			console.log "test"
		if press "down" then player.y(player.y() + 1.5)
		if press "left" then player.x(player.x() - 1.5)
		if press "right" then player.x(player.x() + 1.5)
###