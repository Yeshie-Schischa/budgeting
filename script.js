const creditButton = document.getElementById("credit")
const debitButton = document.getElementById("debit")
const amountField = document.getElementById("amount")
const listAcounts = document.getElementById("listAcounts")
const descriptionField = document.getElementById("description")
const transactionSection = document.getElementById("transactions")
const ul = transactionSection.querySelector("ul");


const transactions = [];
const accounts = [
    {name: "Shaye Cash",
     amount: 0
    },
    {name: "G rifky Cash",
    amount: 0
    }
]

function credit(account, amount, description = ""){
    const newBalance = accounts.find(acc => acc.name === account).amount += amount
    transactions.push({account, amount, description, type:"credit", newBalance: newBalance})
    
}
// this is a new command
function debit(account, amount, description = ""){
    transactions.push({account, amount, description, type:"debit", })
    accounts.find(acc => acc.name === account).amount -= amount
    localStorage.setItem("transaction", transactions);
}

credit("G rifky Cash", 1000)

creditButton.addEventListener("click", (e)=>{
  e.preventDefault()
  const newBalance = credit(listAcounts.value, Number(amountField.value), descriptionField.value)
  ul.insertAdjacentHTML("beforeend", `<li>Amount: ${Number(amountField.value)} Description: ${descriptionField.value} Account: ${listAcounts.value} New Balance: ${transactions[transactions.length-1].newBalance}</li>`)
  listAcounts.value = "";
  amountField.value =  "";
  descriptionField.value = "";
})

function displayTransactions() {
    
    transactions.forEach(transaction => {
       ul.innerHTML = `<li>Amount: ${transaction.amount} Description: ${transaction.description} Account: ${transaction.account} New Balance: ${transaction.newBalance}</li>`
    })
}
displayTransactions()
// to delete
const tester = document.getElementById("tester")
tester.addEventListener("click", () => {
    console.log(transactions)
})