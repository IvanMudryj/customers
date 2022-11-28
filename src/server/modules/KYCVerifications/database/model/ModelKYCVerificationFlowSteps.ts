import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo } from "sequelize-typescript";
import { IKYCVerificationFlowStep } from "../../domain/interface";
import { ModelKYCVerificationFlows } from "./ModelKYCVerificationFlows";

@Table({ tableName: "KYCVerificationFlowSteps", schema: "public", timestamps: true })
export class ModelKYCVerificationFlowSteps extends Model<IKYCVerificationFlowStep, IKYCVerificationFlowStep> implements IKYCVerificationFlowStep {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrementIdentity: true, autoIncrement: true })
  @Index({ name: "KYCVerificationFlowSteps_pkey", using: "btree", unique: true })
    IdKYCVerificationFlowStep!: number;

  @ForeignKey(() => ModelKYCVerificationFlows)
  @Column({ allowNull: true, type: DataType.INTEGER })
    IdKYCVerificationFlow!: number;

  @Column({ allowNull: true, type: DataType.STRING(75) })
    StepIdentifier?: string;

  @Column({ allowNull: true, type: DataType.STRING(75) })
    EventCode?: string;

  @Column({ allowNull: true, type: DataType.JSON })
    EventBody?: object;

  @Column({ allowNull: true, type: DataType.JSON })
    EventError?: object;

  @BelongsTo(() => ModelKYCVerificationFlows)
    KYCVerificationFlow?: ModelKYCVerificationFlows;
}
