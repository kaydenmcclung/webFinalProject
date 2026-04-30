import React, { useEffect, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

const Insights = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterRange, setFilterRange] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://18.223.101.123/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredTransactions = useMemo(() => {
    if (filterRange === "all") return transactions;

    const today = new Date();
    const daysToSubtract = filterRange === "7" ? 7 : 30;

    return transactions.filter((transaction) => {
      if (!transaction.date) return false;

      const transactionDate = new Date(transaction.date);
      const diffTime = today - transactionDate;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      return diffDays <= daysToSubtract && diffDays >= 0;
    });
  }, [transactions, filterRange]);

  const expenseTransactions = filteredTransactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const incomeTransactions = filteredTransactions.filter(
    (transaction) => transaction.type === "income"
  );

  const totalIncome = incomeTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  );

  const totalExpenses = expenseTransactions.reduce(
    (sum, transaction) => sum + Number(transaction.amount),
    0
  );

  const incomeVsExpenseData = [
    { name: "Income", amount: totalIncome },
    { name: "Expenses", amount: totalExpenses },
  ];

  const categoryTotals = expenseTransactions.reduce((totals, transaction) => {
    const category = transaction.category || "General";
    if (!totals[category]) totals[category] = 0;
    totals[category] += Number(transaction.amount);
    return totals;
  }, {});

  const categoryData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  const dailyTotals = expenseTransactions.reduce((totals, transaction) => {
    const date = transaction.date ? transaction.date.split('T')[0] : "No Date";

    if (!totals[date]) totals[date] = 0;
    totals[date] += Number(transaction.amount);
    return totals;
  }, {});

  const lineData = Object.keys(dailyTotals)
    .sort()
    .map((date) => ({
      date,
      amount: dailyTotals[date],
    }));

  const COLORS = ["#7aa2ff", "#ff8080", "#82ca9d", "#ffc658", "#a78bfa"];

  if (loading) return <div style={{ color: 'white', textAlign: 'center', padding: '50px' }}>Loading Insights...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "white" }}>
        Insights
      </h2>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "25px" }}>
        <select
          value={filterRange}
          onChange={(e) => setFilterRange(e.target.value)}
          style={{
            padding: "10px 14px",
            borderRadius: "8px",
            border: "none",
            fontSize: "16px",
            backgroundColor: "#1c2240",
            color: "white",
          }}
        >
          <option value="all">All Time</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "25px",
          padding: "10px",
        }}
      >
        {/* Category Chart */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>Expenses by Category</h3>
          {categoryData.length === 0 ? (
            <p>No expense data for this filter.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar Chart */}
        <div style={cardStyle}>
          <h3 style={titleStyle}>Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={incomeVsExpenseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#7aa2ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Chart */}
        <div style={{ ...cardStyle, gridColumn: "1 / -1" }}>
          <h3 style={titleStyle}>Expense Trend Over Time</h3>
          {lineData.length === 0 ? (
            <p>No dated expense data for this filter.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#82ca9d"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

// styles, should be in css but idc anymore
const cardStyle = {
  background: "linear-gradient(145deg, #1c2240, #2a2f5a)",
  padding: "20px",
  borderRadius: "12px",
  color: "white",
  minHeight: "350px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "15px",
  fontWeight: "600",
};

export default Insights;