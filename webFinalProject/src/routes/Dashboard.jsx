import React, { useEffect, useState } from "react";
import "../App.css";
import TransactionCard from "../components/TransactionCard";
import Welcome from "../components/Welcome";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    // newest first
    const recentTransactions = storedTransactions.slice().reverse().slice(0, 5);

    setTransactions(recentTransactions);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <h2>Recent Transactions</h2>

        {transactions.length === 0 ? (
          <p>No recent transactions yet.</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transactionName={transaction.description || "No description"}
              amount={transaction.amount}
              category={transaction.type}
              date={new Date(transaction.id).toLocaleDateString()}
            />
          ))
        )}
      </div>

      <div style={{ flex: "1" }}>
        <Welcome />
        <h2 style={{ paddingTop: "30px" }}>Top Reports</h2>
      </div>
    </div>
  );
};

export default Dashboard;