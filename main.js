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
🗃️ Reference: ${authorization.reference}
🛒 Category: ${authorization.merchant.category.name} (${authorization.merchant.category.code})
📍 Location: ${authorization.merchant.city}`,
      }),
    }
  );
  console.log(authorization);
  console.log(response);
}

async function alertOnAnomalousActivity(authorization) {
  if (authorization.currencyCode !== "zar") {
    try {
      const response = await fetch(process.env.alertNotifier);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error hitting endpoint:", error);
    }
  }
}

// This function runs after a transaction was successful.
const afterTransaction = async (transaction) => {
  await notifyOnTelegram(transaction);
  await alertOnAnomalousActivity(transaction);
  console.log(transaction);
};
