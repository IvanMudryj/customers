import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from '../../../../../lib/database/sequelize';
import type { KYCVerifications, KYCVerificationsId } from './KYCVerifications';

export interface KYCVerificationStatusAttributes {
  IdKYCVerificationStatus: number;
  Description: string;
}

export type KYCVerificationStatusPk = "IdKYCVerificationStatus";
export type KYCVerificationStatusId = KYCVerificationStatus[KYCVerificationStatusPk];
export type KYCVerificationStatusCreationAttributes = KYCVerificationStatusAttributes;

export class KYCVerificationStatus extends Model<KYCVerificationStatusAttributes, KYCVerificationStatusCreationAttributes> implements KYCVerificationStatusAttributes {
  IdKYCVerificationStatus!: number;
  Description!: string;

  // KYCVerificationStatus hasMany KYCVerifications via IdKYCVerificationStatus
  KYCVerifications!: KYCVerifications[];
  getKYCVerifications!: Sequelize.HasManyGetAssociationsMixin<KYCVerifications>;
  setKYCVerifications!: Sequelize.HasManySetAssociationsMixin<KYCVerifications, KYCVerificationsId>;
  addKYCVerification!: Sequelize.HasManyAddAssociationMixin<KYCVerifications, KYCVerificationsId>;
  addKYCVerifications!: Sequelize.HasManyAddAssociationsMixin<KYCVerifications, KYCVerificationsId>;
  createKYCVerification!: Sequelize.HasManyCreateAssociationMixin<KYCVerifications>;
  removeKYCVerification!: Sequelize.HasManyRemoveAssociationMixin<KYCVerifications, KYCVerificationsId>;
  removeKYCVerifications!: Sequelize.HasManyRemoveAssociationsMixin<KYCVerifications, KYCVerificationsId>;
  hasKYCVerification!: Sequelize.HasManyHasAssociationMixin<KYCVerifications, KYCVerificationsId>;
  hasKYCVerifications!: Sequelize.HasManyHasAssociationsMixin<KYCVerifications, KYCVerificationsId>;
  countKYCVerifications!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof KYCVerificationStatus {
    return KYCVerificationStatus.init({
    IdKYCVerificationStatus: {
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
    tableName: 'KYCVerificationStatus',
    schema: 'public',
    timestamps: false,
    paranoid: false,
    indexes: [
      {
        name: "KYCVerificationStatus_pkey",
        unique: true,
        fields: [
          { name: "IdKYCVerificationStatus" },
        ]
      },
    ]
  });
  }
}
