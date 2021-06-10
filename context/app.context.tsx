import { createContext, PropsWithChildren, useState } from "react";
import { MenuItem } from "../interfaces/menu.interfaces";
import { TopLevelCategory } from "../interfaces/page.interfaces";

export interface IAppContext {
    menu: MenuItem[];
    firstCategoty: TopLevelCategory;
    setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({ menu: [], firstCategoty: TopLevelCategory.Courses });

export const AppContextProvider = ({ menu, firstCategoty, children}: PropsWithChildren<IAppContext>) => {
    const [menuState, setMenuState] = useState<MenuItem[]>(menu);
    const setMenu = (newMenu: MenuItem[]) => {
        setMenuState(newMenu);
    }

    return <AppContext.Provider value={{ menu: menuState, firstCategoty, setMenu }}>
        {children}
    </AppContext.Provider>
}