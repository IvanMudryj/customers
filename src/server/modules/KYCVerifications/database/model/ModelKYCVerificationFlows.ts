import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { ModelKYCVerifications } from "./ModelKYCVerifications";
import { ModelKYCVerificationFlowSteps } from "./ModelKYCVerificationFlowSteps";
import { ModelKYCVerificationFlowStatus } from "./ModelKYCVerificationFlowStatus";
import { IKYCVerificationFlows } from "../../domain/interface";

@Table({ tableName: "KYCVerificationFlows", schema: "public", timestamps: true })
export class ModelKYCVerificationFlows extends Model<IKYCVerificationFlows, IKYCVerificationFlows> implements IKYCVerificationFlows {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrementIdentity: true, autoIncrement: true })
  @Index({ name: "KYCVerificationFlows_pkey", using: "btree", unique: true })
    IdKYCVerificationFlow!: number;

  @ForeignKey(() => ModelKYCVerifications)
  @Column({ allowNull: true, type: DataType.UUID })
    IdKYCVerification!: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
    IdKYCVerificationFlowStatus!: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
    MetaData?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
    FlowID?: string;

  @Index({ name: "ResourceID_unique", using: "btree", unique: true })
  @Column({ allowNull: true, type: DataType.STRING(25) })
    ResourceID?: string;

  @Column({ allowNull: true, type: DataType.JSON })
    ResourceBody?: object;

  @BelongsTo(() => ModelKYCVerifications)
    KYCVerification?: ModelKYCVerifications;

  @HasMany(() => ModelKYCVerificationFlowSteps)
    KYCVerificationFlowSteps?: ModelKYCVerificationFlowSteps[];

  @HasMany(() => ModelKYCVerificationFlowStatus)
    KYCVerificationFlowStatuses?: ModelKYCVerificationFlowStatus[];
}
