import React, { useContext, useEffect, useState } from 'react';
import { List, Spin, Typography } from 'antd';

import { IoDataResponse } from 'models/oDataResponse';
import { ISolution } from 'models/solutions';

import { PowerToolsContext } from 'powertools/context';
import { usePowerToolsApi } from 'powertools/apiHook';

export const MainView: React.FC = () => {
    const { connectionName } = useContext(PowerToolsContext);
    const { get, isLoaded } = usePowerToolsApi();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ISolution[]>([]);

    const loadSolutions = async () => {
        if (!get) {
            return;
        }

        const query = new URLSearchParams();
        query.set(`$select`, `friendlyname,uniquename`);
        query.set(`$expand`, `publisherid`);
        query.set(`$filter`, `(isvisible eq true)`);
        query.set(`$orderby`, `createdon desc`);

        const res = await get('/api/data/v9.0/solutions', query);
        const js = await res.asJson<IoDataResponse<ISolution>>();

        setData(js.value);
    }

    useEffect(() => {
        setLoading(true);

        Promise.all([loadSolutions()]).then(() => setLoading(false));

        // TODO: figure out how to improve this, as we should be able to add the loadSolutions to the dependencies
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, connectionName]);

    return (
        <Spin spinning={!isLoaded}>
            <h1>Hello, {connectionName}</h1>

            <List
                size="small"
                bordered
                dataSource={data}
                loading={loading}
                renderItem={(item) => (
                    <List.Item key={item.solutionid}>
                        <List.Item.Meta
                            title={item.friendlyname}
                            description={item.uniquename}
                        />
                        Publisher: <Typography.Text italic>{item.publisherid.friendlyname}</Typography.Text>
                    </List.Item>
                )}
            />
        </Spin>
    );
}
