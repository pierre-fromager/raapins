
import path from 'path';
import async from 'async';
import newman from 'newman';

const fixturesPath = `${path.resolve()}/fixtures/`;
const parametersForTestRun = {
  collection: path.join(fixturesPath, 'postman_collection_v2.json'),
  environment: path.join(fixturesPath, 'postman_environment.json'),
};
const paralleCollectionStack = [];
const paralleCollectionStackSize = 90;

const parallelCollectionRun = (done) => {
  newman.run(parametersForTestRun, done);
};

for (let i = 0; i < paralleCollectionStackSize; i += 1) {
  paralleCollectionStack.push(parallelCollectionRun);
}

console.log(`Prepare ${paralleCollectionStackSize} // connections.`);

async.parallel(paralleCollectionStack, (err, results) => {
  if (err) {
    console.error(err);
  }
  results.forEach((result) => {
    const { failures } = result.run;
    const message = (failures.length)
      ? JSON.stringify(failures.failures, null, 2)
      : `${result.collection.name} ran successfully.`;
    console.info(message);
  });
});
