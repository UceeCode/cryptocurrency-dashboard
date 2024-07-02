import React from 'react';
import ConfirmButton from '../Settings/ConfirmButton';
import _ from 'lodash';
import moment from 'moment';

const cc = require('cryptocompare');
cc.setApiKey('afdf25afda3dd3d85e0d73db7110371f717193db9959c32fb43131770171a8e2');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            ...this.savedSettings(),
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setCurrentFavorite: this.setCurrentFavorite,
            setFilteredCoins: this.setFilteredCoins
        };
    }

    componentDidMount = () => {
        this.fetchCoins();
        this.fetchPrices();
        this.fetchHistorical();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({ coinList });
    }

    fetchPrices = async () => {
        if (this.state.firstVisit) return;
        let prices = await this.prices();
        prices = prices.filter(price => Object.keys(price).length);
        this.setState({ prices });
    }

    fetchHistorical = async () => {
        if (this.state.firstVisit) return;
        let results = await this.historical();
        let historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((ticker, index) => [
                    moment().subtract({ months: TIME_UNITS - index }).valueOf(),
                    ticker.USD
                ])
            }
        ];
        this.setState({ historical });
        localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            historical
        }));
    }

    prices = async () => {
        let returnData = [];
        for (let i = 0; i < this.state.favorites.length; i++) {
            try {
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
                returnData.push(priceData);
            } catch (e) {
                console.warn(`Fetch price error for ${this.state.favorites[i]}: `, e);
            }
        }
        return returnData;
    }

    addCoin = key => {
        let favorites = [...this.state.favorites];
        if (favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({ favorites });
        }
    }

    historical = () => {
        let promises = [];
        for (let units = TIME_UNITS; units > 0; units--) {
            promises.push(
                cc.priceHistorical(
                    this.state.currentFavorite,
                    ['USD'],
                    moment().subtract({ month: units }).toDate()
                )
            )
        }
        return Promise.all(promises);
    }

    removeCoin = key => {
        let favorites = [...this.state.favorites];
        _.pull(favorites, key);
        this.setState({ favorites });
    }

    isInFavorites = key => _.includes(this.state.favorites, key)

    confirmFavorites = () => {
        let currentFavorite = this.state.favorites[0];
        this.setState({
            firstVisit: false,
            page: 'dashboard',
            currentFavorite,
            prices: null,
            historical: null
        }, () => {
            this.fetchPrices();
            this.fetchHistorical();
            localStorage.setItem('cryptoDash', JSON.stringify({
                favorites: this.state.favorites,
                currentFavorite
            }));
        });
    }

    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym
        }, this.fetchHistorical);
        localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currentFavorite: sym
        }));
    }
    

    savedSettings() {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            return { page: 'settings', firstVisit: true };
        }
        let { favorites, currentFavorite, historical } = cryptoDashData;
        return { favorites, currentFavorite, historical };
    }

    setPage = page => this.setState({ page })

    setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins });

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}
