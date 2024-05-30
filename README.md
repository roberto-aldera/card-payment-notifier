# Payment Pinger
## What is this?
It's a short snippet for an Investec card to post to payment details to Telegram for card payments.
Additionally, it includes simple anomaly detection which alerts via email when a non-ZAR transaction takes place. 

## Setup
### Posting to Telegram
- Create a [Telegram bot](https://core.telegram.org/bots/tutorial) and grab the API key
- Add your bot to a Telegram group, and grab the chatID for that group from the output of:
  
  ```curl https://api.telegram.org/bot\your-api-key/getupdates | jq```
- Add the contents of `main.js` to your Investec developer IDE portal
- Modify your `env.json` in the portal to include the
  - `telegramURL`
  - `apiKey`
  - `chatID`
  - `cardholder`
 
### Anomaly detection
- Create a [Canarytoken](https://canarytokens.org/generate) to use as your notification trigger to be alerted via email (or another channel if you prefer)
- Drop the Canarytoken's URL in your `env.json` as your `alertNotifier` variable
