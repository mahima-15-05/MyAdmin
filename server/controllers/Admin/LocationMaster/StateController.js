const db = require("../../../models");
const States = db.States;
const Country = db.Countries;
module.exports = {

  async getData(req, res) {
    const countryId = req.query.countryId;
    const data = await States.findAll({
      where: { country_id: countryId }
    });

    if (data) {
      res.json(data);
    }
  },
  async showList(req, res) {
    const offset = (page - 1) * limit;

    try {
      const { name, country_id} = req.query;
      const condition = {};
      if (name) {
        condition.name = name;
      }
      if (country_id) {
        condition.country_id = country_id;
      }
      console.log("condition : ", condition);

      var perPage = 25;
      var limit;
      var page = req.query.page || 1;
      var inc = perPage * page - perPage;

      let count = await States.count({
        where: condition,
        offset: perPage * page - perPage,
        limit: perPage,
        
      });

      const data = await States.findAll({
        where: condition,
        offset: perPage * page - perPage,
        limit: perPage,

        order: [["id", "DESC"]],
      });
      let states;
      if(condition.country_id)
    {
         states = await States.findAll({
            where: { status: 1 ,country_id:condition.country_id},
             order: [
                ['id', "DESC"]
            ]
        });

    }else{
        states = [];
    }
    const countries = await Country.findAll();
      res.render("States/list", {states:states,data: data , countryId:condition.country_id,stateId:condition.state_id,countries:countries
      });
    } catch (error) {
      res.json({
        status: 400,
        message: "Some error occured " + error,
      });
    }
  },
  async getList(req, res) {
    try {
      const country_id = req.body.country_id;
      console.log("S" + country_id);

      const data = await States.findAll({ where: { country_id: country_id } ,include:[
        {model: Country, as: "countries"},
      ]});
      res.render("States/list", { data});
    } catch (error) {
      res.json({
        status: 400,
        message: "Cannot fetch data",
      });
    }
  },

  async showAdd(req, res) {
    res.render("States/add");
  },

  async add(req, res) {
    const data = {
      country_code: req.body.country_code,
      name: req.body.name,
      country_id: req.body.country_id,
    };

    try {
      const record = await States.findOne();
      if (!record) {
        const createRecord = await States.create(data);
        res.json({
          status: 200,
          message: "Record created successfully",
          redirect: "/state",
        });
      } else {
        const oldRecord = await States.findOne({
          where: { name: data.name },
        });
        if (oldRecord) {
          res.json({
            status: 400,
            message: "This record already exists",
            redirect: "/state",
          });
        } else {
          const createNew = await States.create(data);
          res.json({
            status: 200,
            message: "Record successfully created",
            redirect: "/state",
          });
        }
      }
    } catch (error) {
      res.json({
        status: 400,
        message: "Some error occured",
        redirect: "/state",
      });
    }
  },

  async delete(req, res) {
    const id = req.body.id;
    let getBanner = await States.findOne({ where: { id: id } });
    if (getBanner) {
      const delBan = await States.destroy({ where: { id: id } });

      console.log("Banner Successfully deleted");
      res.status(200).send("Status updated successfully");
    } else {
      console.log("Cannot find banner to delete");
      res.json({
        status: 400,
        message: "Cannot Delete",
      });
    }
  },
  async updateStatus(req, res) {
    try {
      const id = req.body.id;
      let getUserstatus = await States.findOne({ where: { id: id } });
      let newStatus, msg;
      if (getUserstatus.status == true) {
        newStatus = false;
        msg = "Inactive Successfully";
      } else {
        newStatus = true;
        msg = "Active Successfully!";
      }
      const updateStatus = await States.update(
        { status: newStatus },
        { where: { id: id } }
      );

      res.status(200).send("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).send("Error updating status");
    }
  },
  async edit(req, res) {
    const id = req.body.id;
    console.log("ID___", id);
    const data = {
      country_id: req.body.country_id,
      name: req.body.name,
    };

    let getBanner = await States.findOne({ where: { id: id } });
    if (getBanner) {
      const updCat = await States.update(data, { where: { id: id } }).then(
        (data) => {
          console.log("Data Successfully updated");
          res.json({
            status: 200,
            message: "Updated successfully",
            redirect: "/state",
          });
        }
      );
    } else {
      console.log("Cannot update");
      res.json({
        status: 400,
        message: "Cannot Update",
        redirect: "/state",
      });
    }
  },
  async showEdit(req, res) {
    const id = req.params.id;
    console.log("ID---" + id);
    const data = await States.findOne({ where: { id: id },include:[
      {model: Country, as: "countries"},
    ] });
    res.render("States/edit", { data: data });
  },
};
