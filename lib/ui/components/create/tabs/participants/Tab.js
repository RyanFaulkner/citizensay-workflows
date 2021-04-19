import React from "react";

import { useTranslation } from "react-i18next";

import { Form } from "react-bootstrap";
import { UserSelect } from "./UserSelect";

export const Participants = ({ workflow }) => {
    const { t } = useTranslation();
    const privacy = (workflow.participants === "public");
    return (
        <Form>
            <Form.Group>
                <Form.Label>{ t("workflowPrivacy") }</Form.Label>
                {
                    ["public", "private"].map(p =>
                        <Form.Check
                            key={p}
                            name="privacy"
                            type="radio"
                            label={ t(p) }
                            checked={(p === "public" && privacy) || (p === "private" && !privacy)}
                            onChange={() => Meteor.call("workflows.update", workflow._id, {
                                participants: privacy ? [] : "public",
                                moderators: privacy ? [] : undefined
                            }, () => !privacy && Meteor.call("invitations.clear", workflow._id))}
                        />
                    )
                }
                {
                    !privacy ?
                        <>
                            <br/>
                            <Form.Label>{ t("invitees") }</Form.Label>
                            <UserSelect
                                id={workflow._id}
                                field="participants"
                                value={workflow.participants}
                            />
                        </>
                    :
                        <Form.Text>
                            { t("publicVisibility") }
                        </Form.Text>
                }
                <br/>
                <Form.Label>{ t("moderators") }</Form.Label>
                <UserSelect
                    id={workflow._id}
                    field="moderators"
                    options={Array.isArray(workflow.participants) ? workflow.participants : null}
                    value={workflow.moderators}
                />
            </Form.Group>
        </Form>
    );
};