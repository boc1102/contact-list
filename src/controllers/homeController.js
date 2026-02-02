import Home from "../models/HomeModel.js";

const HomeController = {
  index(req, res) {
    res.render('index');
  }
};

export default HomeController;