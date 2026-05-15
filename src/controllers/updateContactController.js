import UpdateContact from "../models/UpdateContactModel.js";

const UpdateContactController = {
  async index(req, res) {
    const updateContact = new UpdateContact(req.body, req.session.user);

    const contact = await updateContact.getContact(req.query.id);

    res.render("update", {
      query: req.query,
      contact: contact,
    });
  },

  async update(req, res) {
    const updateContact = new UpdateContact(req.body, req.session.user);

    await updateContact.updateContact(req.query.id);

    if (updateContact.errors.length > 0) {
      req.flash("errors", updateContact.errors);
    } else {
      req.flash("success", "Contact edited!");
    }

    res.redirect("/");
  },
};

export default UpdateContactController;
