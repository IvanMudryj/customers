import { sequelize } from "../../../../lib/database/sequelize";

import { KYCFlows as _KYCFlows } from "./model/KYCFlows";
import type { KYCFlowsAttributes, KYCFlowsCreationAttributes } from "./model/KYCFlows";
import { KYCVerificationFlowStatus as _KYCVerificationFlowStatus } from "./model/KYCVerificationFlowStatus";
import type { KYCVerificationFlowStatusAttributes, KYCVerificationFlowStatusCreationAttributes } from "./model/KYCVerificationFlowStatus";
import { KYCVerificationFlowSteps as _KYCVerificationFlowSteps } from "./model/KYCVerificationFlowSteps";
import type { KYCVerificationFlowStepsAttributes, KYCVerificationFlowStepsCreationAttributes } from "./model/KYCVerificationFlowSteps";
import { KYCVerificationFlows as _KYCVerificationFlows } from "./model/KYCVerificationFlows";
import type { KYCVerificationFlowsAttributes, KYCVerificationFlowsCreationAttributes } from "./model/KYCVerificationFlows";
import { KYCVerificationStatus as _KYCVerificationStatus } from "./model/KYCVerificationStatus";
import type { KYCVerificationStatusAttributes, KYCVerificationStatusCreationAttributes } from "./model/KYCVerificationStatus";
import { KYCVerifications as _KYCVerifications } from "./model/KYCVerifications";
import type { KYCVerificationsAttributes, KYCVerificationsCreationAttributes } from "./model/KYCVerifications";
import { KYCVerificationsInputs as _KYCVerificationsInputs } from "./model/KYCVerificationsInputs";
import type { KYCVerificationsInputsAttributes, KYCVerificationsInputsCreationAttributes } from "./model/KYCVerificationsInputs";

export {
  _KYCFlows as KYCFlows,
  _KYCVerificationFlowStatus as KYCVerificationFlowStatus,
  _KYCVerificationFlowSteps as KYCVerificationFlowSteps,
  _KYCVerificationFlows as KYCVerificationFlows,
  _KYCVerificationStatus as KYCVerificationStatus,
  _KYCVerifications as KYCVerifications,
  _KYCVerificationsInputs as KYCVerificationsInputs,
};

export type {
  KYCFlowsAttributes,
  KYCFlowsCreationAttributes,
  KYCVerificationFlowStatusAttributes,
  KYCVerificationFlowStatusCreationAttributes,
  KYCVerificationFlowStepsAttributes,
  KYCVerificationFlowStepsCreationAttributes,
  KYCVerificationFlowsAttributes,
  KYCVerificationFlowsCreationAttributes,
  KYCVerificationStatusAttributes,
  KYCVerificationStatusCreationAttributes,
  KYCVerificationsAttributes,
  KYCVerificationsCreationAttributes,
  KYCVerificationsInputsAttributes,
  KYCVerificationsInputsCreationAttributes,
};

const oKYCFlows = _KYCFlows.initModel(sequelize);
const oKYCVerificationFlowStatus = _KYCVerificationFlowStatus.initModel(sequelize);
const oKYCVerificationFlowSteps = _KYCVerificationFlowSteps.initModel(sequelize);
const oKYCVerificationFlows = _KYCVerificationFlows.initModel(sequelize);
const oKYCVerificationStatus = _KYCVerificationStatus.initModel(sequelize);
const oKYCVerifications = _KYCVerifications.initModel(sequelize);
const oKYCVerificationsInputs = _KYCVerificationsInputs.initModel(sequelize);

oKYCVerificationFlows.belongsTo(oKYCFlows, { as: "Flow", foreignKey: "FlowID"});
oKYCFlows.hasMany(oKYCVerificationFlows, { as: "KYCVerificationFlows", foreignKey: "FlowID"});
oKYCVerificationFlows.belongsTo(oKYCVerificationFlowStatus, { as: "IdKYCVerificationFlowStatus_KYCVerificationFlowStatus", foreignKey: "IdKYCVerificationFlowStatus"});
oKYCVerificationFlowStatus.hasMany(oKYCVerificationFlows, { as: "KYCVerificationFlows", foreignKey: "IdKYCVerificationFlowStatus"});
oKYCVerificationFlowSteps.belongsTo(oKYCVerificationFlows, { as: "IdKYCVerificationFlow_KYCVerificationFlow", foreignKey: "IdKYCVerificationFlow"});
oKYCVerificationFlows.hasMany(oKYCVerificationFlowSteps, { as: "KYCVerificationFlowSteps", foreignKey: "IdKYCVerificationFlow"});
oKYCVerifications.belongsTo(oKYCVerificationStatus, { as: "IdKYCVerificationStatus_KYCVerificationStatus", foreignKey: "IdKYCVerificationStatus"});
oKYCVerificationStatus.hasMany(oKYCVerifications, { as: "KYCVerifications", foreignKey: "IdKYCVerificationStatus"});
oKYCVerificationFlows.belongsTo(oKYCVerifications, { as: "IdKYCVerification_KYCVerification", foreignKey: "IdKYCVerification"});
oKYCVerifications.hasMany(oKYCVerificationFlows, { as: "KYCVerificationFlows", foreignKey: "IdKYCVerification"});
oKYCVerificationsInputs.belongsTo(oKYCVerifications, { as: "IdKYCVerification_KYCVerification", foreignKey: "IdKYCVerification"});
oKYCVerifications.hasMany(oKYCVerificationsInputs, { as: "KYCVerificationsInputs", foreignKey: "IdKYCVerification"});
