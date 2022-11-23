import glob from "glob";
import path from "path";
import sequelize from "sequelize";

const loadModels = () => {

  const models = glob.sync("./src/server/modules/**/*init-models.ts");
  
  console.log("Loading models...", models.length);
  models.forEach(model => initModel(model));
};

const initModel = (modelPath: string) => {
  console.log("Importing models...", modelPath);
  import(path.resolve(modelPath));
};

export = loadModels;
