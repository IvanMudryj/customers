import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import { ModelKYCVerificationStatus } from "./ModelKYCVerificationStatus";
import { ModelKYCVerificationsInputs } from "./ModelKYCVerificationsInputs";
import { ModelKYCVerificationFlows } from "./ModelKYCVerificationFlows";
import { V4UUID } from "../../interfaces/FlowMetadata.interface";
import { IKYCVerification } from "../../domain/interface";

@Table({ tableName: "KYCVerifications", schema: "public", timestamps: true })
export class ModelKYCVerifications extends Model<IKYCVerification, IKYCVerification> implements IKYCVerification {
  @Column({ primaryKey: true, type: DataType.UUID })
  @Index({ name: "KYCVerifications_pkey", using: "btree", unique: true })
    IdKYCVerification!: V4UUID;

  @ForeignKey(() => ModelKYCVerificationStatus)
  @Column({ allowNull: true, type: DataType.INTEGER })
    IdKYCVerificationStatus?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
    Identity?: string;

  @Column({ allowNull: true, type: DataType.JSON })
    Request?: object;

  @Column({ allowNull: true, type: DataType.JSON })
    Response?: object;

  @Column({ allowNull: true, type: DataType.STRING(255) })
    ResponseStatus?: string;

  @Column({ allowNull: true, type: DataType.JSON })
    VerificationData?: object;

  @Column({ allowNull: true, type: DataType.JSON })
    CallbackConfig?: object;

  @BelongsTo(() => ModelKYCVerificationStatus)
    KYCVerificationStatus?: ModelKYCVerificationStatus;

  @HasMany(() => ModelKYCVerificationsInputs)
    KYCVerificationsInputs?: ModelKYCVerificationsInputs[];

  @HasMany(() => ModelKYCVerificationFlows)
    KYCVerificationFlows?: ModelKYCVerificationFlows[];
}
