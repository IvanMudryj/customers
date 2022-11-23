import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from '../../../../../lib/database/sequelize';
import type { KYCFlows, KYCFlowsId } from './KYCFlows';
import type { KYCVerificationFlowStatus, KYCVerificationFlowStatusId } from './KYCVerificationFlowStatus';
import type { KYCVerificationFlowSteps, KYCVerificationFlowStepsId } from './KYCVerificationFlowSteps';
import type { KYCVerifications, KYCVerificationsId } from './KYCVerifications';

export interface KYCVerificationFlowsAttributes {
  IdKYCVerificationFlow: number;
  IdKYCVerification: string;
  IdKYCVerificationFlowStatus: number;
  SessionJWT: string;
  FlowID: string;
  ResourceUrl: string;
  ResourceBody?: object;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type KYCVerificationFlowsPk = "IdKYCVerificationFlow";
export type KYCVerificationFlowsId = KYCVerificationFlows[KYCVerificationFlowsPk];
export type KYCVerificationFlowsOptionalAttributes = "ResourceBody" | "createdAt" | "updatedAt" | "deletedAt";
export type KYCVerificationFlowsCreationAttributes = Optional<KYCVerificationFlowsAttributes, KYCVerificationFlowsOptionalAttributes>;

export class KYCVerificationFlows extends Model<KYCVerificationFlowsAttributes, KYCVerificationFlowsCreationAttributes> implements KYCVerificationFlowsAttributes {
  IdKYCVerificationFlow!: number;
  IdKYCVerification!: string;
  IdKYCVerificationFlowStatus!: number;
  SessionJWT!: string;
  FlowID!: string;
  ResourceUrl!: string;
  ResourceBody?: object;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // KYCVerificationFlows belongsTo KYCFlows via FlowID
  Flow!: KYCFlows;
  getFlow!: Sequelize.BelongsToGetAssociationMixin<KYCFlows>;
  setFlow!: Sequelize.BelongsToSetAssociationMixin<KYCFlows, KYCFlowsId>;
  createFlow!: Sequelize.BelongsToCreateAssociationMixin<KYCFlows>;
  // KYCVerificationFlows belongsTo KYCVerificationFlowStatus via IdKYCVerificationFlowStatus
  IdKYCVerificationFlowStatus_KYCVerificationFlowStatus!: KYCVerificationFlowStatus;
  getIdKYCVerificationFlowStatus_KYCVerificationFlowStatus!: Sequelize.BelongsToGetAssociationMixin<KYCVerificationFlowStatus>;
  setIdKYCVerificationFlowStatus_KYCVerificationFlowStatus!: Sequelize.BelongsToSetAssociationMixin<KYCVerificationFlowStatus, KYCVerificationFlowStatusId>;
  createIdKYCVerificationFlowStatus_KYCVerificationFlowStatus!: Sequelize.BelongsToCreateAssociationMixin<KYCVerificationFlowStatus>;
  // KYCVerificationFlows hasMany KYCVerificationFlowSteps via IdKYCVerificationFlow
  KYCVerificationFlowSteps!: KYCVerificationFlowSteps[];
  getKYCVerificationFlowSteps!: Sequelize.HasManyGetAssociationsMixin<KYCVerificationFlowSteps>;
  setKYCVerificationFlowSteps!: Sequelize.HasManySetAssociationsMixin<KYCVerificationFlowSteps, KYCVerificationFlowStepsId>;
  addKYCVerificationFlowStep!: Sequelize.HasManyAddAssociationMixin<KYCVerificationFlowSteps, KYCVerificationFlowStepsId>;
  addKYCVerificationFlowSteps!: Sequelize.HasManyAddAssociationsMixin<KYCVerificationFlowSteps, KYCVerificationFlowStepsId>;
  createKYCVerificationFlowStep!: Sequelize.HasManyCreateAssociationMixin<KYCVerificationFlowSteps>;
  removeKYCVerificationFlowStep!: Sequelize.HasManyRemoveAssociationMixin<KYCVerificationFlowSteps, KYCVerificationFlowStepsId>;
  removeKYCVerificationFlowSteps!: Sequelize.HasManyRemoveAssociationsMixin<KYCVerificationFlowSteps, KYCVerificationFlowStepsId>;
  hasKYCVerificationFlowStep!: Sequelize.HasManyHasAssociationMixin<KYCVerificationFlowSteps, KYCVerificationFlowStepsId>;
  hasKYCVerificationFlowSteps!: Sequelize.HasManyHasAssociationsMixin<KYCVerificationFlowSteps, KYCVerificationFlowStepsId>;
  countKYCVerificationFlowSteps!: Sequelize.HasManyCountAssociationsMixin;
  // KYCVerificationFlows belongsTo KYCVerifications via IdKYCVerification
  IdKYCVerification_KYCVerification!: KYCVerifications;
  getIdKYCVerification_KYCVerification!: Sequelize.BelongsToGetAssociationMixin<KYCVerifications>;
  setIdKYCVerification_KYCVerification!: Sequelize.BelongsToSetAssociationMixin<KYCVerifications, KYCVerificationsId>;
  createIdKYCVerification_KYCVerification!: Sequelize.BelongsToCreateAssociationMixin<KYCVerifications>;

  static initModel(sequelize: Sequelize.Sequelize): typeof KYCVerificationFlows {
    return KYCVerificationFlows.init({
    IdKYCVerificationFlow: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    IdKYCVerification: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'KYCVerifications',
        key: 'IdKYCVerification'
      }
    },
    IdKYCVerificationFlowStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'KYCVerificationFlowStatus',
        key: 'IdKYCVerificationFlowStatus'
      }
    },
    SessionJWT: {
      type: DataTypes.STRING,
      allowNull: false
    },
    FlowID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'KYCFlows',
        key: 'FlowID'
      }
    },
    ResourceUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ResourceBody: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'KYCVerificationFlows',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "KYCVerificationFlows_pkey",
        unique: true,
        fields: [
          { name: "IdKYCVerificationFlow" },
        ]
      },
    ]
  });
  }
}
