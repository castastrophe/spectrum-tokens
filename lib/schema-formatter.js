const camel2title = (camelCase) =>
  camelCase
    .replace(/([A-Z])/g, (match) => ` ${match.toLowerCase()}`)
    .replace(/^./, (match) => match.toLowerCase())
    .trim();

const formatSchemaProp = (schemaProp) => {
  for (const formatter of Object.values(formatters)) {
    const formattedOption = formatter(schemaProp);
    if (formattedOption) return formattedOption;
  }
};

const sizeMap = {
  xs: "extra-small",
  s: "small",
  m: "medium",
  l: "large",
  xl: "extra-large",
  xxl: "extra-extra-large",
  xxxl: "extra-extra-extra-large",
};

const booleanMap = (value) => (value ? "yes" : "no");

const formatters = {
  size: (schemaProp) => {
    return schemaProp.name == "size"
      ? {
          values: schemaProp.enum.map((size) => sizeMap[size]).join(" / "),
          default: sizeMap[schemaProp.default],
        }
      : false;
  },
  stringEnum: (schemaProp) => {
    return schemaProp.type == "string" && "enum" in schemaProp
      ? {
          values: schemaProp.required
            ? schemaProp.enum.join(" / ")
            : [...schemaProp.enum, "nothing"].join(" / "),
        }
      : false;
  },
  string: (schemaProp) => {
    return schemaProp.type == "string"
      ? { values: schemaProp.required ? "text" : "text / nothing" }
      : false;
  },
  number: (schemaProp) => {
    return schemaProp.type == "number" ? { values: "number" } : false;
  },
  boolean: (schemaProp) => {
    if (schemaProp.type == "boolean") {
      return {
        values: "yes / no",
        default: "default" in schemaProp ? booleanMap(schemaProp.default) : "–",
      };
    }
  },
  unmatchedProp: (schemaProp) => {
    console.log(schemaProp);
  },
};

const schemaFormatter = (schemaObj) => {
  const required = "required" in schemaObj ? schemaObj.required : [];
  const options = [];
  Object.keys(schemaObj.properties).forEach((propName, index) => {
    const schemaProp = {
      name: propName,
      required: required.includes(propName),
      ...schemaObj.properties[propName],
    };
    options.push({
      ...{
        sort: index,
        description:
          "description" in schemaProp ? schemaProp.description : null,
        default: "default" in schemaProp ? schemaProp.default : "–",
        property:
          "title" in schemaProp ? schemaProp.title : camel2title(propName),
      },
      ...formatSchemaProp(schemaProp),
    });
  });
  return { options };
};

module.exports = schemaFormatter;
