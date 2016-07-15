var bcrypt = require("bcrypt");
var _ = require("underscore");

//Salt - add random set of characters onto plain-text password
//before it is hashed so that if we had the same password, we would
//have different salts which would give us different hashes so I couldn't
//guess/hack you.

//Virtual data type is never stored in the database.

module.exports = function(sequelize, DataTypes) {
  return sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    salt: {
      type: DataTypes.STRING
    },

    password_hash: {
      type: DataTypes.STRING
    },

    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len: [7, 100]
      },
      set: function(value) {
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(value, salt);
        this.setDataValue("password", value);
        this.setDataValue("salt", salt);
        this.setDataValue("password_hash", hashedPassword);
      }
    }
  }, {
    hooks: {
      beforeValidate: function(user, options) {
        if (typeof user.email === "string") {
          user.email = user.email.toLowerCase()
        }
      }
    },
    instanceMethods: {
      toPublicJSON: function() {
        var json = this.toJSON();
        return _.pick(json, 'id', 'email', 'createdAt', 'updatedAt');
      }
    }

  });
};