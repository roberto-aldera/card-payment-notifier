async function notifyOnTelegram(authorization) {
  const response = await fetch(
    process.env.telegramURL + process.env.apiKey + "/sendMessage",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.chatID,
        parse_mode: "Markdown",
        text: `Purchase authorised at ${authorization.merchant.name.replace(
          /\*/g,
          ""
        )} for ${authorization.currencyCode.toUpperCase()} ${investec.helpers.format.decimal(
          authorization.centsAmount / 100,
          100
        )} 💸
💳 Cardholder: ${process.env.cardholder}
🛒 Category: ${authorization.merchant.category.name}
📍 Location: ${authorization.merchant.city}`,
      }),
    }
  );
  console.log(authorization);
  console.log(response);
}

// This function runs after a transaction was successful.
const afterTransaction = async (transaction) => {
  await notifyOnTelegram(transaction);
  console.log(transaction);
};
