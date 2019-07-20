var path = require('path'),
    async = require('async'),
    newman = require('newman'),
    fixturesPath = '/../../fixtures/',
    parametersForTestRun = {
        collection: path.join(__dirname + fixturesPath, 'postman_collection_v2.json'),
        environment: path.join(__dirname + fixturesPath, 'postman_environment.json'),
    },
    paralleCollectionStack = [],
    paralleCollectionStackSize = 90;

parallelCollectionRun = function (done) {newman.run(parametersForTestRun, done);};

for (var i = 0; i < paralleCollectionStackSize; i++) { 
    paralleCollectionStack.push(parallelCollectionRun);
}
console.log('Prepare ' + paralleCollectionStackSize + ' // connections.');
async.parallel(paralleCollectionStack,function (err, results) {
    err && console.error(err);
    results.forEach(function (result) {
        var failures = result.run.failures;
        var message = (failures.length) 
            ? JSON.stringify(failures.failures, null, 2) 
            : `${result.collection.name} ran successfully.`;
        console.info(message);
    });
});