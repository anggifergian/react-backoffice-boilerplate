import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { privateRoutes } from '../routes';

const useSelectedPath = () => {
    const { pathname } = useLocation();

    const [state, setState] = useState({
        selectedMenu: '',
        openedKeys: []
    })

    const findRoute = (pathname, routes) => {
        return routes.find(route => route.path === pathname);
    }

    useEffect(() => {
        const paths = pathname.split('/').filter(path => path);

        let initialRoutes = privateRoutes;
        const keys = [];

        if (paths.length > 1) {
            for (let i = 0; i < paths.length - 1; i++) {
                const route = initialRoutes.find(route => route.key === paths[i]);
                initialRoutes = route.submenu;
                keys.push(route.key);
            }
        }

        const { key } = findRoute(pathname, initialRoutes);
        const openedKeys = paths.length > 1 ? keys : [key];
        
        setState({ selectedMenu: key, openedKeys });
    }, [pathname])

    console.log(state)

    return state;
}

export default useSelectedPath