import React from "react";

import { Badge, Button, ButtonGroup, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import { MoreLess } from "meteor/citizensay:core";

import moment from 'moment';

export const WorkflowCard = ({ workflow, filters, setFilters }) => {
    const { t } = useTranslation("cards");
    let history = useHistory();
    return (
        <Card>
            <Card.Body style={{color: workflow.isDraft && "gainsboro"}}>
                <Card.Title>{ workflow.title || <i>{ t("draft") }</i> }</Card.Title>
                {
                    workflow.description &&
                        <MoreLess text={workflow.description}/>
                }
                {
                    Array.isArray(workflow.topics) &&
                        workflow.topics.map(topic => {
                            const active = filters.findIndex(f => topic.value === f.value) > -1;
                            return (
                                <Badge
                                    key={workflow._id + "_" + topic.value}
                                    pill
                                    style={{cursor: "pointer"}}
                                    variant={active ? "warning": "light"}
                                    onClick={() => setFilters(active ? filters.filter(f => f.value !== topic.value) : [...filters, topic])}
                                >
                                    { topic.label } { active && <FontAwesomeIcon icon="times"/> }
                                </Badge>
                            );
                        })
                }
            </Card.Body>
            <Card.Footer>
                <small>
                    <Badge pill variant={workflow.isDraft ? "warning": "success"} style={{height: "1.2em"}}> </Badge>
                    &nbsp;
                    {
                        workflow.start ?
                            moment(workflow.start).fromNow()
                        :
                            workflow.createdAt &&
                                moment(workflow.createdAt).fromNow()
                    }
                </small>
                <ButtonGroup
                    size="sm"
                    style={{float: "right"}}
                >
                    {
                        [
                            {
                                variant: "warning",
                                icon: "cog",
                                alt: t("edit"),
                                onClick: () => history.push("/create/" + workflow._id, workflow._id),
                                modOnly: true
                            },
                            {
                                variant: "danger",
                                icon: "trash",
                                alt: t("delete"),
                                onClick: () => confirm(t("workflowDelete")) && Meteor.call("workflows.delete", workflow._id),
                                modOnly: true
                            },
                            {
                                variant: "primary",
                                icon: "mouse-pointer",
                                alt: t("participate"),
                                onClick: () => history.push("/participate/" + workflow._id, workflow._id),
                                modOnly: false
                            },
                            {
                                variant: "success",
                                icon: "poll",
                                alt: t("review"),
                                onClick: () => history.push("/review/" + workflow._id, workflow._id),
                                modOnly: true
                            }
                        ].filter(button => !button.modOnly || ((workflow.owner === Meteor.userId() || Array.isArray(workflow.moderators) && workflow.moderators.some(moderator => moderator.value === Meteor.userId()))))
                            .map(button =>
                                <OverlayTrigger
                                    key={button.alt}
                                    overlay={<Tooltip>{ button.alt }</Tooltip>}
                                >
                                    <Button
                                        variant={button.variant}
                                        onClick={button.onClick}
                                    >
                                        <FontAwesomeIcon icon={button.icon}/>
                                    </Button>
                                </OverlayTrigger>
                            )
                    }
                </ButtonGroup>
            </Card.Footer>
        </Card>
    );
};