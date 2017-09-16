const gulp = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const uglifycss = require('gulp-uglifycss')

gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts'])

gulp.task('deps.js', function(){    
    gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/angular-animate/angular-animate.min.js',        
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ]) 
    .pipe(uglify())
    .pipe(concat('deps.min.js'))
    .pipe(gulp.dest('public/assets/js'))
})

gulp.task('deps.css', function(){
    gulp.src([        
        'node_modules/font-awesome/css/font-awesome.min.css',        
        'node_modules/bootswatch/paper/bootstrap.min.css'      
    ])
    .pipe(uglifycss({ "uglyComments": true }))
    .pipe(concat('deps.min.css'))
    .pipe(gulp.dest('public/assets/css'))
})

gulp.task('deps.fonts', function() {
    gulp.src([
        'node_modules/font-awesome/fonts/*.*',
        'node_modules/bootstrap/fonts/*.*'
    ])
    .pipe(gulp.dest('public/assets/fonts'))
})