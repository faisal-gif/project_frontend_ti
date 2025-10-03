import React from "react";
import { formatDate } from "./formatDate";

const FormattedDate = ({ dateString, as: Component = "span", className = "" }) => {
    return <Component className={className}>{formatDate(dateString)}</Component>;
};

export default FormattedDate;