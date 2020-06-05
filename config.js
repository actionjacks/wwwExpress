module.exports = {
  db:
    "mongodb+srv://admin:admin@jacek-nqpdz.mongodb.net/<dbname>?retryWrites=true&w=majority",
  keySession: ["TWOJKLUCZ"],
  //cookie options
  maxAgeSession: 24 * 60 * 60 * 1000, //24h
};

//npm i mongoose paczka ktora pozwoli na komunikacja z baza danych mongo db cloud
