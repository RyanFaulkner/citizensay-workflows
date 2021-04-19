import React from "react";

import { useHistory } from 'react-router-dom';

import { useTracker } from "meteor/react-meteor-data";
import { Workflows } from "meteor/citizensay:workflows";

import { Editor } from "./create/Editor";

export const Create = ({ id }) => {
    let history = useHistory();
    if(!id)
        Meteor.call("workflows.insert", (e, id) =>
            (!e && id) &&
                history.push("/create/" + id + "#basic")
        );
    else {
        const { workflow } = useTracker(() => {
            Meteor.subscribe("workflows");
            return {
                workflow: Workflows.findOne(id)
            };
        });
        if(workflow)
            return (
                <Editor {...{workflow, history}}/>
            );
    }
    return null;
};