var _ = require('lodash');

var all = {
  userRoles: ['guest', 'user', 'admin']
}

module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});


