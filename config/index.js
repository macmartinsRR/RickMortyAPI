module.exports = {
  getDbConnectionString() {
    return (
      "mongodb+srv://" +
      process.env.MONGO_USER +
      ":" +
      process.env.MONGO_PASSWORD +
      "@nodetodosample.spynh.mongodb.net/nodetodosample?retryWrites=true&w=majority"
    );
  },
};
