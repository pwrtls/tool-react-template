import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { PowerToolsContext } from 'powertools/context';

export const MainView: React.FC = () => {
    const { connectionName } = useContext(PowerToolsContext);
    const location = useLocation();

    useEffect(() => {
        console.log(location);
    }, [location]);

    return (
        <h1>Hello, { connectionName }</h1>
    );
}
