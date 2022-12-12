const Ajv = require("ajv");
const fs = require("fs").promises;
const path = require("path");

const readJSON = async (filePath) =>
  JSON.parse(await fs.readFile(filePath, "utf8"));

const ajv = new Ajv({ loadSchema, useDefaults: true });
ajv.addVocabulary([
  {
    keyword: "x-spectrum-website-url",
  },
  {
    keyword: "x-category",
  },
]);

async function loadSchema(uri) {
  return await readJSON(path.join("schema", uri));
}
(async () => {
  const schema = await readJSON("schema/components/button.json");
  const validFun = await ajv.compileAsync(schema);
  const data = { icon: "123", size: "xs" };
  if (!validFun(data)) console.log(validFun.errors);
  console.log(data);
})();
