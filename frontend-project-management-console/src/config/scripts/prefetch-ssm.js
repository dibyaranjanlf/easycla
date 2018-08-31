const fs = require('fs');
const RetrieveSSMValues = require('./read-ssm');
const configVarArray = ['auth0-clientId', 'auth0-domain', 'cinco-api-url', 'cla-api-url', 'analytics-api-url'];
const region = 'us-east-1';
const profile = 'lf-cla';
const stageEnv = process.env.STAGE_ENV;

async function prefetchSSM () {
  let result = {};
  console.log('Start to fetch SSM values...');
  result = await RetrieveSSMValues(configVarArray, stageEnv, region, profile);
  fs.writeFile (`./config/config-${stageEnv}.json`, JSON.stringify(result), function(err) {
    if (err) throw new Error(`Couldn't save SSM paramters to disk with error ${err}`);
    console.log('Fetching completed...');});
}

prefetchSSM();