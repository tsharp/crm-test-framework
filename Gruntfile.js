/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
            ' * @license <%= pkg.title || pkg.name %> v<%= pkg.version %> Copyright (c) <%= grunt.template.today("yyyy") %>, <%= pkg.author.name %> All Rights Reserved.\n' +
            ' * Licensed Under <%= pkg.license %>.\n' +
            ' * see: http://github.com/tsharp/crm-test-framework for details\n' +
            ' */\n\n',
    jshint: {
      all: [
        'Gruntfile.js',
        'src/*.js',
        // '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    
    jsdoc : {
        dist : {
            src: ['src/**/*.js', 'test/**/*.js'],
            options: {
                destination: 'doc'
            }
        }
    },
    
    // Before generating any new files, remove any previously-created files.
    clean: {
      all: ['tmp', 'dist']
    },
    concat: {
        options: {
          stripBanners: false,
          banner: '<%= banner %>',
        },
        dist: {
          src: ['tmp/almond.min.js', 'tmp/application.js'],
          dest: 'dist/application.js',
        },
    },
    requirejs: {
      onOptimize: {
        options: {
          baseUrl: 'src',
          name: 'app',
          out: 'tmp/application.js',
          done: function(done, build) {
            grunt.file.write('dist/built-log.txt', build);
            done();
          }
        }
      }
    },
    uglify: {
    options: {
      mangle: false,
      preserveComments: 'some',
    },
    prod: {
      files: {
        'tmp/almond.min.js': ['lib/almond.js']
      }
    }
    },
    karma: {
  unit: {
    configFile: 'karma.conf.js'
  }
}
  });

  // Actually load this plugin's task(s).
  // grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-karma');
  
  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('prod', ['clean', 'jshint', 'uglify', 'requirejs', 'concat', 'karma']);
  grunt.registerTask('debug', ['clean', 'jshint', 'uglify', 'requirejs', 'concat', 'karma']);
  grunt.registerTask('doc', ['jsdoc']);
  grunt.registerTask('all', ['prod', 'doc']);
  // By default, lint and run all tests.
  grunt.registerTask('default', ['debug']);

};
