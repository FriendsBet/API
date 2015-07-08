// Group.js
//
// @description :: A Group of Users
// @docs        :: http://sailsjs.org/#!documentation/models

module.exports = {

  schema: true,

  attributes: {

    // The Group name
    // e.g 'Friends Bet Group'
    name: {
      type: 'text',
      notEmpty: true,
      required: true,
      unique: true,
    },

    // The cumulative score of this Group
    // Updated at the end of a Match
    // e.g 1024
    score: {
      type: 'integer',
      defaultsTo: 0
    },

    // Everything you need to know about this group
    // e.g 'The group of Friends Bet developers'
    description: {
      type: 'text',
      defaultsTo: ''
    },

    // The first admin of the Group
    // It's a reference to a User
    admin: {
      model: 'user',
      required: true
    },

    // The list of members
    // References to Membership objects
    memberships: {
      collection: 'membership',
      via: 'group'
    }

  },

  // Remove group's memberships
  afterDestroy: function destroyAssociations(values, cb) {
    Membership
      .destroy({ group: values.id })
      .exec(function (err) {
        return cb((err)? err: null);
    });
  }
  
};
