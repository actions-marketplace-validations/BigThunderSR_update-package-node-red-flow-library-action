describe('Running Tests', () => {
  const OLD_ENV = process.env;
  let spawnSync;

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    spawnSync = require('child_process').spawnSync;
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('Running should fail since package name not provided - No Delay', async () => {
    //console.log('Running test: Running should fail since package name not provided');
    const myResult = spawnSync('npm run start', { stdio: "pipe", shell: true });
    //console.log(myResult.output.toString());
    expect(myResult.output.toString().includes('No package name provided' && 'No delay defined, running immediately')).toBeTruthy();
  });

  test('Running should fail since package name not provided - With 2000 ms Delay', async () => {
    //console.log('Running test: Running should fail since package name not provided');
    const envVars = Object.assign({}, process.env, { INPUT_DELAY_RUN_MS: 2000 });
    const myResult = spawnSync('npm run start', { stdio: "pipe", shell: true, env: envVars });
    //console.log(myResult.output.toString());
    expect(myResult.output.toString().includes('No package name provided' && 'Delaying for 2000 ms')).toBeTruthy();
  });

  test('Running should update flow - No Delay', async () => {
    //console.log('Running test: Running should update flow');
    const envVars = Object.assign({}, process.env, { INPUT_PACKAGE_NAME: 'node-red-contrib-onstar2' });
    const myResult = spawnSync('npm run start', { stdio: "pipe", shell: true, env: envVars });
    //console.log(myResult.output.toString());
    expect(myResult.output.toString().includes('Module already at latest version')).toBeTruthy();
  });

  test('Running should update flow - With 2000 ms Delay', async () => {
    //console.log('Running test: Running should update flow');
    const spawnSync = require('child_process').spawnSync;
    const envVars = Object.assign({}, process.env, { INPUT_PACKAGE_NAME: 'node-red-contrib-onstar2', INPUT_DELAY_RUN_MS: 2000 });
    const myResult = spawnSync('npm run start', { stdio: "pipe", shell: true, env: envVars });
    //console.log(myResult.output.toString());
    expect(myResult.output.toString().includes('Module already at latest version' && 'Delaying for 2000 ms')).toBeTruthy();
  });
});