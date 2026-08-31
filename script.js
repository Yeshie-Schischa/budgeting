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


const API = "https://script.google.com/macros/s/AKfycbyTP_zTf5LNnq4Mv9kugsaAfh8Mtto4tKacuZpxtExqCN4hgsUlVwnoNF8dBlOA2Byc/exec";

async function loadData() {
  const res = await fetch(API);
  const data = await res.json();
  console.log(data); // all rows
}
loadData();

async function pushData(name, amount, description, type, newBalance) {
  const fd = new FormData();
  // your fields here…

  const r = await fetch(API, {
    method: "POST",
    body: {value: [name, amount,  description, type, newBalance]}
  });

  console.log(await r.json());
}
pushData("shaye cash", "1300", "trump", "credit", 4500)



const transactions = [];
const accounts = [
  {
    name: "Shaye Cash",
    amount: 0
  },
  {
    name: "G rifky Cash",
    amount: 0
  }
]
const displayAccount = () => {
  accountsElement.innerHTML = ""
  accounts.forEach(account => {
    accountsElement.innerHTML += `<li>${account.name}${account.amount}</li>`
  })
}
displayAccount()
function credit(account, amount, description = "") {
  const newBalance = accounts.find(acc => acc.name === account).amount += amount
  transactions.push({ account, amount, description, type: "credit", newBalance: newBalance })

}
// this is a new command
function debit(account, amount, description = "") {
  const newBalance = accounts.find(acc => acc.name === account).amount -= amount
  transactions.push({ account, amount, description, type: "debit", newBalance: newBalance })

}


creditButton.addEventListener("click", (e) => {
  e.preventDefault()
  if (!formPayment.reportValidity()) {
    return
  }
  const newBalance = credit(listAcounts.value, Number(amountField.value), descriptionField.value)
  ul.insertAdjacentHTML("beforeend", `<li>Amount: ${Number(amountField.value)} Description: ${descriptionField.value} Account: ${listAcounts.value} New Balance: ${transactions[transactions.length - 1].newBalance}</li>`)
  listAcounts.value = "";
  amountField.value = "";
  descriptionField.value = "";
});

debitButton.addEventListener("click", (e) => {
  e.preventDefault()
  if (!formPayment.reportValidity()) {
    return
  }
  const newBalance = debit(listAcounts.value, Number(amountField.value), descriptionField.value)
  ul.insertAdjacentHTML("beforeend", `<li>Amount: ${Number(amountField.value)} Description: ${descriptionField.value} Account: ${listAcounts.value} New Balance: ${transactions[transactions.length - 1].newBalance}</li>`)
  listAcounts.value = "";
  amountField.value = "";
  descriptionField.value = "";
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

function displayTransactions() {

  transactions.forEach(transaction => {
    ul.innerHTML = `<li>Amount: ${transaction.amount}
       Description: ${transaction.description}
       Account: ${transaction.account}
       New Balance: ${transaction.newBalance}</li>`
  })
}
displayTransactions()

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