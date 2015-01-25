<html>
	<head>
		<meta charset="utf-8"/>
		<title></title>
		<link rel="stylesheet" type="text/css" href="themes/default/main.css"/>
		<link rel="stylesheet" type="text/css" href="app/ext/codemirror/lib/codemirror.css"/>
		<link rel="stylesheet" type="text/css" href="app/ext/codemirror/theme/hero2D.css" />
	</head>
	<body>
		<black-layer></black-layer>
		<content>
			<modal id="new-project">
				<close-icon><i class="icon-close"></i></close-icon>
				<h1>New project</h1>
				<input type="text" placeholder="Project name..." />
				<a href="#" button><icon class="icon-book"></icon> Create</a>
			</modal>

			<preload>
				<logo class="animated wobble"></logo>
				<p>Welcome to <a href="#" external-link>Hero2D</a> ! This is an alpha version (<a href="#" external-link>changelog</a>), so if you have some issues with the application just let me know on the <a href="#" external-link>github page</a>.</p>
				<a href="#" show-modal="new-project" button><icon class="icon-book"></icon> Create a new project</a>
				<p>OR</p>
				<a href="#" file-browser="preload-project-file" button><icon class="icon-folder-open"></icon> Open an existing project</a>
				<input type="file" accept=".hproj" preload-project-file />
			</preload>
			<application>
				
				<sidebar>
					<header>
						<a href="#" can-be-active><i class="icon-folder-open"></i> Open Project</a>
						<a href="#" can-be-active><i class="icon-disk"></i> Save File</a>
						<a href="#" can-be-active><i class="icon-console"></i> Show/Hide Console</a>
						<a href="#" can-be-active><i class="icon-hammer"></i> Settings</a>
						<a href="#"><i class="icon-stop"></i> Stop</a>
						<a href="#" can-be-active active><i class="icon-play"></i> Run (F5)</a>
					</header>
					<logo></logo>
					<description><i class="icon-cog"></i> Project Structure (<a href="#">Open</a>)</description>
					<ul categories>
						<li category class="deployed">
							<span folder><i class="icon-folder-open"></i> Code</span>
							<ul sub-category>
								<li active item><i class="icon-file"></i> main.hero</li>
								<li item><i class="icon-file"></i> map.hero</li>
								<li category>
									<span folder><i class="icon-folder"></i> Classes</span>
									<ul sub-category>
										<li item><i class="icon-file"></i> character.hero</li>
										<li item><i class="icon-file"></i> world.hero</li>
									</ul>
								</li>
							</ul>
						</li>
						<li category>
							<span folder><i class="icon-folder"></i> Sprites</span>
							<ul sub-category>
								<li item><i class="icon-image"></i> bunny.png</li>
								<li item><i class="icon-image"></i> character.png</li>
							</ul>
						</li>
						<li category>
							<span folder><i class="icon-folder"></i> Sounds</span>
							<ul sub-category>
								<li category>
									<span folder><i class="icon-folder"></i> Music</span>
									<ul sub-category>
										<li item><i class="icon-music"></i> town.ogg</li>
										<li item><i class="icon-music"></i> world.ogg</li>
									</ul>
								</li>
								<li category>
									<span folder><i class="icon-folder"></i> SFX</span>
									<ul sub-category>
										<li item><i class="icon-music"></i> punch.ogg</li>
										<li item><i class="icon-music"></i> fire.ogg</li>
										<li item><i class="icon-music"></i> rain.ogg</li>
										<li item><i class="icon-music"></i> water.ogg</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</sidebar>
				<editor>
					<!--
					<tabs>
						<tab active><i class="icon-file"></i> main.hero <i class="icon-cancel-circle"></i></tab>
						<tab><i class="icon-file"></i> map.hero* <i class="icon-cancel-circle"></i></tab>
						<tab><i class="icon-music"></i> punch.ogg <i class="icon-cancel-circle"></i></tab>
						<tab><i class="icon-image"></i> sprite.png <i class="icon-cancel-circle"></i></tab>
					</tabs>
					-->
					<hero id="editor"></hero>
				</editor>
			</application>
		</content>
		<script src="app/main.js"></script>
	</body>
</html>