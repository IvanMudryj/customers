import glob from "glob";
import path from "path";
import { Sequelize } from "sequelize";

const loadModels = (sequelize:Sequelize) => {

  const models = glob.sync("./src/server/modules/**/model/index.ts");
  
  console.log("Loading models...", models.length);
  models.forEach(model => initModel(model, sequelize));
};

const initModel = (modelPath: string, sequelize:Sequelize) => {
  console.log("Importing models...", modelPath);
  import(path.resolve(modelPath)).then((imported) => {
    imported.loadAllModels(sequelize);
  });
};

export = loadModels;
