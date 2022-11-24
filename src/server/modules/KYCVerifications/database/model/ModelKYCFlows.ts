import { Model, Table, Column, DataType, Index, Sequelize, ForeignKey } from "sequelize-typescript";
import { IKYCFlows } from "../../domain/interface";

@Table({ tableName: "KYCFlows", schema: "public", timestamps: false })
export class ModelKYCFlows extends Model<IKYCFlows, IKYCFlows> implements IKYCFlows {
  @Column({ primaryKey: true, type: DataType.STRING })
  @Index({ name: "KYCFlows_pkey", using: "btree", unique: true })
    FlowID!: string;

  @Column({ allowNull: true, type: DataType.STRING })
    Description?: string;

  @Column({ allowNull: true, type: DataType.DATE(6), defaultValue: Sequelize.literal("now()") })
    createdAt?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
    updatedAt?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
    deletedAt?: Date;
}