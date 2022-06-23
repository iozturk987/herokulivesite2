"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplaycontactListPage = void 0;
const contact_1 = __importDefault(require("../Models/contact"));
const Util_1 = require("../Util");
function DisplaycontactListPage(req, res, next) {
    contact_1.default.find(function (err, contactsCollection) {
        if (err) {
            console.error(err.message);
            res.end(err);
        }
        res.render('index', { title: 'contact List', page: 'contact-list', contacts: contactsCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplaycontactListPage = DisplaycontactListPage;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add', page: 'edit', contact: '', displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    contact_1.default.findById(id, {}, {}, function (err, contactToEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Edit', page: 'edit', contact: contactToEdit, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAddPage(req, res, next) {
    let newcontact = new contact_1.default({
        "Name": req.body.contactName,
        "Director": req.body.contactDirector,
        "Year": req.body.contactYear,
        "Rating": req.body.contactRating
    });
    contact_1.default.create(newcontact, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedcontact = new contact_1.default({
        "_id": id,
        "Name": req.body.contactName,
        "Director": req.body.contactDirector,
        "Year": req.body.contactYear,
        "Rating": req.body.contactRating
    });
    contact_1.default.updateOne({ _id: id }, updatedcontact, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    contact_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/contact-list');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
//# sourceMappingURL=contact-list.js.map