import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo } from "sequelize-typescript";
import { IKYCVerificationStatus } from "../../domain/interface";
import { ModelKYCVerifications } from "./ModelKYCVerifications";

@Table({ tableName: "KYCVerificationStatus", schema: "public", timestamps: false })
export class ModelKYCVerificationStatus extends Model<IKYCVerificationStatus, IKYCVerificationStatus> implements IKYCVerificationStatus {
  @ForeignKey(() => ModelKYCVerifications)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: "KYCVerificationStatus_pkey", using: "btree", unique: true })
    IdKYCVerificationStatus!: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
    Description?: string;

  @BelongsTo(() => ModelKYCVerifications)
    KYCVerification?: ModelKYCVerifications;
}
