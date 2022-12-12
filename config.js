/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const StyleDictionary = require("style-dictionary");
const JsonSetsFormatter = require("style-dictionary-sets").JsonSetsFormatter;
const NameKebabTransfom = require("style-dictionary-sets").NameKebabTransfom;
const DroverJsonFormatter =
  require("style-dictionary-sets").DroverJsonFormatter;
const AttributeSetsTransform =
  require("style-dictionary-sets").AttributeSetsTransform;

StyleDictionary.registerTransform(AttributeSetsTransform);
StyleDictionary.registerTransform(NameKebabTransfom);
StyleDictionary.registerFormat(JsonSetsFormatter);
StyleDictionary.registerFormat(DroverJsonFormatter);

module.exports = {
  source: ["tokens/**/*.json"],
  platforms: {
    JSON: {
      buildPath: "dist/json/",
      transforms: [NameKebabTransfom.name],
      files: [
        {
          destination: "variables.json",
          format: JsonSetsFormatter.name,
          options: {
            showFileHeader: false,
            outputReferences: true,
          },
        },
      ],
    },
    Drover: {
      buildPath: "dist/json/",
      transforms: [AttributeSetsTransform.name, NameKebabTransfom.name],
      files: [
        {
          destination: "drover.json",
          format: "drover/json/sets",
          options: {
            showFileHeader: false,
            outputReferences: true,
          },
        },
      ],
    },
  },
};
