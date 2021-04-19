import React, { useState } from "react";

import { useTranslation } from 'react-i18next';

import { Tabs, Tab } from "react-bootstrap";
import { Basic } from "./tabs/basic/Tab";
import { Activities } from "./tabs/Activities";
import { Participants } from "./tabs/participants/Tab";
import { Schedule } from "./tabs/Schedule";

const tabs = {
    "basic": Basic,
    "activities": Activities,
    "participants": Participants,
    "schedule": Schedule
};

const additionalFields = {
    basic: [],
    activities: [],
    participants: [],
    schedule: []
};

export const addField = (tab, component) => additionalFields[tab].push(component);

export const Editor = ({ workflow, history }) => {
    const { t } = useTranslation("tabs");
    const [ key, setKey ] = useState(history.location.hash || "#basic");
    return (
        <>
            <h4 style={{textAlign: "center"}}>
                { t("workflowEditor") }
            </h4>
            <Tabs
                activeKey={key}
                onSelect={hash => {
                    setKey(hash);
                    history.replace({ hash });
                }}
                unmountOnExit={true}
                style={{flexWrap: "inherit"}}
            >
                {
                    ["basic", "activities", "participants", "schedule"].map(tab => {
                        const T = tabs[tab];
                        return (
                            <Tab key={tab} eventKey={"#" + tab} title={ t(tab) }>
                                <div style={{padding: "1em"}}>
                                    <T {...{workflow}}
                                       additionalFields={additionalFields[tab]}
                                    />
                                </div>
                            </Tab>
                        );
                    })
                }
            </Tabs>
        </>
    );
};