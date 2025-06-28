
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getBookings, deleteBooking } from "@/lib/actions";
import { Button } from "@/components/ui/button";


export default async function AdminPage({
    params,
    searchParams,
}: {
    params: { [key: string]: string | string[] | undefined };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
  const reservations = await getBookings();

  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Pregled Rezervacija</h1>
            <p className="text-muted-foreground">Ovdje možete vidjeti i obrisati sve rezervacije.</p>
        </div>
        <div className="bg-card rounded-lg border shadow-sm">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Ime Klijenta</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>Vrijeme</TableHead>
                <TableHead>Barber</TableHead>
                <TableHead className="text-right">Akcije</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reservations.length > 0 ? (
                    reservations.map((res) => (
                    <TableRow key={res.id}>
                        <TableCell className="font-medium">{res.name}</TableCell>
                        <TableCell>{res.phone}</TableCell>
                        <TableCell>{res.date}</TableCell>
                        <TableCell>{res.time}</TableCell>
                        <TableCell><Badge variant={res.barber === 'Miki' ? 'default' : 'secondary'}>{res.barber}</Badge></TableCell>
                        <TableCell className="text-right">
                            <form action={deleteBooking}>
                                <input type="hidden" name="id" value={res.id} />
                                <Button variant="destructive" size="sm" type="submit">
                                    Obriši
                                </Button>
                            </form>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                            Trenutno nema rezervacija.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
    </div>
  )
}
