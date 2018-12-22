module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sync: {
      scripts: {
        files: [
          { 
            cwd: 'src',
            src: [
                  '**/*.html',
                  'img/**/*',
                  '!node_modules/**/*',
                  'styles/**/*',
                  'bash-docs/**/*'
                 ], 
            dest: 'dist' 
          }
        ]
      }
    },
    watch: {
      html: {
        files: ['src/**/*.html','src/!node_modules/**/*'],
        tasks: ['sync']
      },
      img: {
        files: ['src/img/**/*'],
        tasks: ['sync']
      },
      styles: {
        files: ['src/styles/**/*'],
        tasks: ['sync']
      },
      grunt: {
        files: 'Gruntfile.js',
        tasks: ['build']
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'dist',
          middleware: function(connect, options, middlewares) {
            middlewares.unshift(function(req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              next();
            });
            return middlewares;
          }
        }
      }
    }
  });
              
  // > grunt build  - compiles project
  grunt.registerTask('build', ['sync']);    
  // > grunt start  - compiles project, runs localhost server, re-builds project when files change
  grunt.registerTask('start', ['build', 'connect', 'watch']);
  // > grunt        - compiles project (defining default task)
  grunt.registerTask('default', ['build']);
}