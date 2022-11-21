import { sequelize, DataTypes } from "../../../../../lib/database/sequelize";

export const User = sequelize.define("users", {
  idUser: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true

  },
  idRole: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1

  },
  idUserParent: {
    type: DataTypes.INTEGER,
    allowNull: true

  },
  userName: {
    type: DataTypes.TEXT,
    allowNull: false

  },
  userPass: {
    type: DataTypes.TEXT,
    allowNull: false

  },
  idBornCountry: {
    type: DataTypes.INTEGER,
    allowNull: true

  },
  idNationalIdentifierType: {
    type: DataTypes.INTEGER,
    allowNull: true

  },
  nationalIdentifierNumber: {
    type: DataTypes.TEXT,
    allowNull: true

  },
  firstName: {
    type: DataTypes.TEXT,
    allowNull: true

  },
  middleName: {
    type: DataTypes.TEXT,
    allowNull: true

  },
  lastName: {
    type: DataTypes.TEXT,
    allowNull: true

  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true
  },
  gender: {
    type: DataTypes.TEXT,
    allowNull: true

  },
  idLanguage: {
    type: DataTypes.INTEGER,
    allowNull: true

  },
  lastPassChangeAt: {
    type: DataTypes.DATE,
    allowNull: true

  },
  lastLoginAt: {
    type: DataTypes.DATE,
    allowNull: true

  },
  loginFailCount: {
    type: DataTypes.INTEGER,
    allowNull: true

  },
  sep6UserMemo: {
    type: DataTypes.STRING(64),
    allowNull: true

  },
  uniqueId: {
    type: DataTypes.UUID,
    allowNull: true
  }
}, {
  paranoid: true,
  indexes: [
    {
      name: "Users_NationalIdentifierNumber_key",
      unique: true,
      fields: ["nationalIdentifierNumber"]
    },
    {
      name: "Users_UserName_key",
      unique: true,
      fields: ["userName"]
    },
    {
      name: "Users_key",
      unique: true,
      fields: ["idUser"]
    }
  ]
}
);
