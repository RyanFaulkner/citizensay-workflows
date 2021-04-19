import { Mongo } from "meteor/mongo";

export const Invitations = new Mongo.Collection("invitations");

Meteor.methods({
    "invitations.insert"(workflow, user) {
        return Invitations.insert({
            workflow,
            user
        });
    },
    "invitations.remove"(workflow, user) {
        Invitations.remove({workflow, user})
    },
    "invitations.clear"(workflow) {
        Invitations.remove({ workflow })
    }
});

if (Meteor.isServer)
    Meteor.publish("invitations", () => Invitations.find());
