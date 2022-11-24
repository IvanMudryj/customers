import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo } from "sequelize-typescript";
import { IKYCVerificationsInputs } from "../../domain/interface";
import { V4UUID } from "../../interfaces/FlowMetadata.interface";
import { ModelKYCVerifications } from "./ModelKYCVerifications";

@Table({ tableName: "KYCVerificationsInputs", schema: "public", timestamps: false })
export class ModelKYCVerificationsInputs extends Model<IKYCVerificationsInputs, IKYCVerificationsInputs> implements IKYCVerificationsInputs {
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: "KYCVerificationsInputs_pkey", using: "btree", unique: true })
    IdKYCVerificationInput!: number;

  @ForeignKey(() => ModelKYCVerifications)
  @Column({ allowNull: false, type: DataType.UUID })
    IdKYCVerification!: V4UUID;

  @Column({ allowNull: false, type: DataType.STRING(255) })
    InputType!: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
    Value!: string;

  @Column({ allowNull: false, type: DataType.JSON })
    MetaData!: object;

  @Column({ allowNull: false, type: DataType.DATE })
    createdAt!: Date;

  @Column({ allowNull: false, type: DataType.DATE })
    updatedAt!: Date;

  @Column({ allowNull: true, type: DataType.DATE })
    deletedAt?: Date;

  @BelongsTo(() => ModelKYCVerifications)
    KYCVerification?: ModelKYCVerifications;
}
