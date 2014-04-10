gulp = require 'gulp'
map = require 'map-stream'
open = require 'open'
metawork = require './metawork'
connect = require 'gulp-connect'
hljs = require('highlight.js')
cheerio = require 'cheerio'
_str = require 'underscore.string'
path = require 'path'
moment = require 'moment'

# Setup ECT
ECT = require('ect')
renderer = ECT({
  root: __dirname + '/templates'
  cache: false
  ext: '.eco'
})

# Load plugins
$ = require('gulp-load-plugins')()

gulp.task('md', ->
  gulp.src('content/**/*.md')
    .pipe($.frontMatter({
      property: 'meta'
      remove: true
    }))
    .pipe($.marked(
      smartypants: true
    ))
    .pipe(map((file, cb) ->
      file.path = file.path.replace(/md$/, 'html')
      cb(null, file)
    ))
    # Remove date from paths
    .pipe(map((file, cb) ->
      file.path = file.base + file.path.split('---')[1]
      cb(null, file)
    ))
    .pipe(metawork())
    # Run posts through their template
    .pipe(map((file, cb) ->
      if file.meta?.layout?
        file._contents = Buffer(
          renderer.render(
            file.meta.layout, {
              body: file._contents.toString()
              title: file.meta.title
              date: moment(file.meta.date)
              meta: file.meta
            }
          ))
      cb(null, file)
    ))
    # Highlight text.
    .pipe(map((file, cb) ->
      $$ = cheerio.load(file._contents.toString())
      if $$('pre code').length > 0
        $$('pre code').each( (i, el) ->
          # Get the language (if available).
          # Marked gives us a class with lang-* and highlightjs only wants *.
          code = _str.unescapeHTML($$(el).html())
          language = $$(el).attr('class').split('-')[1]
          if language?
            $$(el).html _str.trim(hljs.highlight(language, code).value)
          else
            $$(el).html hljs.highlightAuto(code).value

          # Add hljs class to pre.
          $$(el).parent().addClass('hljs')
        )
        file._contents = Buffer($$.html())
      cb(null, file)
    ))
    .pipe(gulp.dest('public'))
)

# Images
gulp.task('images', ->
  gulp.src([
      'content/**/*.png'
      'content/**/*.jpg'
      'content/**/*.gif'
    ]
  )
    .pipe($.newer('public'))
    #.pipe($.imagemin({
        #optimizationLevel: 3,
        #progressive: true,
        #interlaced: true
    #}))
    # Remove date from paths
    .pipe(map((file, cb) ->
      file.path = file.base + file.path.split('---')[1]
      cb(null, file)
    ))
    .pipe($.size())
    .pipe(gulp.dest('public'))
)
gulp.task('asset-images', ->
  gulp.src(['assets/images/*'])
    .pipe($.size())
    .pipe(gulp.dest('public/assets/images'))
)

# CSS
gulp.task('css', ->
  gulp.src(['assets/sass/*.sass', 'assets/sass/*.scss'])
    .pipe($.compass({
      css: 'public/assets'
      sass: 'assets/sass'
      image: 'assets/images'
      style: 'nested'
      comments: false
      bundle_exec: true
      time: true
      require: ['susy', 'modular-scale', 'normalize-scss', 'sass-css-importer', 'breakpoint']
    }))
    .on('error', (err) ->
      console.log err
    )
    .pipe($.size())
    .pipe(connect.reload())
)

# Connect
gulp.task 'connect', connect.server({
  root: ['public']
  port: 9000,
  livereload: true
})

gulp.task 'serve', ['connect'], ->
  open("http://localhost:9000")

gulp.task 'default', ->
  gulp.start 'build'

gulp.task 'build', ['asset-images', 'images', 'md', 'css']

gulp.task 'watch', ['md', 'asset-images', 'images', 'css', 'connect'], ->
  gulp.watch ['content/**/*.md', 'templates/*'], ['md']
  gulp.watch(['content/**/*.png','content/**/*.jpg','content/**/*.gif'], ['images'])
  gulp.watch(['asset/images/*'], ['asset-images'])
  gulp.watch(['assets/sass/*'], ['css'])

  gulp.watch ['content/**/*'], (event) ->
    gulp.src(event.path)
      .pipe(connect.reload())
