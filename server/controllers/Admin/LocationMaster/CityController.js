const db = require("../../../models");
const Cities = db.Cities;
const Country = db.Countries;
const State = db.States;

module.exports = {
  // get handlers

  async getData(req, res) {
    try {
      const country_id = req.query.country_id;
      const state_id = req.query.state_id;
      const data = await Cities.findAll({
        where: { country_id: country_id, state_id: state_id },
      });
      if (data) {
        res.json(data);
      } else {
        res.json({ status: 400, message: "No data available" });
      }
    } catch (error) {
      console.log("ERROR : " + error);
      res.json({
        status: 400,
        message: "Cannot fetch data" + error,
      });
    }
  },
  async showList(req, res) {
    const offset = (page - 1) * limit;

    try {
      const { name, country_id, state_id } = req.query;
      const condition = {};
      if (name) {
        condition.name = name;
      }
      if (country_id) {
        condition.country_id = country_id;
      }
      if (state_id) {
        condition.state_id = state_id;
      }
      console.log("condition : ", condition);

      var perPage = 25;
      var limit;
      var page = req.query.page || 1;
      var inc = perPage * page - perPage;

      let count = await Cities.count({
        where: condition,
        offset: perPage * page - perPage,
        limit: perPage,
      });
      const data = await Cities.findAll({
        where: condition,
        offset: perPage * page - perPage,
        limit: perPage,

        order: [["id", "DESC"]],
      });
      let states;
    if(condition.country_id)
    {
         states = await State.findAll({
            where: { status: 1 ,country_id:condition.country_id},
             order: [
                ['id', "DESC"]
            ]
        });

    }else{
        states = [];
    }
      const countries = await Country.findAll();
      res.render("Cities/list", {states:states,data: data , countryId:condition.country_id,stateId:condition.state_id,countries:countries
      });
    } catch (error) {
      res.json({
        status: 400,
        message: "Some error occured" + error,
      });
    }
    
    
  },

  async showAdd(req, res) {
    res.render("Cities/add");
  },

  async add(req, res) {
    const data = {
      country_id: req.body.country_id,
      state_id: req.body.state_id,
      name: req.body.name,
    };
    console.log("DATA:  ", data);

    try {
      const record = await Cities.findOne();
      if (!record) {
        const createRecord = await Cities.create(data);
        res.json({
          status: 200,
          message: "Record created successfully",
          redirect: "/city",
        });
      } else {
        const oldRecord = await Cities.findOne({
          where: { name: data.name },
        });
        if (oldRecord) {
          res.json({
            status: 400,
            message: "This record already exists",
            redirect: "/city",
          });
        } else {
          const createNew = await Cities.create(data);
          res.json({
            status: 200,
            message: "Record successfully created",
            redirect: "/city",
          });
        }
      }
    } catch (error) {
      res.json({
        status: 400,
        message: "Some error occured",
        redirect: "/city",
      });
    }
  },

  async delete(req, res) {
    const id = req.body.id;
    let getBanner = await Cities.findOne({ where: { id: id } });
    if (getBanner) {
      const delBan = await Cities.destroy({ where: { id: id } });

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
      let getUserstatus = await Cities.findOne({ where: { id: id } });
      let newStatus, msg;
      if (getUserstatus.status == true) {
        newStatus = false;
        msg = "Inactive Successfully";
      } else {
        newStatus = true;
        msg = "Active Successfully!";
      }
      const updateStatus = await Cities.update(
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
      state_id: req.body.state_id,
      name: req.body.name,
    };

    let getBanner = await Cities.findOne({ where: { id: id } });
    if (getBanner) {
      const updCat = await Cities.update(data, { where: { id: id } }).then(
        (data) => {
          console.log("Data Successfully updated");
          res.json({
            status: 200,
            message: "Updated successfully",
            redirect: "/city",
          });
        }
      );
    } else {
      console.log("Cannot update");
      res.json({
        status: 400,
        message: "Cannot Update",
        redirect: "/city",
      });
    }
  },
  async showEdit(req, res) {
    const id = req.params.id;
    console.log("ID---" + id);
    const data = await Cities.findOne({
      where: { id: id },
      include: [
        { model: Country, as: "countries" },
        { model: State, as: "states" },
      ],
    });
    res.render("Cities/edit", { data: data });
  },
};
