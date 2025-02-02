const apiKey = "b620487e60cc0d96d22d588d"; // Replace with your ExchangeRate-API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultDiv = document.getElementById("result");

convertBtn.addEventListener("click", async () => {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    alert("Please enter a valid amount!");
    return;
  }

  try {
    const response = await fetch(`${apiUrl}${from}`);
    const data = await response.json();

    if (data.result === "success") {
      const exchangeRate = data.conversion_rates[to];
      const convertedAmount = (amount * exchangeRate).toFixed(2);
      resultDiv.innerHTML = `${amount} ${from} = ${convertedAmount} ${to}`;
    } else {
      resultDiv.innerHTML = "Failed to fetch exchange rates.";
    }
  } catch (error) {
    console.error("Error:", error);
    resultDiv.innerHTML = "An error occurred. Please try again.";
  }
});