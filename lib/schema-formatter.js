const camel2title = (camelCase) =>
  camelCase
    .replace(/([A-Z])/g, (match) => ` ${match.toLowerCase()}`)
    .replace(/^./, (match) => match.toLowerCase())
    .trim();

const schemaFormatter = (schemaObj) => {
  const options = Object.keys(schemaObj.properties).map((propName, index) => {
    const propObj = schemaObj.properties[propName];
    const description = "description" in propObj ? propObj.description : null;
    const defaultProp = "default" in propObj ? propObj.default : "–";
    // console.log(propObj);
    return {
      sort: index,
      description,
      property: camel2title(propName),
      default: defaultProp,
    };
  });
  return { options };
};

module.exports = schemaFormatter;

/* 
"values": "text / nothing",
"sort": 0,
"description": null,
"property": "label",
"default": "–"
*/
