Project Overview

# Project was developed by Shay Zak, Elroei Seadia, Michael Ioffe.

# Running the Project

**To run the project, follow these steps**:

1.  Open the terminal with administrator privileges.
2.  Navigate to the project directory using cd path/to/project.
3.  Execute the following command to install dependencies: ` npm install`
4.  Start the application with: `node app`
5.  Open your web browser and go to http://localhost:5000 to access the application.

# Accessing the Project Online

In addition to the local setup, the project is hosted online through Vercel, allowing you to explore its features without any installation. Simply visit the link below to access the application:
https://crypto-wallet-two.vercel.app/
This online version provides full functionality, and you can interact with it by entering your secret keys directly on the site, without the need for a development environment like Visual Studio Code.
Testing the Project
The project supports four types of cryptocurrencies: Ethereum, Celo, Arbitrum and BNB. Below are the details for each currency, including the wallet setup and faucet information.

1.**Ethereum**
Secret Phrase for ETH Wallet: `spot wisdom tomato burden focus simple mammal cinnamon bicycle word vote original`
Web3 + API Key and Network: `https://sepolia.infura.io/v3/e5dc1327315c41d4b12b7502842daf55`
Faucet: Obtain test funds from: `https://cloud.google.com/application/web3/faucet/Ethereum`

2.**Celo**
Secret Phrase for Celo Wallet:` city worth sound limit swim service audit poverty forward arrange axis program`
Web3 + API Key and Network:
`https://celo-alfajores.infura.io/v3/e5dc1327315c41d4b12b7502842daf55`
Faucet: Obtain test funds from:
`https://faucet.celo.org/alfajores`


3.**Arbitrum**
Secret Phrase for ETH Wallet: `spin vocal tortoise chest ignore zoo chief celery diet engine auto divert`
Web3 + API Key and Network:
`https://arbitrum-sepolia.infura.io/v3/e5dc1327315c41d4b12b7502842daf55`
Faucet: Obtain test funds from: `https://www.alchemy.com/faucets/arbitrum-sepolia`

# Example: Sending Funds Between Two Addresses

      1.Enter Seed: Input the 12-word secret phrase.
      2.Check Wallet: Click the "Check Wallet" button.
      3.Select Addresses: In the pop-up message, type "2" to request the addresses. The addresses and their balances will be displayed below the buttons.
      4.Send Funds:
      Enter the receiver's address.
      Enter the sender's address and the amount of currency to send. Ensure the sender's wallet has sufficient funds; if not, use the faucets mentioned above.
      5.Verify Balances: Click "Check Wallet" again to view the updated balances for the addresses.
