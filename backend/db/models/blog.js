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


    static updateBlog = async function ({ id, title, content, image_urls, userId }) {
      const blog = await Blog.findByPk(id);
      if(blog){
        return await blog.update({
          title,
          content,
          image_urls,
          userId,
        });
      }
    };

    static deleteBlog = async function ({ id }) {
      const blog = await Blog.findByPk(id);
      if(blog){
        return await blog.destroy();
      }
    };


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

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      }
    },

  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};
