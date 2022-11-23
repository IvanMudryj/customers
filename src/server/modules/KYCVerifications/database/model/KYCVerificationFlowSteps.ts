import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from '../../../../../lib/database/sequelize';
import type { KYCVerificationFlows, KYCVerificationFlowsId } from './KYCVerificationFlows';

export interface KYCVerificationFlowStepsAttributes {
  IdKYCVerificationFlowStep: number;
  IdKYCVerificationFlow: number;
  StepIdentifier: string;
  EventCode: string;
  EventBody: object;
  EventError?: object;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type KYCVerificationFlowStepsPk = "IdKYCVerificationFlowStep";
export type KYCVerificationFlowStepsId = KYCVerificationFlowSteps[KYCVerificationFlowStepsPk];
export type KYCVerificationFlowStepsOptionalAttributes = "EventError" | "createdAt" | "updatedAt" | "deletedAt";
export type KYCVerificationFlowStepsCreationAttributes = Optional<KYCVerificationFlowStepsAttributes, KYCVerificationFlowStepsOptionalAttributes>;

export class KYCVerificationFlowSteps extends Model<KYCVerificationFlowStepsAttributes, KYCVerificationFlowStepsCreationAttributes> implements KYCVerificationFlowStepsAttributes {
  IdKYCVerificationFlowStep!: number;
  IdKYCVerificationFlow!: number;
  StepIdentifier!: string;
  EventCode!: string;
  EventBody!: object;
  EventError?: object;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // KYCVerificationFlowSteps belongsTo KYCVerificationFlows via IdKYCVerificationFlow
  IdKYCVerificationFlow_KYCVerificationFlow!: KYCVerificationFlows;
  getIdKYCVerificationFlow_KYCVerificationFlow!: Sequelize.BelongsToGetAssociationMixin<KYCVerificationFlows>;
  setIdKYCVerificationFlow_KYCVerificationFlow!: Sequelize.BelongsToSetAssociationMixin<KYCVerificationFlows, KYCVerificationFlowsId>;
  createIdKYCVerificationFlow_KYCVerificationFlow!: Sequelize.BelongsToCreateAssociationMixin<KYCVerificationFlows>;

  static initModel(sequelize: Sequelize.Sequelize): typeof KYCVerificationFlowSteps {
    return KYCVerificationFlowSteps.init({
    IdKYCVerificationFlowStep: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IdKYCVerificationFlow: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'KYCVerificationFlows',
        key: 'IdKYCVerificationFlow'
      }
    },
    StepIdentifier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EventCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EventBody: {
      type: DataTypes.JSON,
      allowNull: false
    },
    EventError: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'KYCVerificationFlowSteps',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "KYCVerificationFlowSteps_pkey",
        unique: true,
        fields: [
          { name: "IdKYCVerificationFlowStep" },
        ]
      },
    ]
  });
  }
}
