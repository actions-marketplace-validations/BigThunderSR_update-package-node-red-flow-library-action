const { describe, test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const { spawnSync } = require('child_process');

describe('Running Tests', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV }; // Make a copy
  });

  after(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('Running should fail since package name not provided - No Delay', () => {
    //console.log('Running test: Running should fail since package name not provided');
    const myResult = spawnSync('npm run start', { stdio: "pipe", shell: true });
    //console.log(myResult.output.toString());
    assert.ok(myResult.output.toString().includes('No package name provided'));
    assert.ok(myResult.output.toString().includes('No delay defined, running immediately'));
  });

  test('Running should fail since package name not provided - With 2000 ms Delay', () => {
    //console.log('Running test: Running should fail since package name not provided');
    const envVars = Object.assign({}, process.env, { INPUT_DELAY_RUN_MS: 2000 });
    const myResult = spawnSync('npm run start', { stdio: "pipe", shell: true, env: envVars });
    //console.log(myResult.output.toString());
    assert.ok(myResult.output.toString().includes('No package name provided'));
    assert.ok(myResult.output.toString().includes('Delaying for 2000 ms'));
  });

  test('Running should update flow - No Delay', () => {
    //console.log('Running test: Running should update flow');
    const envVars = Object.assign({}, process.env, { INPUT_PACKAGE_NAME: 'node-red-contrib-onstar2' });
    const myResult = spawnSync('npm run start', { stdio: "pipe", shell: true, env: envVars });
    //console.log(myResult.output.toString());
    assert.ok(myResult.output.toString().includes('Module already at latest version'));
  });

  test('Running should update flow - With 2000 ms Delay', () => {
    //console.log('Running test: Running should update flow');
    const envVars = Object.assign({}, process.env, { INPUT_PACKAGE_NAME: 'node-red-contrib-onstar2', INPUT_DELAY_RUN_MS: 2000 });
    const myResult = spawnSync('npm run start', { stdio: "pipe", shell: true, env: envVars });
    //console.log(myResult.output.toString());
    assert.ok(myResult.output.toString().includes('Module already at latest version'));
    assert.ok(myResult.output.toString().includes('Delaying for 2000 ms'));
  });

  test('Running should fail since package name not found - No Delay', () => {
    //console.log('Running test: Running should fail since package name not found');
    const envVars = Object.assign({}, process.env, { INPUT_PACKAGE_NAME: 'node-red-contrib-onstar3' });
    const myResult = spawnSync('npm run start', { stdio: "pipe", shell: true, env: envVars });
    //console.log(myResult.output.toString());
    assert.ok(myResult.output.toString().includes('no stable published version'));
  });

  test('Running should fail since package name not found - With 500 ms Delay', () => {
    //console.log('Running test: Running should fail since package name not found');
    const envVars = Object.assign({}, process.env, { INPUT_PACKAGE_NAME: 'node-red-contrib-onstar3', INPUT_DELAY_RUN_MS: 500 });
    const myResult = spawnSync('npm run start', { stdio: "pipe", shell: true, env: envVars });
    //console.log(myResult.output.toString());
    assert.ok(myResult.output.toString().includes('no stable published version'));
    assert.ok(myResult.output.toString().includes('Delaying for 500 ms'));
  });
});