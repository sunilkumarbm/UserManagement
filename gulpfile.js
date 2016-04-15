// Import required modules

var gulp = require("gulp"),
	sass = require("gulp-sass");
//    minifyCss = require('gulp-minify-css');


//var sassOptions = {
//  errLogToConsole: true,
//  outputStyle: 'expanded'
//};
// Create gulp task
// Complie the SASS file
gulp.task("sass", function(){
	gulp.src("src/sass/*.scss")
		.pipe(sass().on("error",sass.logError ))
//                .pipe(minifyCss())
		.pipe(gulp.dest("dist/css"));
	;
});


// Copy HTML to dist
gulp.task("html", function(){
	gulp.src("src/html/**/*")
		.pipe(gulp.dest("dist"));
	;
});

gulp.task("js", function() {
	gulp.src("src/scripts/**/*")
		.pipe(gulp.dest("dist/scripts"));
});

gulp.task("images", function() {
	gulp.src("src/images/**/*")
		.pipe(gulp.dest("dist/assets/images"));
});
gulp.task("fonts", function() {
	gulp.src("src/fonts/**/*")
		.pipe(gulp.dest("dist/assets/fonts"));
});

gulp.task("watch", ["sass", "js", "html", "images", "fonts"], function (){
	gulp.watch(["src/sass/**/*.scss"], ["sass"]);
	gulp.watch(["src/html/**/*"], ["html"]);
	gulp.watch(["src/scripts/**/*"], ["js"]);
	gulp.watch(["src/images/**/*"], ["images"]);
	gulp.watch(["src/fonts/**/*"], ["fonts"]);
});