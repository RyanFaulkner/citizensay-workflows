import React from "react";
import { useTranslation } from "react-i18next";

export const Join = () => {
    const { t } = useTranslation();
    return (
        <h2 id="title">{ t("join") }</h2>
    );
};