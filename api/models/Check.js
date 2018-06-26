/**
 * Check.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    status: {
      type:'string',
      defaultsTo:'open'
    },

    start: 'date',
    end: 'date',

    total: 'integer',

    people: {
      model: 'people'
    }
  },

  beforeCreate: function (values,cb) {
    values.start = new Date();
    return cb();
  },

  beforeUpdate: function (values,cb) {
    if (values.status === 'closed') {
      return Check.findOne(values.id).then(function (check) {
        values.end = new Date();
        var timeDiff = Math.abs(new Date(values.end).getTime() - new Date(values.start).getTime());
        values.total = (Math.ceil(timeDiff / (1000 * 60))) - 1;

        return cb();
      });
    }
  }
};
