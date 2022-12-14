import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo } from "sequelize-typescript";
import { IKYCVerificationInput } from "../../domain/interface";
import { V4UUID } from "../../interfaces/FlowMetadata.interface";
import { ModelKYCVerifications } from "./ModelKYCVerifications";

@Table({ tableName: "KYCVerificationsInputs", schema: "public", timestamps: true })
export class ModelKYCVerificationsInputs extends Model<IKYCVerificationInput, IKYCVerificationInput> implements IKYCVerificationInput {
  @Column({ primaryKey: true, type: DataType.INTEGER, autoIncrementIdentity: true, autoIncrement: true })
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

  @BelongsTo(() => ModelKYCVerifications)
    KYCVerification?: ModelKYCVerifications;
}
