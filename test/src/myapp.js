// This is an example app with apiDoc annotations.

/**
 * @api {get} /do/something
 * @apiTest     This content will be replaced via hook 'parser-find-elements'
 * @apiFoo      This content will be replaced via hook 'parser-find-element-foo'
 * @apiPriority This content will be replaced 3 times
 *              via hook 'parser-find-element-{name}' -> 'parser-find-element-apipriority'
 *              With priority 40, 50 and 60.
 */
function doSomething() {
    console.log('best app ever');
}
