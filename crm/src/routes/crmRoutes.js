import {
    addNewContact,
    getContacts,
    getContactById,
    updateContact,
    deleteContact
} from "../controllers/crmController";

const routes = (app) => {
    app.route("/contact")
        .get((req, res, next) => {
            console.log(`request from ${req.originalUrl}`);
            console.log(`request type: ${req.method}`);
            next();
        }, getContacts)
        .post(addNewContact);

    app.route("/contact/:contactId")
        .get(getContactById)
        .put(updateContact)
        .delete(deleteContact);
};

export default routes;
