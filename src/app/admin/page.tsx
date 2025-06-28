
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const mockReservations = [
  {
    id: "1",
    name: "John Doe",
    phone: "555-123-4567",
    date: "2024-08-15",
    time: "10:00",
    barber: "Mirsad",
  },
  {
    id: "2",
    name: "Peter Jones",
    phone: "555-987-6543",
    date: "2024-08-15",
    time: "11:00",
    barber: "Huske",
  },
    {
    id: "3",
    name: "Sam Wilson",
    phone: "555-456-7890",
    date: "2024-08-15",
    time: "14:00",
    barber: "Mirsad",
  },
  {
    id: "4",
    name: "Michael Chen",
    phone: "555-789-0123",
    date: "2024-08-16",
    time: "09:00",
    barber: "Huske",
  },
    {
    id: "5",
    name: "David Garcia",
    phone: "555-234-5678",
    date: "2024-08-16",
    time: "10:30",
    barber: "Huske",
  },
];


export default function AdminPage() {
  return (
    <div className="min-h-screen bg-muted/40 p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold font-headline">Admin Kontrolna Tabla</h1>
                <p className="text-muted-foreground">Pregledajte i upravljajte svim rezervacijama.</p>
            </header>
            <div className="bg-card rounded-lg border shadow-sm">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Ime Klijenta</TableHead>
                    <TableHead>Telefon</TableHead>
                    <TableHead>Datum</TableHead>
                    <TableHead>Vrijeme</TableHead>
                    <TableHead>Barber</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockReservations.map((res) => (
                    <TableRow key={res.id}>
                        <TableCell className="font-medium">{res.name}</TableCell>
                        <TableCell>{res.phone}</TableCell>
                        <TableCell>{res.date}</TableCell>
                        <TableCell>{res.time}</TableCell>
                        <TableCell><Badge variant={res.barber === 'Mirsad' ? 'default' : 'secondary'}>{res.barber}</Badge></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
        </div>
    </div>
  )
}
