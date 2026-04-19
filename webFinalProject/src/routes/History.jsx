import React, { useEffect, useState } from "react";

const History = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(stored);
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  // newest first
  const sortedTransactions = [...transactions].sort((a, b) => b.id - a.id);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Transaction History
      </h2>

      {sortedTransactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        sortedTransactions.map((t) => (
          <div
            key={t.id}
            style={{
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#1c2240",
              color: "white",
            }}
          >
            {/* LEFT SIDE INFO */}
            <div>
              <h3 style={{ margin: "0 0 5px 0" }}>
                {t.description || "Transaction"}
              </h3>

              <p style={{ margin: "2px 0" }}>
                <strong>Category:</strong> {t.category}
              </p>

              <p style={{ margin: "2px 0" }}>
                <strong>Date:</strong> {t.date}
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  margin: "0 0 10px 0",
                  fontWeight: "bold",
                  color: t.type === "income" ? "lightgreen" : "#ff8080",
                }}
              >
                ${t.amount}
              </p>

              <button
                onClick={() => handleDelete(t.id)}
                style={{
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default History;