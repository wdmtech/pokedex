// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const query = context.params.query;
    if(query && query.name && query.name.$search) {
      query.name = {
        $regex: new RegExp(query.name.$search, 'i')
      }
    }
    return context
  }
};

