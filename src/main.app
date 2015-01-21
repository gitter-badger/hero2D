<html>
  <head>
		<meta charset="utf-8" />
		<title>Hero2D - Alpha Version</title>
    <link rel="stylesheet" type="text/css" href="themes/default/main.css" />
	</head>
	<body>

    <black-layer></black-layer>
    <modal id="new-project">
      <close-icon></close-icon>
      <h1>New project</h1>
      <input type="text" placeholder="Project name..." />
      <a href="#" button><icon class="icon-book"></icon> Create</a>
    </modal>

    <help-icon></help-icon>
    <version>Alpha <blue-color>0.0.1</blue-color></version>
    
    <preload>
      <logo class="animated wobble"></logo>
      <p>Welcome to <a href="#" external-link>Hero2D</a> ! This is an alpha version (<a href="#" external-link>changelog</a>), so if you have some issues with the application just let me know on the <a href="#" external-link>github page</a>.</p>
      <a href="#" show-modal="new-project" button><icon class="icon-book"></icon> Create a new project</a>
      <p>OR</p>
      <a href="#" file-browser="preload-project-file" button><icon class="icon-folder-open"></icon> Open an existing project</a>
      <input type="file" accept=".proj" preload-project-file />
    </preload>

    <application>
      Hello
    </application>

    <!-- Main App -->
    <script src="app/main.js"></script>

	</body>
</html>