const express = require("express");
const router = express.Router();

const DashboardController = require("../controllers/Admin/DashboardController");
const LoginController = require("../controllers/Admin/LoginController");

const Testimonials = require('../controllers/Admin/Testimonials/TestimonialsController');
const HomeOtherSectionsController = require('../controllers/Admin/Master/HomeSecController');

const OurTeamController  = require('../controllers/Admin/OurTeam/OurTeamController');
const AdminProfileController = require('../controllers/Admin/AdminProfile/AdminProfileController');

const AuthController = require("../controllers/Admin/AuthController");
const OfferController= require('../controllers/Admin/OfferAndDiscounts/OfferAndDiscountsController');

const CountryController = require("../controllers/Admin/LocationMaster/CountryController");
const CityController = require("../controllers/Admin/LocationMaster/CityController");
const StateController = require("../controllers/Admin/LocationMaster/StateController");

const UserController = require('../controllers/Admin/User/UserController');

router.use(LoginController.customDataMiddleware);
router.get("/", LoginController.viewLogin);
router.post("/", LoginController.adminLogin);

router.get("/forgot-password", LoginController.showForgetPassword);
router.post("/forgot-password", LoginController.getOtp);

router.get("/enterOtp", LoginController.showEnterOtp);
router.post("/enterOtp", LoginController.verifyOtp);

router.get("/enterNewPassword", LoginController.showEnterNewPass);
router.post("/enterNewPassword", LoginController.resetPassword);

router.get(
  "/dashboard",
  AuthController.authMiddleware,
  DashboardController.showDashboard
);

// Testimonials section
router.get(
  "/testimonials",
  AuthController.authMiddleware,
  Testimonials.showList
);
router.get("/testimonials/add", Testimonials.showAdd);
router.post("/testimonials/add",Testimonials.cpUpload, Testimonials.add);
router.post("/testimonials/status-upd",Testimonials.updateStatus);
router.post('/testimonials/delete',Testimonials.delete);
router.get('/testimonials/edit/:id',Testimonials.showEdit);
router.post('/testimonials/edit/:id',Testimonials.cpUpload,Testimonials.edit);

// our team
router.get(
  "/our-team",
  AuthController.authMiddleware,
  OurTeamController.showList
);
router.get("/our-team/add", OurTeamController.showAdd);
router.post("/our-team/add",OurTeamController.cpUpload, OurTeamController.add);
router.post("/our-team/status-upd",OurTeamController.updateStatus);
router.post('/our-team/delete',OurTeamController.delete);
router.get('/our-team/edit/:id',OurTeamController.showEdit);
router.post('/our-team/edit/:id',OurTeamController.cpUpload,OurTeamController.edit);



// Admin profile
router.get(
  "/admin-profile",
  AuthController.authMiddleware,
  AdminProfileController.showList
);
router.post("/admin-profile1",AdminProfileController.cpUpload, AdminProfileController.add1);
router.post("/admin-profile2",AdminProfileController.add2);




// Home other sections
router.get(
  "/home-other-section",
  AuthController.authMiddleware,
  HomeOtherSectionsController.showEdit
);
router.post('/home-other-section',HomeOtherSectionsController.cpUpload,HomeOtherSectionsController.edit);

// offers and discounts
router.get(
  "/offer-and-discount",
  AuthController.authMiddleware,
  OfferController.showList
);
router.get("/offer-and-discount/add", OfferController.showAdd);
router.post("/offer-and-discount/add",OfferController.add);
router.post("/offer-and-discount/status-upd",OfferController.updateStatus);
router.post('/offer-and-discount/delete',OfferController.delete);
router.get('/offer-and-discount/edit/:id',OfferController.showEdit);
router.post('/offer-and-discount/edit/:id',OfferController.edit);


// countries
router.get(
  "/country",
  AuthController.authMiddleware,
  CountryController.showList
);
router.get(
  "/fetch-country",
  AuthController.authMiddleware,
  CountryController.getData
);
router.get("/country/add", CountryController.showAdd);
router.post("/country/add",CountryController.add);
router.post("/country/status-upd",CountryController.updateStatus);         
router.post('/country/delete',CountryController.delete);
router.get('/country/edit/:id',CountryController.showEdit);
router.post('/country/edit/:id',CountryController.edit);


// state
router.get(
  "/state",
  AuthController.authMiddleware,
  StateController.showList
);
router.get(
  "/state/get",
  AuthController.authMiddleware,
  StateController.getData
);
router.post(
  "/state",
  AuthController.authMiddleware,
  StateController.getList
);
router.get("/state/add", StateController.showAdd);
router.post("/state/add",StateController.add);
router.post("/state/status-upd",StateController.updateStatus);
router.post('/state/delete',StateController.delete);
router.get('/state/edit/:id',StateController.showEdit);
router.post('/state/edit/:id',StateController.edit);

// router.get(
//   "/dependent-state-list",
//   AuthController.authMiddleware,
//   StateController.showDependentList
// );
router.get(
  "/city",
  AuthController.authMiddleware,
  CityController.showList
);
router.get(
  "/city-dependent",
  AuthController.authMiddleware,
  CityController.getData
);
router.get("/city/add",   CityController.showAdd);
router.post("/city/add",  CityController.add);
router.post("/city/status-upd",  CityController.updateStatus);
router.post('/city/delete',  CityController.delete);
router.get('/city/edit/:id',  CityController.showEdit);
router.post('/city/edit/:id',  CityController.edit);
// router.post(
//   "/city-dependent",
//   AuthController.authMiddleware,
//   CityController.getData
// );


// user-management 
router.get(
  "/user-management",
  AuthController.authMiddleware,
  UserController.showList
);
router.get("/user-management/add", UserController.showAdd);
router.post("/user-management/add",UserController.cpUpload, UserController.add);
router.post("/user-management/status-upd",UserController.updateStatus);
router.post('/user-management/delete',UserController.delete);
router.get('/user-management/edit/:id',UserController.showEdit);
router.post('/user-management/edit/:id',UserController.cpUpload,UserController.edit);
module.exports = router;
