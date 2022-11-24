import path from "path";
import { Sequelize, Model } from "sequelize-typescript";
import config from "../../../config";

const sequelize = new Sequelize({
  database: config.sqlDb.name,
  username: config.sqlDb.user,
  password: config.sqlDb.pass,
  host: config.sqlDb.host,
  dialect: config.sqlDb.dialect,
  /*models: [
    path.resolve('./src/server/modules/KYCVerifications/database/model/KYCFlows.ts'),
    path.resolve('./src/server/modules/KYCVerifications/database/model/KYCVerificationFlowStatus.ts'),
    path.resolve('./src/server/modules/KYCVerifications/database/model/KYCVerificationFlowSteps.ts'),
    path.resolve('./src/server/modules/KYCVerifications/database/model/KYCVerificationsInputs.ts'),
    path.resolve('./src/server/modules/KYCVerifications/database/model/KYCVerificationFlows.ts'),
    path.resolve('./src/server/modules/KYCVerifications/database/model/KYCVerificationStatus.ts'),
    path.resolve('./src/server/modules/KYCVerifications/database/model/KYCVerifications.ts')
  ]*/
});

export { sequelize, Model };
