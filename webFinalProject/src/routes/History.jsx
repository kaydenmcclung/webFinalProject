import React, { useEffect, useState } from "react";

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch data
  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://18.223.101.123:5000/transactions");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://18.223.101.123:5000/transactions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTransactions((prev) => prev.filter((t) => t._id !== id));
      } else {
        alert("Failed to delete from server.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error connecting to server.");
    }
  };

  // Sort by ID 
  const sortedTransactions = [...transactions].sort((a, b) => b.id - a.id);

  if (loading) {
    return <p style={{ textAlign: "center", color: "white", padding: "20px" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>
        Transaction History
      </h2>

      {sortedTransactions.length === 0 ? (
        <p style={{ textAlign: "center", color: "white" }}>No transactions yet.</p>
      ) : (
        sortedTransactions.map((t) => (
          <div
            key={t._id}
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
              <p style={{ margin: "2px 0", fontSize: "0.9rem", opacity: 0.8 }}>
                <strong>Category:</strong> {t.category}
              </p>
              <p style={{ margin: "2px 0", fontSize: "0.9rem", opacity: 0.8 }}>
                <strong>Date:</strong> {t.date.split('T')[0]}
              </p>
            </div>

            {/* RIGHT SIDE */}
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  margin: "0 0 10px 0",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: t.type === "income" ? "#90ee90" : "#ff8080",
                }}
              >
                {t.type === "income" ? "+" : "-"}${t.amount}
              </p>
              <button
                onClick={() => handleDelete(t._id)}
                style={{
                  backgroundColor: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
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