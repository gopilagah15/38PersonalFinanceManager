import React, { useState } from 'react'

const FinanceManager = () => {
    const [transactions, settransactions] = useState([]);
    const [income, setincome] = useState(0);
    const [budgetGoals, setbudgetGoals] = useState(0);
    const [expense, setexpense] = useState({category:'', amount:0});

    const handleIncome=()=>{
        settransactions([...transactions,{type:'income', amount:income}])
    }

    const handleAddExpenses=()=>{
        settransactions([...transactions,{type:'expense', ...expense}]);
    }

    const totalExpenses=transactions
    .filter((t)=>t.type === 'expense')
    .reduce((sum,t)=>sum+parseFloat(t.amount),0);

    const categorySpending = (category)=>{
        return transactions
        .filter((t)=>t.type === 'expense' && t.category === category)
        .reduce((sum,t)=>sum+parseFloat(t.amount),0);
    }
      return (
    <div>
        <h1>Personal Finance Report</h1>

<div>
    <h2>Add Income</h2>
    <input type="number" value={income} onChange={(e)=>setincome(e.target.value)} />
    <button onClick={handleIncome}>Add income</button>
</div>
<div>
    <h2>Add expenses</h2>
    <select value={expense.category}   onChange={(e)=>setexpense({...expense,category:e.target.value})}>
        <option value="">Category</option>
        <option value="food">Food</option>
        <option value="rent">Rent</option>
        <option value="utilities">Utilities</option>
    </select>
    <input type="number" value={expense.amount} placeholder='Amount' onChange={(e)=>setexpense({...expense,amount:e.target.value})} />
    <button onClick={handleAddExpenses}>Add Expenses</button>
</div>
<h2>Summary</h2>
<p>Total Income : ${transactions.filter((e)=>e.type === 'income').reduce((sum,t)=>sum+parseFloat(t.amount),0)}</p>
<p>Total Expenses : ${totalExpenses}</p>
<p>Remaining Budget: ${income-totalExpenses}</p>

<h3>Spending By category</h3>
<p>Food : ${categorySpending('food')}</p>
<p>Utilities : ${categorySpending('utilities')}</p>
<p>Rent : ${categorySpending('rent')}</p>
    </div>

  )
}

export default FinanceManager