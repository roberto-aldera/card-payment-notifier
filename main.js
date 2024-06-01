async function notifyOnTelegram(textMessageContent) {
  const response = await fetch(
    "https://api.telegram.org/bot" + process.env.apiKey + "/sendMessage",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.chatID,
        parse_mode: "Markdown",
        text: textMessageContent,
      }),
    }
  );
  console.log(response);
}

const buildTextMessageText = (authorization) => {
  const textMessageContent = `Transaction occurred at ${authorization.merchant.name.replace(
    /\*/g,
    ""
  )} for ${authorization.currencyCode.toUpperCase()} ${investec.helpers.format.decimal(
    authorization.centsAmount / 100,
    100
  )} 💸
💳 Cardholder: ${process.env.cardholder}
🗃️ Reference: ${authorization.reference}
🛒 Category: ${authorization.merchant.category.name} (${
    authorization.merchant.category.code
  })
📍 Location: ${authorization.merchant.city}`;
  return textMessageContent;
};

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
  const textMessageContent = buildTextMessageText(transaction);
  await notifyOnTelegram(textMessageContent);
  await alertOnAnomalousActivity(transaction);
  console.log(transaction);
};
