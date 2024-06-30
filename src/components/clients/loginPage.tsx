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
import { Button } from "../ui/button";

interface LoginPageProps {
  client: Client;
}

const LoginPage = ({ client }: LoginPageProps) => {
  return (
    <div
      className="imageBg flex justify-center items-center text-white h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${client.bannerUrl})` }}
    >
      <Card className="w-1/2 md:w-1/3">
        <CardHeader>
          <CardTitle>Hi {client.name} 👋</CardTitle>
          <CardDescription>
            Please enter your credentials to continue given by your agency.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input id="name" placeholder="Your Own Email address..." />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input id="name" placeholder="Pasword Given By Your Agency" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button>Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
