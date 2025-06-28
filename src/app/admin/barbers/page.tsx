
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { getBarbers } from "@/lib/actions";

export default async function BarbersAdminPage() {
    const barbers = await getBarbers();

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="font-headline text-2xl">Upravljanje Barberima</CardTitle>
                        <CardDescription>Dodajte, uredite ili uklonite barbere.</CardDescription>
                    </div>
                    <Button>Dodaj Novog Barbera</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Slika</TableHead>
                            <TableHead>Ime</TableHead>
                            <TableHead>Opis</TableHead>
                            <TableHead className="text-right">Akcije</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {barbers.map((barber) => (
                            <TableRow key={barber.name}>
                                <TableCell>
                                    <Image 
                                        src={barber.image}
                                        alt={`Portret ${barber.name}`}
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover"
                                        data-ai-hint={barber.hint}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{barber.name}</TableCell>
                                <TableCell className="text-muted-foreground max-w-sm truncate">{barber.description}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" className="mr-2">Uredi</Button>
                                    <Button variant="destructive" size="sm">Obriši</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
