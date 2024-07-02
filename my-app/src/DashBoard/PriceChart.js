import React, { useContext, useEffect, useState } from 'react';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import getChartOptions from './HighChartConfig'; 
import HighChartTheme from './HighChartTheme';
import ChartSelect from './ChartSelect';

Highcharts.setOptions(HighChartTheme);

export default function HighchartsComponent() {
    const { historical } = useContext(AppContext);
    const [changeChartSelect, setChangeChartSelect] = useState('months');
    const [options, setOptions] = useState(getChartOptions(historical, changeChartSelect));

    useEffect(() => {
        // Fetch new options whenever historical data or changeChartSelect changes
        setOptions(getChartOptions(historical, changeChartSelect));
    }, [historical, changeChartSelect]);

    const handleChartSelectChange = (value) => {
        // Update the selected interval
        setChangeChartSelect(value);
    };

    return (
        <Tile>
            <ChartSelect 
                value={changeChartSelect}
                onChange={(e) => handleChartSelectChange(e.target.value)}
            >
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="weeks">Weeks</option>
            </ChartSelect>
            <HighchartsReact
                highcharts={Highcharts}
                options={options} // Render the chart with current options
            />
        </Tile>
    );
}
