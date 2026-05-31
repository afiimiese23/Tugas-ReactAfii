import Badge from "@/components/Badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function ComponentsP11() {

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">Components P11</h1>
            <p className="mb-4 text-gray-600">Ini adalah halaman Components P11</p>

            <Button variant="outline"> Outline Button </Button>
            <Button variant="ghost"> Ghost Button </Button>
            <Button variant="destructive"> Destructive Button </Button>

            <Card className="mt-4 w-[380px]">
                <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Belajar shadcn/ui</CardTitle>
                    <Badge variant="secondary">Baru</Badge>
                </div>
                <CardDescription>
                    Contoh penggunaan komponen shadcn/ui di React
                </CardDescription>
                </CardHeader>

                <CardContent>
                <p className="text-sm text-muted-foreground">
                    Komponen ini dibuat di branch <strong>setup-shadcn</strong>
                    lalu di-merge ke main.
                </p>
                </CardContent>

                <CardFooter className="flex gap-2">
                <Button>Simpan</Button>
                <Button variant="outline">Batal</Button>
                </CardFooter>
            </Card>
        </div>
    );
}