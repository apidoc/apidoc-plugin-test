/**
 * Only a test and example plugin. It demonstrates the usage of the apidoc hook system.
 *
 * Hook overview: https://github.com/apidoc/apidoc-core/hooks.md
 */
var app = {};

module.exports = {

    init: function(_app) {
        app = _app;

        //
        // Hooks
        //
        app.addHook('parser-find-elements', parserFindElements);
        app.addHook('parser-find-element-apifoo', parserFindElementApiFoo);

        // Hooks with priority
        // Default is 100, you should select intervals in 10 steps.

        // Priority is usefull to execute something before or after other plugins
        // or overwrite their behavior.

        // Example if 2 Plugins have the same priority:
        // Both have priority 50 so Old will be ignored and overwritten with New
        app.addHook('parser-find-element-apipriority', parserFindElementApiPriorityOld, 50);
        app.addHook('parser-find-element-apipriority', parserFindElementApiPriorityNew, 50);

        // Earlier will be executed first (priority 40)
        // then New (from above with prio 50)
        // and Later at last (60)
        app.addHook('parser-find-element-apipriority', parserFindElementApiPriorityLater, 60);
        app.addHook('parser-find-element-apipriority', parserFindElementApiPriorityEarlier, 40);

        //
        // Add Parsers (!!! experimental !!!)
        //
        app.parsers.apitest = {
            parse     : parseTest,
            path      : 'local',
            method    : 'insert'
        };
        app.parsers.apifoo = {
            parse     : parseFoo,
            path      : 'local',
            method    : 'insert'
        };
        app.parsers.apipriority = {
            parse     : parsePriority,
            path      : 'local',
            method    : 'insert'
        };
    }

};

/**
 * Replace all current elements.
 */
function parserFindElements(elements, element, block, filename) {
    // Here you can do something with all elements
    if ( element.name === 'apitest' ) {
        // Remove last
        elements.pop();

        // Do something.
        element.content = 'Test is replaced!';

        // Add new
        elements.push(element);
    }
    return elements;
}

/**
 * A specific element.
 */
function parserFindElementApiFoo(element, block, filename) {
    // Here you can do something with one element
    element.content = 'Foo is replaced!';
    return element;
}

/**
 * Old is never executed.
 */
function parserFindElementApiPriorityOld(element, block, filename) {
    element.content = 'Not executed cause parserFindElementPriorityNew overwrite it.';
    return element;
}

/**
 * New will be executed.
 */
function parserFindElementApiPriorityNew(element, block, filename) {
    element.content = element.content + ' New is executed.';
    return element;
}

/**
 * Earlier will be executed.
 */
function parserFindElementApiPriorityEarlier(element, block, filename) {
    element.content = 'Earlier is executed.';
    return element;
}

/**
 * Later will be executed.
 */
function parserFindElementApiPriorityLater(element, block, filename) {
    element.content = element.content + ' Later is executed.';
    return element;
}

/**
 * Simple parser. Add test to tree.
 * Examples: https://github.com/apidoc/apidoc-core/tree/master/lib/parsers
 */
function parseTest(content) {
    return {
        test: content
    };
}

/**
 * Simple parser. Add foo to tree.
 * Examples: https://github.com/apidoc/apidoc-core/tree/master/lib/parsers
 */
function parseFoo(content) {
    return {
        foo: content
    };
}

/**
 * Simple parser. Add priority to tree.
 * Examples: https://github.com/apidoc/apidoc-core/tree/master/lib/parsers
 */
function parsePriority(content) {
    return {
        priority: content
    };
}
