import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface LoginPageProps {
  client: Client;
  setLoggedIn: (loggedIn: boolean) => void;
}

const LoginPage = ({ client, setLoggedIn }: LoginPageProps) => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (
      e.currentTarget.email.value === client.email &&
      e.currentTarget.password.value === client.password
    ) {
      setLoggedIn(true);
      setLoading(false);
    } else {
      toast.error("Invalid Credentials, Please Try Again.");
      setLoading(false);
    }
  };
  return (
    <div
      className="relative before:absolute before:inset-0 before:bg-black before:opacity-80 flex justify-center items-center text-white h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${client.bannerUrl})` }}
    >
      <Card className="w-1/2 md:w-1/3 z-50">
        <CardHeader>
          <CardTitle>Hi {client.name} 👋</CardTitle>
          <CardDescription>
            Please enter your credentials to continue given by your agency.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Your Own Email address..." />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password Given By Your Agency"
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
