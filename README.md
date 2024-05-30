# Payment Pinger 💸
## What is this?
It's a short snippet for an [Investec programmable bank card](https://www.investec.com/en_za/banking/tech-professionals/programmable-banking.html) to post to payment details to Telegram for card payments.
This is super useful if we want visibility on payments from different cards in one place, like if there are multiple card holders linked to a single account.
Additionally, it includes simple anomaly detection which alerts via email when a non-ZAR transaction takes place. 

## Setup
### Posting to Telegram ✈️
- Create a [Telegram bot](https://core.telegram.org/bots/tutorial) and grab the API key
- Add your bot to a Telegram group, and grab the chatID for that group from the output of:
  
  ```curl https://api.telegram.org/bot\your-api-key/getupdates | jq```
- Add the contents of `main.js` to your Investec developer IDE portal
- Modify your `env.json` in the portal to include the
  - `telegramURL` - `https://api.telegram.org/bot`
  - `apiKey` - from your bot
  - `chatID` - for the group chat
  - `cardholder` - used for inclusion in the sent messages (useful if you've got more than one cardholder linked to your account)
 
### Anomaly detection 🕵️
This makes use of a [Canarytoken](https://canarytokens.org/generate) to fire off an email as it's a nice quick way to get a notification.
We could use other alert channels here too, or even just post a more urgently-phrased message to the same Telegram channel.
To set up the detection:
- Create a **web bug/URL Canarytoken** to use as your notification trigger to be alerted via email (or another channel if you prefer)
- Drop the Canarytoken's URL in your `env.json` as your `alertNotifier` variable

## Give it a whir 🏎️
You can test this code with Investec's simulation payments, which should send messages to your Telegram group as shown below.
When you're ready to test the anomaly detection, change the currency in the simulated payment to anything other than `ZAR` and you should trigger the email alert.

<img width="471" alt="message" src="https://github.com/roberto-aldera/card-payment-notifier/assets/51328612/23b31eb8-d9fa-4c04-8b9f-16bb4661e136">

<img width="701" alt="canarytoken" src="https://github.com/roberto-aldera/card-payment-notifier/assets/51328612/8a4767d8-00b9-461b-98cd-eabecda1cedd">

## Thanks
Credit to Russell Knight for his [Investec Telegram write-up](https://drive.google.com/file/d/1rnbHtGYngtWP2S3M5TAcCec_GIp30U6j/view).
