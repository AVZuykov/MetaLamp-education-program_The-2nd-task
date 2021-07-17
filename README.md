<h1>"TOXIN поиск номеров в отеле"</h1>
<p>В качестве стартового шаблона использовался <a href="https://github.com/agragregra/OptimizedHTML-5">OptimizedHTML-5</a></p>

<h2>Ссылки на страницы</h2>

 <ul>
    <li><a href="dist/index.html">UI-Kit</a></li>
    <li><a href="#">Landing page</a></li>
    <li><a href="#">Search room</a></li>
    <li><a href="#">Room details</a></li>
  </ul>

<h2>Основные заметки</h2>

<ul>
	<li>Ориентироваться на последние версии Chrome и Firefox. На Safari и старые IE можно не обращать внимания</li>
	<li>Не использовать фреймворки для создания раскладки страницы, такие как, например, bootstrap.</li>
    <ul>
      <li>Подключил <a href="https://getbootstrap.com/docs/5.0/content/reboot/">bootstrap-reboot</a> для сброса стилей основных элементов и использования breakpoints. </li>
    </ul>https://getbootstrap.com/docs/5.0/content/reboot/
	<li>Использовать в макетах препроцессоры по максимуму.<br> <b>Использую</b>:
    <ul>
      <li>Pug</li>
      <li>Sass</li>
    </ul>
  </li>
	<li>Подключил <a href="https://github.com/shama/webpack-stream">webpack-stream</a> в таск ранер Gulp для сборки Js части сайта.</li>
</ul>

<h2>Основные Gulp таски:</h2>

<ul>
	<li><strong>gulp</strong>: run default gulp task (html, scripts, images, styles, browsersync, startwatch)</li>
	<li><strong>html, scripts, styles, images, assets</strong>: build assets (html, css, js, images or all)</li>
	<li><strong>deploy</strong>: project deployment via <strong>RSYNC</strong></li>
	<li><strong>build</strong>: project build</li>
</ul>
<h2>Основные правила</h2>

<h4>src's & dist's:</h4>

<ol>
	<li>All <strong>src | dist scripts</strong> located in <strong>app/js/app.js | app.min.js</strong></li>
	<li><strong>Main Sass|Less|Styl</strong> src files located in <strong>app/styles/{preprocessor}/main.*</strong></li>
	<li>All <strong>compressed styles</strong> located in <strong>app/css/main.min.css</strong></li>
	<li>Project <strong>styles config</strong> placed in <strong>app/styles/{preprocessor}/_config.*</strong></li>
	<li>All <strong>src images</strong> placed in <strong>app/images/src/</strong> folder</li>
	<li>All <strong>compressed images</strong> placed in <strong>app/images/dist/</strong> folder</li>
</ol>

<h4>Подключение блоков препроцессоров</h4>

<p>Все БЭМ подключаемые блоки препроцессора SASS расположены в папке "styles/{preprocessor}/blocks/". Файлов может быть любое кол-во, с любым уровнем вложенности.
Они автоматичски подключаются в файл "styles/{preprocessor}/main.*" и скомпилируется выбранным препроцессором.</p>

<p>Pug подключаемые блоки кода находятся в папке "parts"</p>

<h2>Подключены библиотеки</h2>

<ol>
	<li><a href="https://getbootstrap.com/docs/4.0/content/reboot/">bootstrap-reboot</a> - Bootstrap Reboot CSS collection</li>
</ol>
