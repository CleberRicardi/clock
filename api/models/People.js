/**
 * People.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: 'string',
    active: 'boolean',
    picture: 'string',
    status: {
      type:'string',
      enum:['in','out']
    },

    checks: {
      collection:'check',
      via:'people'
    }
  }
};
