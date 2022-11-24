import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, HasMany } from "sequelize-typescript";
import { ModelKYCVerificationStatus } from "./ModelKYCVerificationStatus";
import { ModelKYCVerificationsInputs } from "./ModelKYCVerificationsInputs";
import { ModelKYCVerificationFlows } from "./ModelKYCVerificationFlows";
import { V4UUID } from "../../interfaces/FlowMetadata.interface";
import { IKYCVerifications } from "../../domain/interface";

@Table({ tableName: "KYCVerifications", schema: "public", timestamps: false })
export class ModelKYCVerifications extends Model<IKYCVerifications, IKYCVerifications> implements IKYCVerifications {
  @Column({ primaryKey: true, type: DataType.UUID })
  @Index({ name: "KYCVerifications_pkey", using: "btree", unique: true })
    IdKYCVerification!: V4UUID;

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

  @Column({ allowNull: true, type: DataType.DATE })
    createdAt?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
    updatedAt?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
    deletedAt?: Date;

  @HasMany(() => ModelKYCVerificationStatus, { sourceKey: "IdKYCVerificationStatus" })
    KYCVerificationStatuses?: ModelKYCVerificationStatus[];

  @HasMany(() => ModelKYCVerificationsInputs, { sourceKey: "IdKYCVerification" })
    KYCVerificationsInputs?: ModelKYCVerificationsInputs[];

  @HasMany(() => ModelKYCVerificationFlows, { sourceKey: "IdKYCVerification" })
    KYCVerificationFlows?: ModelKYCVerificationFlows[];
}
