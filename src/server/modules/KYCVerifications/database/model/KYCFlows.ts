import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from '../../../../../lib/database/sequelize';
import type { KYCVerificationFlows, KYCVerificationFlowsId } from './KYCVerificationFlows';

export interface KYCFlowsAttributes {
  FlowID: string;
  Description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type KYCFlowsPk = "FlowID";
export type KYCFlowsId = KYCFlows[KYCFlowsPk];
export type KYCFlowsOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type KYCFlowsCreationAttributes = Optional<KYCFlowsAttributes, KYCFlowsOptionalAttributes>;

export class KYCFlows extends Model<KYCFlowsAttributes, KYCFlowsCreationAttributes> implements KYCFlowsAttributes {
  FlowID!: string;
  Description!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // KYCFlows hasMany KYCVerificationFlows via FlowID
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

  static initModel(sequelize: Sequelize.Sequelize): typeof KYCFlows {
    return KYCFlows.init({
    FlowID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'KYCFlows',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "KYCFlows_pkey",
        unique: true,
        fields: [
          { name: "FlowID" },
        ]
      },
    ]
  });
  }
}
