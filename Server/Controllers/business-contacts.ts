import express from 'express';
import { CallbackError } from 'mongoose';

// import the contact Model
import contact from '../Models/contacts';

import { UserDisplayName  } from '../Util';

export function DisplayContactListPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
    contact.find(function(err, contactsCollection)
    {
      // Database error
      if(err)
      {
        console.error(err.message);
        res.end(err);
      }
      res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contactsCollection, displayName:  UserDisplayName(req)  });
    });
}

export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  res.render('index', { title: 'Add', page: 'edit', contact: '', displayName:  UserDisplayName(req) })
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the db and read the contact into the edit page
  contact.findById(id, {}, {}, function(err, contactToEdit)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // show the edit view with the data
    res.render('index', { title: 'Edit', page: 'edit', contact: contactToEdit, displayName:  UserDisplayName(req) })
  });
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  // instantiate a new contact to Add
  let newContact = new contact
  ({
    "Name": req.body.contactName,
    "Number": req.body.contactNumber,
    "Email": req.body.contactEmail
  });

  // Insert the new contact object into the database (contacts collection)
  contact.create(newContact, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // new contact has been added -> refresh the contact-list
    res.redirect('/contact-list');
  })
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // instantiate a new contact to Edit
  let updatedcontact = new contact
  ({
    "_id": id,
    "Name": req.body.contactName,
    "Director": req.body.contactDirector,
    "Year": req.body.contactYear,
    "Rating": req.body.contactRating
  });

  // update the contact in the database
  contact.updateOne({_id: id}, updatedcontact, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // edit was successful -> go to the contact-list page
    res.redirect('/contact-list');
  });
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the database and delete the contact
  contact.remove({_id: id}, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // delete was successful
    res.redirect('/contact-list');
  });
}