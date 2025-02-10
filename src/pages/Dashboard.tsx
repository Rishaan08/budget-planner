
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusIcon, DollarSign, PieChart, History } from "lucide-react";

const mockExpenses = [
  { id: 1, description: "Groceries", amount: 150.50, date: "2024-02-20", category: "Food" },
  { id: 2, description: "Netflix", amount: 15.99, date: "2024-02-19", category: "Entertainment" },
  { id: 3, description: "Gas", amount: 45.00, date: "2024-02-18", category: "Transportation" },
];

const Dashboard = () => {
  const [expenses] = useState(mockExpenses);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-mint-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button className="bg-mint-500 hover:bg-mint-600">
            <PlusIcon className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 glass-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mint-100 rounded-full">
                <DollarSign className="h-6 w-6 text-mint-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <h3 className="text-2xl font-bold">$211.49</h3>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 glass-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mint-100 rounded-full">
                <PieChart className="h-6 w-6 text-mint-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <h3 className="text-2xl font-bold">3</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6 glass-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mint-100 rounded-full">
                <History className="h-6 w-6 text-mint-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <h3 className="text-2xl font-bold">3 Expenses</h3>
              </div>
            </div>
          </Card>
        </div>

        <Card className="glass-card">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
                >
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${expense.amount.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{expense.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
