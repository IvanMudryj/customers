import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from '../../../../../lib/database/sequelize';
import type { KYCVerifications, KYCVerificationsId } from './KYCVerifications';

export interface KYCVerificationsInputsAttributes {
  IdKYCVerificationInput: number;
  IdKYCVerification: string;
  InputType: string;
  Value: string;
  MetaData?: object;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type KYCVerificationsInputsPk = "IdKYCVerificationInput";
export type KYCVerificationsInputsId = KYCVerificationsInputs[KYCVerificationsInputsPk];
export type KYCVerificationsInputsOptionalAttributes = "MetaData" | "createdAt" | "updatedAt" | "deletedAt";
export type KYCVerificationsInputsCreationAttributes = Optional<KYCVerificationsInputsAttributes, KYCVerificationsInputsOptionalAttributes>;

export class KYCVerificationsInputs extends Model<KYCVerificationsInputsAttributes, KYCVerificationsInputsCreationAttributes> implements KYCVerificationsInputsAttributes {
  IdKYCVerificationInput!: number;
  IdKYCVerification!: string;
  InputType!: string;
  Value!: string;
  MetaData?: object;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // KYCVerificationsInputs belongsTo KYCVerifications via IdKYCVerification
  IdKYCVerification_KYCVerification!: KYCVerifications;
  getIdKYCVerification_KYCVerification!: Sequelize.BelongsToGetAssociationMixin<KYCVerifications>;
  setIdKYCVerification_KYCVerification!: Sequelize.BelongsToSetAssociationMixin<KYCVerifications, KYCVerificationsId>;
  createIdKYCVerification_KYCVerification!: Sequelize.BelongsToCreateAssociationMixin<KYCVerifications>;

  static initModel(sequelize: Sequelize.Sequelize): typeof KYCVerificationsInputs {
    return KYCVerificationsInputs.init({
    IdKYCVerificationInput: {
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
    InputType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MetaData: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'KYCVerificationsInputs',
    schema: 'public',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "KYCVerificationsInputs_pkey",
        unique: true,
        fields: [
          { name: "IdKYCVerificationInput" },
        ]
      },
    ]
  });
  }
}
