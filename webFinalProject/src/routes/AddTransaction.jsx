import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AddTransaction = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState(""); // ← updated
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || !date || !category) {
      alert("Please fill in all required fields");
      return;
    }

    if (parseFloat(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      type,
      category,
      date,
      description,
    };

    const existing =
      JSON.parse(localStorage.getItem("transactions")) || [];

    const updated = [...existing, newTransaction];

    localStorage.setItem("transactions", JSON.stringify(updated));

    alert("Transaction added!");

    // Reset form
    setAmount("");
    setType("income");
    setCategory(""); // ← reset correctly
    setDate("");
    setDescription("");

    navigate("/history");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <div
        style={{
          width: "500px",
          backgroundColor: "#1c2240",
          padding: "30px",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          Add Transaction
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {/* Amount */}
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
          />

          {/* Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={inputStyle} 
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category (UPDATED) */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={inputStyle}
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            <option value="general">General</option>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="shopping">Shopping</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
          </select>

          {/* Date */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />

          {/* Description */}
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#7aa2ff",
              border: "none",
              borderRadius: "6px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "none",
  fontSize: "16px",
  backgroundColor: "#45455f"
};

export default AddTransaction;