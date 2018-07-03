module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            default : {
                tsconfig: './tsconfig.json'
            }
        },
        exec: {
            watch: {
                cmd: 'tsc --project ./ -w'
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-exec");
    grunt.registerTask("default", ["ts"]);
    grunt.registerTask("watch", ["exec"]);
};