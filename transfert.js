const user = JSON.parse(sessionStorage.getItem("current user"));

document.addEventListener("DOMContentLoaded", function(){

const transferBtn = document.getElementById("transferBtn");

if(!user){
console.log("Utilisateur non connecté");
return;
}

loadTransactions();

transferBtn.addEventListener("click", function(){

const amount = Number(document.getElementById("amount").value);
const beneficiaire = document.getElementById("beneficiaire").value.trim();
const result = document.getElementById("transferResult");

if(amount <= 0 || isNaN(amount)){
result.textContent="Montant invalide";
return;
}

if(user.wallet.balance < amount){
result.textContent="Solde insuffisant";
return;
}

if(!beneficiaire){
result.textContent="Bénéficiaire invalide";
return;
}

const debit = {
id:Date.now(),
type:"debit",
amount:amount,
date:new Date().toLocaleDateString(),
from:user.name,
to:beneficiaire
};

user.wallet.transactions.push(debit);

user.wallet.balance -= amount;

sessionStorage.setItem("current user", JSON.stringify(user));

result.textContent="Transfert réussi";

loadTransactions();

});

});

function loadTransactions(){

const table = document.getElementById("transactionsTable");

table.innerHTML="";

user.wallet.transactions.forEach(t=>{

const row = document.createElement("tr");

row.innerHTML = `
<td>${t.date}</td>
<td>${t.type}</td>
<td>${t.amount}</td>
<td>${t.from}</td>
<td>${t.to}</td>
`;

table.appendChild(row);

});

}