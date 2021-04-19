import React, { useState, useEffect } from "react";

import { useTracker } from "meteor/react-meteor-data";

import { Badge /*Button, Collapse*/ } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Creatable, { components } from 'react-select';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const UserSelect = ({ id, field, options, value }) => {
    //const [ preview, setPreview ] = useState(false);
    const { user, users } = useTracker(() => {
        const user = Meteor.userId();
        return {
            user,
            users: options || Meteor.users.find({}).fetch().map(u => ({
                value: u._id,
                label: u.username,
                source: "cs"
            }))
        };
    });

    const [ n4c, setN4C ] = useState([]);
    useEffect(() => {
        if(!options && user && user.profile && user.profile.jwt)
            HTTP.get("https://arg.n4c.website/api/users", {
                headers: {
                    "Content-Type": "application/json",
                    "X-Access-Token": user.profile.jwt
                }
            }, (e,r) => (!e && r) && setN4C(r.data.map(u => ({value: u.id, label: u.username, source: "n4c"}))))
    }, []);

    return (
        <>
            <Creatable
                components={{MultiValueLabel}}
                options={users.concat(n4c)}
                value={value}
                isMulti
                onChange={(selected, {action, removedValue}) => {
                    let values = selected;
                    if(field !== "moderators")
                        switch(action){
                            case "remove-value":
                            case "pop-value":
                                Meteor.call("invitations.remove", id, removedValue.value);
                                break;
                            case "clear":
                                Meteor.call("invitations.clear", id);
                                break;
                            default:
                                Meteor.call("invitations.insert", id, values[values.length - 1].value)
                        }
                    Meteor.call("workflows.update", id, {[field]: values});
                }}
                onCreateOption={e =>
                    validateEmail(e) ? Meteor.call("workflows.update", id, { participants: [...value, {value: Random.id(), label: e, source: "email"}]}) : alert("Invalid Email")
                }
            />
            {/*
                Array.isArray(value) && value.some(v => v.source === "email") &&
                    <div>
                        <br/>
                        <i>Email Preview</i>
                        <Button size="sm" variant="light" style={{float: "right"}} onClick={() => setPreview(!preview)}>
                            { preview ? "hide": "show" }
                        </Button>
                        <Collapse in={preview}>
                            <p>
                                You are invited to participate in the following N4C Citizen Say workflow: "{ workflow.title }".
                                <br/>
                                { workflow.start && ("This workflow is scheduled for: " + workflow.start + "\n") }
                                Sign-up <a target="_blank" href="https://www.n4c.website/#/participation">here</a> to participate.
                            </p>
                        </Collapse>
                    </div>
            */}
        </>
    );
};

const MultiValueLabel = (props) => {
    console.log(props);
    return (
        <components.MultiValueLabel {...props}>
            {props.children}
            {
                props.data.moderator === "moderators" &&
                    <FontAwesomeIcon icon="user-shield"/>
            }
            <Badge pill>
                {
                    {
                        'cs': <img src="/packages/citizensay_core/img/cs-logo.png" height={16}/>,
                        'n4c': <img src="/packages/citizensay_core/img/n4c-logo.png" height={16}/>,
                        'email': <FontAwesomeIcon icon="envelope"/>
                    }[props.data.source]
                }
            </Badge>
        </components.MultiValueLabel>
    );
};