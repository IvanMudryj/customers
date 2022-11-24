import { Sequelize } from "sequelize-typescript";
import { ModelKYCVerificationFlowStatus } from "./ModelKYCVerificationFlowStatus";
import { ModelKYCVerificationFlowSteps } from "./ModelKYCVerificationFlowSteps";
import { ModelKYCVerificationStatus } from "./ModelKYCVerificationStatus";
import { ModelKYCVerifications } from "./ModelKYCVerifications";
import { ModelKYCVerificationsInputs } from "./ModelKYCVerificationsInputs";
import { ModelKYCVerificationFlows } from "./ModelKYCVerificationFlows";
import { ModelKYCFlows } from "./ModelKYCFlows";

const loadAllModels = (sequelize:Sequelize) => {
    sequelize.addModels([__dirname + '/Model*.ts']);
}

export {
    loadAllModels,
    ModelKYCVerificationFlowStatus as KYCVerificationFlowStatus,
    ModelKYCVerificationFlowSteps as KYCVerificationFlowSteps,
    ModelKYCVerificationStatus as KYCVerificationStatus,
    ModelKYCVerifications as KYCVerifications,
    ModelKYCVerificationsInputs as KYCVerificationsInputs,
    ModelKYCVerificationFlows as KYCVerificationFlows,
    ModelKYCFlows as KYCFlows
}