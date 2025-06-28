
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

const barbers = [
  {
    name: "Miki",
    description: "Specijalizovan za klasične fade frizure, precizno oblikovanje brade i frizure inspirisane tattoo art stilom. Sa svojih 18 godina, Miki donosi svježinu i kreativnost u svaki rez, kombinujući moderno s klasičnim tehnikama. Njegova preciznost, osjećaj za detalje i posvećenost klijentima čine ga savršenim izborom za one koji žele upečatljiv i besprijekoran izgled.",
    image: "https://placehold.co/400x400.png",
    hint: "classic barber portrait"
  },
  {
    name: "Huske",
    description: "Mladi i perspektivni frizer na praksi, poznat po velikoj želji za učenjem i istraživanjem novih trendova. Huske sa strašću prati moderne tehnike šišanja i stylinga, ne boji se eksperimentisati i uvijek je spreman ponuditi klijentima svježe, originalne ideje. Njegov entuzijazam, kreativnost i pristupačnost čine ga odličnim izborom za svakoga ko želi isprobati nešto novo i moderno.",
    image: "https://placehold.co/400x400.png",
    hint: "modern barber portrait"
  }
];

export default function BarbersAdminPage({
    params,
    searchParams,
}: {
    params: { [key:string]: string | string[] | undefined };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
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
