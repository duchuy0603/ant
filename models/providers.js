'use strict';
const { Sequelize,DataTypes } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var providers = sequelize.define('providers', {
    Id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(4)
    },
    Name: {
      type: Sequelize.STRING(255)
    },
    EcommerceId:{
      type: Sequelize.INTEGER(4),
    },
    Description: {
      type: Sequelize.STRING(255)
    },
    Content: {
      type: Sequelize.STRING(1024)
    },
    ImageUrl: {
      type: Sequelize.STRING(1024)
    },
    Status: {
      type: Sequelize.INTEGER(2)
    },
    Deleted: {
      type: Sequelize.INTEGER(2)
    },
    CreatedDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    CreatedBy: {
      type: Sequelize.STRING(1024)
    },
    UpdatedDate: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    UpdatedBy: {
      type: Sequelize.STRING(1024)
    },
    },
    {
       timestamps: false
    });
    return providers;
  }