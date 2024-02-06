test('Running should fail since package name not provided', async () => {
  //console.log('Running test: Running should fail since package name not provided');
  const spawnSync = require('child_process').spawnSync;  
  const myResult = spawnSync('npm run start', { stdio: "pipe", shell: true });
  //console.log(myResult.output.toString());
  expect(myResult.output.toString().includes('No package name provided')).toBeTruthy();
});

test('Running should update flow', async () => {
  //console.log('Running test: Running should update flow');
  const spawnSync = require('child_process').spawnSync;
  const envVars = Object.assign({}, process.env, { INPUT_PACKAGE_NAME: 'node-red-contrib-onstar2' });
  const myResult = spawnSync('npm run start', { stdio: "pipe", shell: true, env: envVars });
  //console.log(myResult.output.toString());
  expect(myResult.output.toString().includes('Module already at latest version')).toBeTruthy();
});