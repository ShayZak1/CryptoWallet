# Project Name

Developed by Omri Gawi, Ofek Cohen, Omri Shalev

## How to Run the Project:

1. Open terminal as administrator.
2. Navigate to the project directory.
3. Run `npm install`.
4. Run `node app`.
5. In your web browser, connect to http://localhost:8080.

## How to Test the Project:

We have 3 types of currencies:
1. **Ethereum**:
   - Secret Phrase for ETH Wallet: `catalog cricket kitchen jump undo culture ask pigeon ski flash clog mail`
   - Web3 + API Key and network: `https://goerli.infura.io/v3/753d2b335e85476cb9a17d5e2839d43d`
   - Get faucet from: [Goerli Faucet](https://goerlifaucet.com/)

2. **Celo**:
   - Secret Phrase for Celo Wallet: `wise move dirt stairs boost alarm notable iron minor soul zoo chest`
   - Web3 + API Key and network: `https://celo-alfajores.infura.io/v3/753d2b335e85476cb9a17d5e2839d43d`
   - Get faucet from: [Celo Faucet](https://celo.org/developers/faucet)

3. **BNB**:
   - Secret Phrase for BNB Wallet: `else core engage service banner range cram wheat myth predict favorite enhance`
   - Web3 + API Key and network: `https://go.getblock.io/b6fd4c3cbd3f4f78a1286cfd3fc284e0`
   - Get faucet from: [BNB Faucet](https://www.bnbchain.org/en/testnet-faucet)

Each of the currencies contains at least two addresses with a positive balance so you can test the functionality of the project.

## Example of Sending Funds Between Two Addresses:
1. Enter Seed (12-word).
2. Press the "Check Wallet" button.
3. Enter "2" in the pop-up message.
Below the buttons, you will see the prints of the 2 addresses you requested.
4. Under "Send funds," enter the receiver address and the sender address + the currency amount to send (make sure there are enough funds, if not generate faucet with the links above).
5. Re-press "Check Wallet" and 2 addresses; you will see the new balances.
