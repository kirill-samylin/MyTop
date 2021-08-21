import React from "react";
import { Htag } from "../compoments";
import { withLayout } from "../layout/Layout/Layout";

export function Erorr500(): JSX.Element {
    return (
        <div>
            <Htag tag="h1">Ошибка 500</Htag>
        </div>
    );
};
export default withLayout(Erorr500);