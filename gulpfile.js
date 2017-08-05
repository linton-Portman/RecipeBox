var gulp = require('gulp');
var sass = require('gulp-sass');

var _SRC = "./src/Styles/sass/**/*.scss";
var _DEST = "./src/Styles/css";


gulp.task('styles', function(){
    gulp.src(_SRC)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(_DEST));

    
  
});

  gulp.task('default', function(){
        gulp.watch(_SRC, ['styles'])

});