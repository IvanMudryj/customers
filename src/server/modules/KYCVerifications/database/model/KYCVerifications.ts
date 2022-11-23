import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from '../../../../../lib/database/sequelize';
import type { KYCVerificationFlows, KYCVerificationFlowsId } from './KYCVerificationFlows';
import type { KYCVerificationStatus, KYCVerificationStatusId } from './KYCVerificationStatus';
import type { KYCVerificationsInputs, KYCVerificationsInputsId } from './KYCVerificationsInputs';
import { V4UUID } from '../../interfaces/FlowMetadata.interface';

export interface KYCVerificationsAttributes {
  IdKYCVerification?: V4UUID;
  IdKYCVerificationStatus: number;
  Identity?: string;
  Request: object;
  Response?: object;
  ResponseStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type KYCVerificationsPk = "IdKYCVerification";
export type KYCVerificationsId = KYCVerifications[KYCVerificationsPk];
export type KYCVerificationsOptionalAttributes = "IdKYCVerification" | "Identity" | "Response" | "ResponseStatus" | "createdAt" | "updatedAt" | "deletedAt";
export type KYCVerificationsCreationAttributes = Optional<KYCVerificationsAttributes, KYCVerificationsOptionalAttributes>;

export class KYCVerifications extends Model<KYCVerificationsAttributes, KYCVerificationsCreationAttributes> implements KYCVerificationsAttributes {
  IdKYCVerification?: V4UUID;
  IdKYCVerificationStatus!: number;
  Identity?: string;
  Request!: object;
  Response?: object;
  ResponseStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // KYCVerifications belongsTo KYCVerificationStatus via IdKYCVerificationStatus
  IdKYCVerificationStatus_KYCVerificationStatus!: KYCVerificationStatus;
  getIdKYCVerificationStatus_KYCVerificationStatus!: Sequelize.BelongsToGetAssociationMixin<KYCVerificationStatus>;
  setIdKYCVerificationStatus_KYCVerificationStatus!: Sequelize.BelongsToSetAssociationMixin<KYCVerificationStatus, KYCVerificationStatusId>;
  createIdKYCVerificationStatus_KYCVerificationStatus!: Sequelize.BelongsToCreateAssociationMixin<KYCVerificationStatus>;
  // KYCVerifications hasMany KYCVerificationFlows via IdKYCVerification
  KYCVerificationFlows!: KYCVerificationFlows[];
  getKYCVerificationFlows!: Sequelize.HasManyGetAssociationsMixin<KYCVerificationFlows>;
  setKYCVerificationFlows!: Sequelize.HasManySetAssociationsMixin<KYCVerificationFlows, KYCVerificationFlowsId>;
  addKYCVerificationFlow!: Sequelize.HasManyAddAssociationMixin<KYCVerificationFlows, KYCVerificationFlowsId>;
  addKYCVerificationFlows!: Sequelize.HasManyAddAssociationsMixin<KYCVerificationFlows, KYCVerificationFlowsId>;
  createKYCVerificationFlow!: Sequelize.HasManyCreateAssociationMixin<KYCVerificationFlows>;
  removeKYCVerificationFlow!: Sequelize.HasManyRemoveAssociationMixin<KYCVerificationFlows, KYCVerificationFlowsId>;
  removeKYCVerificationFlows!: Sequelize.HasManyRemoveAssociationsMixin<KYCVerificationFlows, KYCVerificationFlowsId>;
  hasKYCVerificationFlow!: Sequelize.HasManyHasAssociationMixin<KYCVerificationFlows, KYCVerificationFlowsId>;
  hasKYCVerificationFlows!: Sequelize.HasManyHasAssociationsMixin<KYCVerificationFlows, KYCVerificationFlowsId>;
  countKYCVerificationFlows!: Sequelize.HasManyCountAssociationsMixin;
  // KYCVerifications hasMany KYCVerificationsInputs via IdKYCVerification
  KYCVerificationsInputs!: KYCVerificationsInputs[];
  getKYCVerificationsInputs!: Sequelize.HasManyGetAssociationsMixin<KYCVerificationsInputs>;
  setKYCVerificationsInputs!: Sequelize.HasManySetAssociationsMixin<KYCVerificationsInputs, KYCVerificationsInputsId>;
  addKYCVerificationsInput!: Sequelize.HasManyAddAssociationMixin<KYCVerificationsInputs, KYCVerificationsInputsId>;
  addKYCVerificationsInputs!: Sequelize.HasManyAddAssociationsMixin<KYCVerificationsInputs, KYCVerificationsInputsId>;
  createKYCVerificationsInput!: Sequelize.HasManyCreateAssociationMixin<KYCVerificationsInputs>;
  removeKYCVerificationsInput!: Sequelize.HasManyRemoveAssociationMixin<KYCVerificationsInputs, KYCVerificationsInputsId>;
  removeKYCVerificationsInputs!: Sequelize.HasManyRemoveAssociationsMixin<KYCVerificationsInputs, KYCVerificationsInputsId>;
  hasKYCVerificationsInput!: Sequelize.HasManyHasAssociationMixin<KYCVerificationsInputs, KYCVerificationsInputsId>;
  hasKYCVerificationsInputs!: Sequelize.HasManyHasAssociationsMixin<KYCVerificationsInputs, KYCVerificationsInputsId>;
  countKYCVerificationsInputs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof KYCVerifications {
    return KYCVerifications.init({
    IdKYCVerification: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    IdKYCVerificationStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'KYCVerificationStatus',
        key: 'IdKYCVerificationStatus'
      }
    },
    Identity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Request: {
      type: DataTypes.JSON,
      allowNull: false
    },
    Response: {
      type: DataTypes.JSON,
      allowNull: true
    },
    ResponseStatus: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'KYCVerifications',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "KYCVerifications_pkey",
        unique: true,
        fields: [
          { name: "IdKYCVerification" },
        ]
      },
    ]
  });
  }
}
