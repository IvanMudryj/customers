import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { ModelKYCVerifications } from "./ModelKYCVerifications";
import { ModelKYCVerificationFlowSteps } from "./ModelKYCVerificationFlowSteps";
import { ModelKYCVerificationFlowStatus } from "./ModelKYCVerificationFlowStatus";
import { IKYCVerificationFlows } from "../../domain/interface";

@Table({ tableName: "KYCVerificationFlows", schema: "public", timestamps: true })
export class ModelKYCVerificationFlows extends Model<IKYCVerificationFlows, IKYCVerificationFlows> implements IKYCVerificationFlows {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: "KYCVerificationFlows_pkey", using: "btree", unique: true })
    IdKYCVerificationFlow!: number;

  @ForeignKey(() => ModelKYCVerifications)
  @Column({ allowNull: true, type: DataType.UUID })
    IdKYCVerification!: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
    IdKYCVerificationFlowStatus!: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
    SessionJWT?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
    FlowID?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
    ResourceUrl?: string;

  @Column({ allowNull: true, type: DataType.JSON })
    ResourceBody?: object;

  @BelongsTo(() => ModelKYCVerifications)
    KYCVerification?: ModelKYCVerifications;

  @HasMany(() => ModelKYCVerificationFlowSteps, { sourceKey: "IdKYCVerificationFlow" })
    KYCVerificationFlowSteps?: ModelKYCVerificationFlowSteps[];

  @HasMany(() => ModelKYCVerificationFlowStatus, { sourceKey: "IdKYCVerificationFlowStatus" })
    KYCVerificationFlowStatuses?: ModelKYCVerificationFlowStatus[];
}
