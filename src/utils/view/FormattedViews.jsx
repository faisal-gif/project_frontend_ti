import React from "react";
import { formatViews } from "./formatViews";

const FormattedViews = ({ count, as: Component = "span", className = "" }) => {
    return <Component className={className}>{formatViews(count)}</Component>;
};

export default FormattedViews;
