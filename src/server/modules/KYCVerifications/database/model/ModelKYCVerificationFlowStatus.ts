import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo } from "sequelize-typescript";
import { IKYCVerificationFlowStatus } from "../../domain/interface";
import { ModelKYCVerificationFlows } from "./ModelKYCVerificationFlows";

@Table({ tableName: "KYCVerificationFlowStatus", schema: "public", timestamps: false })
export class ModelKYCVerificationFlowStatus extends Model<IKYCVerificationFlowStatus, IKYCVerificationFlowStatus> implements IKYCVerificationFlowStatus {
  @ForeignKey(() => ModelKYCVerificationFlows)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: "KYCVerificationFlowStatus_pkey", using: "btree", unique: true })
    IdKYCVerificationFlowStatus!: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
    Description?: string;

  @BelongsTo(() => ModelKYCVerificationFlows)
    KYCVerificationFlow?: ModelKYCVerificationFlows;
}
