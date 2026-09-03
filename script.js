const creditButton = document.getElementById("credit")
const debitButton = document.getElementById("debit")
const amountField = document.getElementById("amount")
const listAcounts = document.getElementById("listAcounts")
const descriptionField = document.getElementById("description")
const transactionSection = document.getElementById("transactions")
const ul = transactionSection.querySelector("ul");
const formPayment = document.getElementById("payment");
const moveMoneyBtn = document.getElementById("move-money")
const formWrapPayment = document.getElementById("form-wrap-payment");
const closePaymentBtn = document.getElementById("close-payment-form")
const accountsElement = document.getElementById("accounts");
const addAccountBtn = document.getElementById("add-account");
const formWrapAccount = document.getElementById("form-wrap-account");
const closeAccountFormBtn = document.getElementById("close-account-form");
const submitAccountBtn = document.getElementById("submit-account");
const formAccount = document.getElementById("add-account-form");
const accountNameInput = document.getElementById("name");
const errorMsg = document.getElementById("error-msg");
const loadingSpinHolder = document.getElementById("loading-spin-holder");

const API = "https://script.google.com/macros/s/AKfycbw4vGJrrart-4GSJcZOTUMBrkwA4waAE3pVjvdwuMvw2_iUI8EYGO9fhZD0qMyoLAFX/exec";

async function loadDataIntoTransactions() {



  const res = await fetch(API);
  const data = await res.json();
  console.log(data); // all rows
  ul.innerHTML = ""
  data.reverse().forEach(each => {
    ul.innerHTML += `<li>Amount: ${each.amount}
       Description: ${each.description}
       Account: ${each.account}
       New Balance: ${each.newBalance}</li>`
  })
}
loadDataIntoTransactions()

async function pushData(name, amount, description, type, newBalance) {
  const fd = new FormData();
  // your fields here…
  fd.append("account", name)
  fd.append("amount", amount)
  fd.append("description", description)
  fd.append("type", type)
  fd.append("newBalance", newBalance)
  const r = await fetch(API, {
    method: "POST",
    body: fd
  });

  return await r.json();
}


const transactions = [];
const accounts = [
  {
    name: "Shaye Cash",
    amount: 5000
  },
  {
    name: "G rifky Cash",
    amount: 0
  }
]
const displayAccount = () => {
  accountsElement.innerHTML = ""
  accounts.forEach(account => {
    accountsElement.innerHTML += `<li>${account.name}<br>${account.amount}</li>`
  })
}
displayAccount()
function credit(account, amount, description = "") {
  accounts.find(acc => acc.name === account).amount += amount
  const acc = accounts.find(acc => acc.name === account)
  const newBalance = acc.amount
  //transactions.push({ account, amount, description, type: "credit", newBalance: newBalance })
  return pushData(account, amount, description, "credit", newBalance)

}
// this is a new command
function debit(account, amount, description = "") {
  accounts.find(acc => acc.name === account).amount -= amount
  const acc = accounts.find(acc => acc.name === account)
  const newBalance = acc.amount
  //transactions.push({ account, amount, description, type: "debit", newBalance: newBalance })
  pushData(account, amount, description, "debit", newBalance)
}

creditButton.addEventListener("click", async (e) => {
  e.preventDefault()
  if (!formPayment.reportValidity()) {
    return
  }
  loadingSpinHolder.style.display = "block";
  const callCredit = await credit(listAcounts.value, Number(amountField.value), descriptionField.value);
  //ul.insertAdjacentHTML("beforeend", `<li>Amount: ${Number(amountField.value)} Description: ${descriptionField.value} Account: ${listAcounts.value} New Balance: ${transactions[transactions.length - 1].newBalance}</li>`)
  
  listAcounts.value = "";
  amountField.value = "";
  descriptionField.value = "";
  formWrapPayment.style.display = "none";
  moveMoneyBtn.style.display = "inline-block"
  ul.insertAdjacentHTML("afterbegin", `<li>Amount: ${callCredit.row[1]} Description: ${callCredit.row[2]} Account: ${callCredit.row[0]} New Balance: ${callCredit.row[4]}</li>`)
  loadingSpinHolder.style.display = "none";
});

debitButton.addEventListener("click", async (e) => {
  e.preventDefault()
  if (!formPayment.reportValidity()) {
    return
  }
  await debit(listAcounts.value, Number(amountField.value), descriptionField.value)
  //ul.insertAdjacentHTML("beforeend", `<li>Amount: ${Number(amountField.value)} Description: ${descriptionField.value} Account: ${listAcounts.value} New Balance: ${transactions[transactions.length - 1].newBalance}</li>`)
  listAcounts.value = "";
  amountField.value = "";
  descriptionField.value = "";
  await loadDataIntoTransactions()
  formWrapPayment.style.display = "none";
  moveMoneyBtn.style.display = "inline-block"
});

submitAccountBtn.addEventListener("click", (e) => {
  e.preventDefault()
  if (!formAccount.reportValidity() || !isValidName) {
    return
  }

  accounts.push({ name: accountNameInput.value, amount: 0 })
  accountNameInput.value = "";
  displayAccount()
});
let isValidName = true
accountNameInput.addEventListener("input", ()=>{
  const exist = accounts.some(account =>
    account.name.toLowerCase().trim() === accountNameInput.value.toLowerCase().trim()
  )
  if(exist){
    errorMsg.innerText = "This account name already exis,please choose another name"
    isValidName = false
  } else {
    errorMsg.innerText = ""
    isValidName = true
  }
})

// function displayTransactions() {

//   transactions.forEach(transaction => {
    
//   })
// }
// displayTransactions()

moveMoneyBtn.addEventListener("click", () => {
  formWrapPayment.style.display = "block";
  moveMoneyBtn.style.display = "none"
})
closePaymentBtn.addEventListener("click", () => {
  formWrapPayment.style.display = "none";
  moveMoneyBtn.style.display = "inline-block"
});

addAccountBtn.addEventListener("click", () => {

  formWrapAccount.style.display = "block"
});
closeAccountFormBtn.addEventListener("click", () => {
  formWrapAccount.style.display = "none"
})
// to delete
const tester = document.getElementById("tester")
tester.addEventListener("click", () => {
  console.log(transactions)
})