export * from "./lib/api/index";

import { Groups, Tiles } from "meteor/citizensay:core";

Meteor.startup(() => {

    const group = "collaborate";

    if(!Groups.findOne(group))
        Groups.insert({_id: group});

    [
        {
            _id: "explore",
            group,
            icon: "comment-dots",
            color: "rgb(239,204,23)",
            size: "xlarge"
        },
        {
            _id: "create",
            group,
            icon: "plus",
            color: "rgb(216,162,10)",
            size: "medium tall"
        },
        {
            _id: "join",
            group,
            icon: "handshake",
            color: "rgb(184,134,11)",
            size: "medium tall"
        }
    ].forEach(t =>
        !Tiles.findOne(t._id) &&
            Tiles.insert(t)
    );

});