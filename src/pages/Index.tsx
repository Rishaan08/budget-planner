
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-mint-50">
      <div className="text-center space-y-6 animate-in">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Track Your Expenses
          </h1>
          <p className="text-muted-foreground mx-auto max-w-[600px] text-sm sm:text-base md:text-lg">
            Take control of your finances with our simple and elegant expense tracking solution.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-mint-500 hover:bg-mint-600 text-white transition-all duration-200"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/auth")}
            className="border-mint-500 text-mint-500 hover:bg-mint-50"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
