'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Blog.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Blog.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [1, 255],
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        len: [1, 2000],
      }
    },

    image_urls:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },

  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};
