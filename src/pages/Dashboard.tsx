import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusIcon, DollarSign, PieChart, History, Pencil, Trash2, LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ExpenseDialog } from "@/components/ExpenseDialog";
import { Expense } from "@/types/expense";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchExpenses = async () => {
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching expenses",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("expenses").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Expense deleted successfully" });
      fetchExpenses();
    } catch (error: any) {
      toast({
        title: "Error deleting expense",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({ title: "Logged out successfully" });
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categories = [...new Set(expenses.map((expense) => expense.category))];
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthlyExpenses = expenses.filter(
    (expense) => expense.date.slice(0, 7) === thisMonth
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-mint-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6 animate-in">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <ExpenseDialog onSuccess={fetchExpenses} trigger={
              <Button className="bg-mint-500 hover:bg-mint-600">
                <PlusIcon className="mr-2 h-4 w-4" /> Add Expense
              </Button>
            } />
            <Button 
              variant="outline" 
              className="gap-2" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" /> 
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 glass-card">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-mint-100 rounded-full">
                <DollarSign className="h-6 w-6 text-mint-700" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <h3 className="text-2xl font-bold">${totalSpent.toFixed(2)}</h3>
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
                <h3 className="text-2xl font-bold">{categories.length}</h3>
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
                <h3 className="text-2xl font-bold">{monthlyExpenses.length} Expenses</h3>
              </div>
            </div>
          </Card>
        </div>

        <Card className="glass-card">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
            {loading ? (
              <p className="text-center text-muted-foreground">Loading expenses...</p>
            ) : expenses.length === 0 ? (
              <p className="text-center text-muted-foreground">No expenses found. Add your first expense!</p>
            ) : (
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
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">${expense.amount.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{expense.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <ExpenseDialog
                          expense={expense}
                          onSuccess={fetchExpenses}
                          trigger={
                            <Button size="icon" variant="ghost">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          }
                        />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Expense</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this expense? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(expense.id)}
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
