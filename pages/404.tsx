import React from "react";
import { Htag } from "../compoments";
import { withLayout } from "../layout/Layout/Layout";

export function Erorr404(): JSX.Element {
    return (
        <div>
            <Htag tag="h1">Ошибка 404</Htag>
        </div>
    );
};
export default withLayout(Erorr404);