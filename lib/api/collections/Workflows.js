import { Mongo } from "meteor/mongo";

export const Workflows = new Mongo.Collection("workflows");

Meteor.methods({
    "workflows.insert"() {
        return Workflows.insert({
            items: [],
            participants: "public",
            owner: this.userId,
            isDraft: true,
            createdAt: new Date()
        });
    },
    "workflows.delete"(_id) {
        const workflow = Workflows.findOne(_id);
        if(!workflow)
            throw Meteor.Error("No such workflow.");
        else if(!this.userId || this.userId !== workflow.owner)
            throw Meteor.Error("Not Authorised.");
        else
            Workflows.remove(_id);
    },
    "workflows.update"(_id, update) {
        /* TODO Permissions */
        Workflows.update(_id, {$set: update});
    }
});

if (Meteor.isServer)
    Meteor.publish("workflows", () => Workflows.find());
