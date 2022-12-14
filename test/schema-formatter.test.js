const schemaFormatter = require("../lib/schema-formatter.js");
const { readFile } = require("fs").promises;

const readJSON = async (filePath) =>
  JSON.parse(await readFile(filePath, "utf8"));

test("Schema formatter", async () => {
  const pickerSchema = await readJSON("schema/components/picker.json");
  const pickerFixture = await readJSON("test/fixtures/picker.json");
  expect(schemaFormatter(pickerSchema)).toBe(true);
});
