import React from "react";
import { formatDateDetail } from "./formatDateDetail";


const FormattedDateDetail = ({ dateString, as: Component = "span", className = "" }) => {
    return <Component className={className}>{formatDateDetail(dateString)}</Component>;
};

export default FormattedDateDetail;