
import { loginAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
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

export default function AdminLoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <Card className="w-full max-w-sm">
        <form action={loginAction}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Administratorski Pristup</CardTitle>
            <CardDescription>
              Unesite svoje podatke za pristup kontrolnoj tabli.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@primjer.com" defaultValue="admin@primjer.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Lozinka</Label>
              <Input id="password" type="password" defaultValue="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">
              Prijavi se
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
