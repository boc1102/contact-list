import Home from "../models/HomeModel.js";

const HomeController = {
  index(req, res) {
    const home = new Home(req.body, req.session.user);
    res.render('index', { contacts: home.getContacts()});
  },

  delete(req, res) {
    const home = new Home(req.body, req.session.user);
    home.deleteContact(req.query.id);
    if (home.errors.length > 0)
      req.flash('errors', home.errors);
    else req.flash('success', 'Contact deleted!');
    
    res.redirect('/');
  }
};

export default HomeController;