import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from '../../../../../lib/database/sequelize';
import type { KYCVerificationFlows, KYCVerificationFlowsId } from './KYCVerificationFlows';

export interface KYCVerificationFlowStatusAttributes {
  IdKYCVerificationFlowStatus: number;
  Description: string;
}

export type KYCVerificationFlowStatusPk = "IdKYCVerificationFlowStatus";
export type KYCVerificationFlowStatusId = KYCVerificationFlowStatus[KYCVerificationFlowStatusPk];
export type KYCVerificationFlowStatusCreationAttributes = KYCVerificationFlowStatusAttributes;

export class KYCVerificationFlowStatus extends Model<KYCVerificationFlowStatusAttributes, KYCVerificationFlowStatusCreationAttributes> implements KYCVerificationFlowStatusAttributes {
  IdKYCVerificationFlowStatus!: number;
  Description!: string;

  // KYCVerificationFlowStatus hasMany KYCVerificationFlows via IdKYCVerificationFlowStatus
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

  static initModel(sequelize: Sequelize.Sequelize): typeof KYCVerificationFlowStatus {
    return KYCVerificationFlowStatus.init({
    IdKYCVerificationFlowStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'KYCVerificationFlowStatus',
    schema: 'public',
    timestamps: false,
    paranoid: false,
    indexes: [
      {
        name: "KYCVerificationFlowStatus_pkey",
        unique: true,
        fields: [
          { name: "IdKYCVerificationFlowStatus" },
        ]
      },
    ]
  });
  }
}
