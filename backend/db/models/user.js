'use strict';
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { Blog } = require('./blog');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Blog, {foreignKey: 'userId'});
    }

    comparePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    toSafeObject() {
      const { id, username, email } = this;
      return { id, username, email };
    }

    static async findByCredential(credential) {
      return await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },

      });
    }

    static login = async function ({ credential, password }) {
      const user = await User.findByCredential(credential);
      if (user && user.comparePassword(password)) {
        return await User.scope('currentUser').findOne({
          where: { id: user.id },
          include: Blog,
        })
      }
    };

    static signup = async function ({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
      });
      return await User.scope('currentUser').findByPk(user.id);
    };




  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        isEmail: true,
      }
    },
  hashedPassword: {
    type: DataTypes.STRING.BINARY,
    allowNull: false,
  }
  }, {
    defaultScope:{
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
