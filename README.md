# TAC Transaction Tracker

TAC Transaction Tracker is a starter application that demonstrates the usage of TAC SDK and Telegram APIs.

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/suhailkakar/tac-transaction-tracker.git
   ```

2. Install dependencies:

   ```
   cd tac-transaction-tracker
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     BOT_TOKEN=your_telegram_bot_token
     LOG_LEVEL=debug
     TAC_NETWORK=testnet
     ```

4. Start the application:

   ```
   npm start
   ```

5. Interact with the Telegram bot by sending commands:
   - `/start` - Start the bot and receive a welcome message
   - `/track <operationId>` - Check the status of a transaction by providing the operation ID
   - `/help` - Get a list of available commands

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
