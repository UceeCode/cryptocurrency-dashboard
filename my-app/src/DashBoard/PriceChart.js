import React from 'react';
import { Tile } from '../Shared/Tile';
import { AppContext } from '../App/AppProvider';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import getChartOptions from './HighChartConfig'; 
import HighChartTheme from './HighChartTheme';

Highcharts.setOptions(HighChartTheme);

export default function HighchartsComponent() {
    return (
        <AppContext.Consumer>
            {() => (
                <Tile>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={getChartOptions()}
                    />
                </Tile>
            )}
        </AppContext.Consumer>
    );
}
