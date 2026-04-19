import React, { useEffect, useState } from "react";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const totalIncome = incomeTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  );

  const totalExpenses = expenseTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  );

  const balance = totalIncome - totalExpenses;

  const categoryTotals = expenseTransactions.reduce((totals, transaction) => {
    const category = transaction.category || "general";

    if (!totals[category]) {
      totals[category] = 0;
    }

    totals[category] += Number(transaction.amount);
    return totals;
  }, {});

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Reports</h2>

      {/* Summary cards */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            flex: "1",
            minWidth: "200px",
            backgroundColor: "#1c2240",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Income</h3>
          <p style={{ fontSize: "24px", margin: 0, color: "lightgreen" }}>
            ${totalIncome.toFixed(2)}
          </p>
        </div>

        <div
          style={{
            flex: "1",
            minWidth: "200px",
            backgroundColor: "#1c2240",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Expenses</h3>
          <p style={{ fontSize: "24px", margin: 0, color: "#ff8080" }}>
            ${totalExpenses.toFixed(2)}
          </p>
        </div>

        <div
          style={{
            flex: "1",
            minWidth: "200px",
            backgroundColor: "#1c2240",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Balance</h3>
          <p
            style={{
              fontSize: "24px",
              margin: 0,
              color: balance >= 0 ? "lightgreen" : "#ff8080",
            }}
          >
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Spending by category */}
      <div
        style={{
          backgroundColor: "#1c2240",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Spending by Category</h3>

        {Object.keys(categoryTotals).length === 0 ? (
          <p>No expense transactions yet.</p>
        ) : (
          Object.entries(categoryTotals).map(([category, amount]) => (
            <div key={category} style={{ marginBottom: "15px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
              >
                <span style={{ textTransform: "capitalize" }}>{category}</span>
                <span>${amount.toFixed(2)}</span>
              </div>

              <div
                style={{
                  width: "100%",
                  backgroundColor: "#3a4066",
                  borderRadius: "6px",
                  height: "14px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${(amount / totalExpenses) * 100}%`,
                    backgroundColor: "#7aa2ff",
                    height: "100%",
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reports;