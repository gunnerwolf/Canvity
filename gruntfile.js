module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            default : {
                tsconfig: './tsconfig.json'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            canvity: {
                files: {
                    'bin/canvity.min.js': ['bin/Canvity/**/*.js']
                }
            },
            testApp: {
                files: {
                    'bin/testApp.min.js': ['bin/testApp/**/*.js']
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask("default", ["ts", "uglify"]);
};