const Ajv = require("ajv");
const { readFile } = require("fs").promises;
const path = require("path");

const readJSON = async (filePath) =>
  JSON.parse(await readFile(filePath, "utf8"));

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
  const schema = await readJSON("schema/components/picker.json");
  const validFun = await ajv.compileAsync(schema);
  const data = { size: "s" };
  if (!validFun(data)) console.log(validFun.errors);
  console.log(data);
})();
