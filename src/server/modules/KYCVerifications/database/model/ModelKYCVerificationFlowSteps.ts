import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo } from "sequelize-typescript";
import { IKYCVerificationFlowSteps } from "../../domain/interface";
import { ModelKYCVerificationFlows } from "./ModelKYCVerificationFlows";

@Table({ tableName: "KYCVerificationFlowSteps", schema: "public", timestamps: true })
export class ModelKYCVerificationFlowSteps extends Model<IKYCVerificationFlowSteps, IKYCVerificationFlowSteps> implements IKYCVerificationFlowSteps {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: "KYCVerificationFlowSteps_pkey", using: "btree", unique: true })
    IdKYCVerificationFlowStep!: number;

  @ForeignKey(() => ModelKYCVerificationFlows)
  @Column({ allowNull: true, type: DataType.INTEGER })
    IdKYCVerificationFlow?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
    StepIdentifier?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
    EventCode?: string;

  @Column({ allowNull: true, type: DataType.JSON })
    EventBody?: object;

  @Column({ allowNull: true, type: DataType.JSON })
    EventError?: object;

  @BelongsTo(() => ModelKYCVerificationFlows)
    KYCVerificationFlow?: ModelKYCVerificationFlows;
}
