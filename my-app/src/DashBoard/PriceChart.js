import React, { useContext, useEffect, useState } from 'react';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import getChartOptions from './HighChartConfig'; 
import HighChartTheme from './HighChartTheme';

Highcharts.setOptions(HighChartTheme);

export default function HighchartsComponent() {
    const { historical } = useContext(AppContext);
    const [options, setOptions] = useState(getChartOptions(historical));

    useEffect(() => {
        setOptions(getChartOptions(historical));
    }, [historical]);

    return (
        <Tile>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </Tile>
    );
}