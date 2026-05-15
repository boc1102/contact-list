import Home from "../models/HomeModel.js";

const HomeController = {
  async index(req, res) {
    const home = new Home(req.body, req.session.user);
    const contacts = await home.getContacts();
    res.render('index', { contacts: contacts});
  },

  async delete(req, res) {
    const home = new Home(req.body, req.session.user);
    await home.deleteContact(req.query.id);
    if (home.errors.length > 0)
      req.flash('errors', home.errors);
    else req.flash('success', 'Contact deleted!');
    
    res.redirect('/');
  }
};

export default HomeController;