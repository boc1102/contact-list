import Home from "../models/HomeModel.js";

const HomeController = {
  index(req, res) {
    const home = new Home(req.body, req.session.user);
    res.render('index', { contacts: home.getContacts()});
  }
};

export default HomeController;