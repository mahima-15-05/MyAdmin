const db = require('../../../models')
const Countries = db.Countries;
module.exports = {

  async getData(req,res){
    const country = await db.Countries.findAll();
    res.json(country);
  },

 
  async showList(req, res) {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;
  
    const offset = (page - 1) * limit;
    try{
      const country_id = req.body.country_id;
    if(country_id){
      const data = await Countries.findAll({where:{country_id:country_id}},{
        limit: limit,
        offset: offset
      });
      res.render("Countries/list", { data });
    }
    else{
      const data = await Countries.findAll({
        limit: limit,
        offset: offset
      });
      res.render("Countries/list", { data });
    }

    }catch(error){
      res.json({
        status:400,
        message:"Some error occured"+error
      })
    }
  
    
    
    
    // const country_id = req.body.country_id;
    // if(country_id){
    //   const data = await Countries.findAll({where:{country_id:country_id}});
    //   res.render("Countries/list", { data });
    // }
    // const data = await Countries.findAll();
    // console.log("Data : " + data);
    // res.render("Countries/list", { data });
  },

  async showAdd(req, res) {
    res.render("Countries/add");
  },

  async add(req, res) {
    const data = {
      name: req.body.name,
      short_name: req.body.short_name,
      numeric_code: req.body.numeric_code,
      phone_code: req.body.phone_code,
      capital:req.body.capital,
    };
    console.log("DATA "+data);

    try {
      const record = await Countries.findOne();
      if (!record) {
        const createRecord = await Countries.create(data);
        res.json({
          status: 200,
          message: "Record created successfully",
          redirect: "/country",
        });
      } else {
        const oldRecord = await Countries.findOne({
          where: { name: data.name },
        });
        if (oldRecord) {
          res.json({
            status: 400,
            message: "This record already exists",
            redirect: "/country",
          });
        } else {
          const createNew = await Countries.create(data);
          res.json({
            status: 200,
            message: "Record successfully created",
            redirect: "/country",
          });
        }
      }
    } catch (error) {
      res.json({
        status: 400,
        message: "Some error occured",
        redirect: "/country",
      });
    }
  },

  async delete(req, res) {
    const id = req.body.id;
    let getBanner = await Countries.findOne({ where: { id: id } });
    if (getBanner) {
      const delBan = await Countries.destroy({ where: { id: id } });

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
      let getUserstatus = await Countries.findOne({ where: { id: id } });
      let newStatus, msg;
      if (getUserstatus.status == true) {
        newStatus = false;
        msg = "Inactive Successfully";
      } else {
        newStatus = true;
        msg = "Active Successfully!";
      }
      const updateStatus = await Countries.update(
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
    console.log("ID___",id)
        const data = {
            offer_name: req.body.offer_name,
            discount_percentage:req.body.discount_percentage,
            valid_from:req.body.valid_from,
            valid_to:req.body.valid_to,
            description:req.body.description,
          };
    
    
    let getBanner = await Countries.findOne({ where: { id: id } });
    if (getBanner) {
      const updCat = await Countries.update(
        data,
        { where: { id: id } }
      ).then((data) => {
        console.log("Data Successfully updated");
        res.json({
          status: 200,
          message: "Updated successfully",
          redirect: "/country",
        });
      });
    } else {
      console.log("Cannot update");
      res.json({
        status: 400,
        message: "Cannot Update",
        redirect: "/country",
      });
    }
  },
  async showEdit(req, res) {
    const id = req.params.id;
    console.log("ID---" + id);
    const data = await Countries.findOne({ where: { id: id } });
    res.render("Countries/edit", { data: data });
  },
};