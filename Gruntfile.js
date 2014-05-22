/*global module*/
module.exports = function (grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      build: {
        src: ['<%= pkg.name %>.js']
      }
    },

    uglify: {
      options: {
        sourceMap: true,
        preserveComments: 'some'
      },

      build: {
        src : '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },

    connect: {
      basic : {
        options: {
          livereload: true
        }
      },
      server: {
        options : {
          keepalive : true
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['<%= pkg.name %>.js'],
        tasks: ['build']
      }
    }
  });

  // Load build-in tasks
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Customs tasks
  grunt.registerTask('build', ['jshint:build',  'uglify:build']);
  grunt.registerTask('live',  ['connect:basic', 'watch'       ]);

  // Default task(s).
  grunt.registerTask('default', ['js']);
};
