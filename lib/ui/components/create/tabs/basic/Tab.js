import React from "react";

import { Form } from "react-bootstrap";
import { EditField } from "../../EditField";


export const Basic = ({ workflow, additionalFields }) => {
    return (
        <Form>
            {
                ["title", "description"].map(field =>
                    <EditField
                        key={field}
                        id={workflow._id}
                        field={field}
                        value={workflow[field]}
                    />
                )
            }
            {
                additionalFields.map(F =>
                    <F key={F.name} {...{workflow}}/>
                )
            }
        </Form>
    );
};