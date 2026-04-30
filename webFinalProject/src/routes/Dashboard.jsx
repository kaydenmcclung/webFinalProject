import React, { useEffect, useState } from "react";
import "../App.css";
import TransactionCard from "../components/TransactionCard";
import Welcome from "../components/Welcome";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const response = await fetch("http://18.223.101.123:5000/transactions");
        if (!response.ok) throw new Error("Failed to fetch");
        
        const allTransactions = await response.json();

        // Sort by ID or Date descending (newest first)
        // Take only the first 5
        const recent = [...allTransactions]
          .sort((a, b) => b.id - a.id)
          .slice(0, 5);

        setTransactions(recent);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTransactions();
  }, []);

  return (
    <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
      <div style={{ flex: "1" }}>
        <h2 style={{ color: "white", marginBottom: "20px" }}>Recent Transactions</h2>

        {loading ? (
          <p style={{ color: "white" }}>Loading...</p>
        ) : transactions.length === 0 ? (
          <p style={{ color: "white" }}>No recent transactions yet.</p>
        ) : (
          transactions.map((t) => (
            <TransactionCard
              key={t._id}
              transactionName={t.description || "Transaction"}
              amount={t.amount}
              category={t.category}
              date={t.date ? t.date.split('T')[0] : "No Date"}
            />
          ))
        )}
      </div>

      <div style={{ flex: "1" }}>
        <Welcome />
      </div>
    </div>
  );
};

export default Dashboard;