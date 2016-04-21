/*jshint unused:false, expr:true */

/**
 * Test: apiDoc full parse
 */

// node modules
var apidoc = require('apidoc-core');
var exec   = require('child_process').exec;
var fs     = require('fs-extra');
var path   = require('path');
var should = require('should');

describe('Create doc and compare with fixture', function() {

    var exampleBasePath = 'test';
    var fixturePath = exampleBasePath + '/fixtures';

    function log() {
        // can add an emitter here and capture it in the tests with chai-spies
    }

    var logger = {
        debug  : log,
        verbose: log,
        info   : log,
        warn   : log,
        error  : log,
    };

    var api = {};

    before(function(done) {
        fs.removeSync('./tmp/');
        done();
    });

    after(function(done) {
        done();
    });

    // create
    it('should create an example in memory', function(done) {
        apidoc.setLogger(logger);
        apidoc.setGeneratorInfos({});
        apidoc.setPackageInfos({
            'name': 'test',
            'version': '0.0.0'
        });

        api = apidoc.parse({
            src: exampleBasePath + '/src/'
        });

        if (api === false)
            throw new Error('Parse failed.');

        done();
    });

    // compare
    it('created files should equal to fixtures', function(done) {
        var fixtureContent = fs.readFileSync(fixturePath + '/api_data.json', 'utf8');
        var createdContent = api.data;

        var fixtureLines = fixtureContent.split(/\n/);
        var createdLines = createdContent.split(/\n/);
        createdLines.push(''); // Empty line at end.

        for (var lineNumber = 0; lineNumber < fixtureLines.length; lineNumber += 1) {
            if (fixtureLines[lineNumber] !== createdLines[lineNumber])
                throw new Error('Generated file does not equals to fixture api_data.json in line ' + (lineNumber + 1) +
                    '\nfixture: ' + fixtureLines[lineNumber] +
                    '\ncreated: ' + createdLines[lineNumber]
                );
        }

        done();
    });

});
