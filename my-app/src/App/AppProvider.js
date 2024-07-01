import React from 'react';
import ConfirmButton from '../Settings/ConfirmButton';
import _ from 'lodash';

const cc = require('cryptocompare');
cc.setApiKey('afdf25afda3dd3d85e0d73db7110371f717193db9959c32fb43131770171a8e2');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

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
            setFilteredCoins: this.setFilteredCoins
        };
    }

    componentDidMount = () => {
        this.fetchCoins();
        this.fetchPrices();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({ coinList });
    }

    fetchPrices = async () => {
        if (this.state.firstVisit) return;
        let prices = await this.prices();
        console.log(prices)
        prices = prices.filter(price => Object.keys(price).length);
        this.setState({prices})
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

    removeCoin = key => {
        let favorites = [...this.state.favorites];
        _.pull(favorites, key);
        this.setState({ favorites });
    }

    isInFavorites = key => _.includes(this.state.favorites, key)

    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        }, () => {
            this.fetchPrices(); 
            localStorage.setItem('cryptoDash', JSON.stringify({
                favorites: this.state.favorites
            }));
        });
    }
    
    savedSettings() {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            return { page: 'settings', firstVisit: true };
        }
        let {favorites} = cryptoDashData;
        return {favorites};
    }

    setPage = page => this.setState({ page })

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}
