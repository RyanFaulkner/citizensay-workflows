import React from "react";

import { useTranslation } from "react-i18next";

import { Form, InputGroup } from "react-bootstrap";
import { DebounceInput } from "react-debounce-input";

export const EditField = ({ id, field, value, help, prefix, placeholder }) => {

    const { t } = useTranslation("editors");

    const input = (
        <DebounceInput
            element={Form.Control}
            value={value}
            onChange={e => Meteor.call("workflows.update", id, {[ field ]: e.target.value})}
            placeholder={ placeholder || t(field)}
        />
    );

    return (
        <Form.Group>
            <Form.Label>
                { t(field) }
            </Form.Label>
            {
                prefix ?
                    <Prefixed {...{prefix, input}}/>
                :
                    input
            }
            {
                help &&
                    <Form.Text>{ help }</Form.Text>
            }
        </Form.Group>
    );

};

const Prefixed = ({ prefix, input }) => (
    <InputGroup>
        <InputGroup.Prepend>
            <InputGroup.Text>{ prefix }</InputGroup.Text>
        </InputGroup.Prepend>
        { input }
    </InputGroup>
);