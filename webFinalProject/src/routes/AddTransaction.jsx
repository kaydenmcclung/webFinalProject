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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation logic remains the same
    if (!amount || !date || !category) {
      alert("Please fill in all required fields");
      return;
    }

    const transactionData = {
      amount: parseFloat(amount),
      type,
      category,
      date,
      description,
    };

    try {
      // 2. Send to Hapi API
      const response = await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      if (response.ok) {
        alert("Transaction added to database!");
      
        // Reset form
        setAmount("");
        setType("income");
        setCategory("");
        setDate("");
        setDescription("");
        navigate("/history");
      } else {
        alert("Failed to save transaction.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server is not responding.");
    }
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