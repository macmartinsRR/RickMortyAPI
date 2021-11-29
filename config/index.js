const configValues = require("./config");

module.exports = {
  getDbConnectionString() {
    return (
      "mongodb+srv://" +
      configValues.uname +
      ":" +
      configValues.pwd +
      "@nodetodosample.spynh.mongodb.net/nodetodosample?retryWrites=true&w=majority"
    );
  },
};
