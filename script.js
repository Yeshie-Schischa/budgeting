const creditButton = document.getElementById("credit")
const debitButton = document.getElementById("debit")
const transactions = [];
const accounts = [
    {name: "shaye cash",
     amount: 500
    },
    {name: "g rifky cash",
    amount: 300
    }
]
localStorage.setItem("transaction", transactions);
localStorage.setItem("accounts", accounts)
function credit(account, amount, description = ""){
    transactions.push({account, amount, description, type:"credit", })
    accounts.find(acc => acc.name === account).amount += amount
    localStorage.setItem("transaction", transactions);

}

function debit(account, amount, description = ""){
    transactions.push({account, amount, description, type:"debit", })
    accounts.find(acc => acc.name === account).amount -= amount
    localStorage.setItem("transaction", transactions);
}

credit("g rifky cash", 1000)

creditButton.addEventListener("click", (e)=>{
  e.preventDefault()
  
})
