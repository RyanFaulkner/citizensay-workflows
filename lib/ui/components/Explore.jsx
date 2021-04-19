import React, { useState } from "react";

import { useTracker } from "meteor/react-meteor-data";
import { Workflows } from "meteor/citizensay:workflows";

import { useTranslation } from "react-i18next";

import { CardColumns } from "react-bootstrap";
import { WorkflowCard } from "./WorkflowCard";

export const Explore = () => {
    const { t } = useTranslation();
    const [ filters, setFilters ] = useState([]);
    const { workflows } = useTracker(() => {
        Meteor.subscribe("workflows");
        return {
            workflows: Workflows.find({
                $or: [
                    { participants: "public" },
                    { owner: Meteor.userId() }
                ]
            }).fetch()
        };
    });
    return (
        <>
            <h2>{ t("explore") }</h2>
            <CardColumns>
                {
                    workflows
                        .map(workflow =>
                            <WorkflowCard
                                key={workflow._id}
                                workflow={workflow}
                                filters={filters}
                                setFilters={setFilters}
                            />
                        )
                }
            </CardColumns>
        </>
    );
};