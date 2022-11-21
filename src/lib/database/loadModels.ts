import glob from "glob";
import path from "path";

const loadModels = () => {
  const models = glob.sync(path.join(__dirname, "../../server/modules/**/*.model.*"));
  console.log("Loading models...", models.length);
  models.forEach(model => initModel(model));
};

const initModel = (modelPath: string) => {
  console.log("Importing models...", modelPath);
  import(modelPath);
};

export = loadModels;
