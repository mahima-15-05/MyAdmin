'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.HomeBanner = require('./eaprohomebanner')(sequelize,Sequelize);
db.Admin= require('./admin')(sequelize,Sequelize);
db.Testimonials = require('./testimonials')(sequelize,Sequelize);
db.Offers = require('./offer_and_discount')(sequelize,Sequelize);
db.HomeOtherSections = require('./home-sections')(sequelize,Sequelize);
db.OurTeam = require('./our_team')(sequelize,Sequelize);
db.Countries = require('./countries')(sequelize,Sequelize);
db.States = require('./states')(sequelize,Sequelize);
db.Cities = require('./cities')(sequelize,Sequelize);
db.User = require('./user')(sequelize,Sequelize);



db.Countries.hasMany(db.States,{foreignKey:'country_id',as:'states'});
db.States.belongsTo(db.Countries,{foreignKey:'country_id',as:'countries'});

db.States.hasMany(db.Cities,{foreignKey:'state_id',as:'cities'});
db.Cities.belongsTo(db.States,{foreignKey:'state_id',as:'states'});

db.Countries.hasMany(db.Cities,{foreignKey:'country_id',as:'cities'});
db.Cities.belongsTo(db.Countries,{foreignKey:'country_id',as:'countries' });


module.exports = db;
