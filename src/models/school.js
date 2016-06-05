'use strict';
var mongoose   = require('mongoose');
  
module.exports = function(Organization, OrganizationSchema) {
  //School extends Organization, 
  //adding the following properties
  var schema = new OrganizationSchema({
    isCollege: Boolean
  });

  schema.statics.findCollegeIds = function() {
    return this.find({isCollege: true}, '_id').lean().exec()
      .then(function(members) {
        if(!members.length) {
          return undefined;
        }
        else {
          return members.reduce(function(prev, curr) {
            prev.push(curr._id.toString());
            return prev;
          }, []);
        }
      });
  };

  return Organization.discriminator('School', schema);
};