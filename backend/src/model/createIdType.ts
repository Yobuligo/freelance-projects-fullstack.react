import { DataTypes, ModelAttributeColumnOptions } from "sequelize";

export const createIdType = (): ModelAttributeColumnOptions => {
  return {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  };
};
