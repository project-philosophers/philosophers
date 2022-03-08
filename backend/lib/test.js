const generateId = require('./generateId');

(async () => {
  const id = await generateId();
  console.log(id);
})()
