# Crypto Dash

Crypto Dashboard is a web application for tracking the prices and historical data of various cryptocurrencies. It allows users to select their favorite coins, view their current prices, and visualize historical price trends over different time intervals.

# Live Demo
You can view the app using the following link: https://uceecode.github.io/cryptocurrency-dashboard/ 

## Installation

To install and run the project locally, follow these steps:

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/crypto-dashboard.git
    cd crypto-dashboard
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Add the necessary API keys. Create a `.env` file in the root of your project and add your API key:

    ```env
    REACT_APP_CRYPTO_COMPARE_API_KEY=your_cryptocompare_api_key
    ```

## Usage

To start the development server, run:

```sh
npm start
```

## Features

1. View current prices of favorite cryptocurrencies.
2. Add or remove cryptocurrencies from the favorites list.
3. View historical price data for selected cryptocurrencies.
4. Switch between different time intervals (days, weeks, months) for historical data.

## Technologies Used

1. React: JavaScript library for building user interfaces.
2. Moment.js: Parse, validate, manipulate, and display dates and times.
3. Lodash: A modern JavaScript utility library.
4. Highcharts: Interactive charting library.
5. CryptoCompare API: API for cryptocurrency price data.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request with your changes. Make sure to follow the code style and include tests for new features or bug fixes.