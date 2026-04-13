import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export default function AddMessage() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form className="space-y-4">
          <DialogHeader>
            <DialogTitle>Konfirmasi Kehadiran</DialogTitle>
          </DialogHeader>

          <FieldGroup>
            {/* Nama */}
            <Field>
              <Label htmlFor="name">Nama</Label>
              <Input id="name" name="name" placeholder="Masukkan nama Anda" />
            </Field>

            {/* Kehadiran */}
            <Field>
              <Label htmlFor="attendance">Kehadiran</Label>
              <select
                id="attendance"
                name="attendance"
                className="w-full border rounded-md px-3 py-2 text-sm bg-background"
              >
                <option value="">Pilih kehadiran</option>
                <option value="hadir">Hadir</option>
                <option value="tidak_hadir">Tidak Hadir</option>
              </select>
            </Field>

            {/* Jumlah Orang */}
            <Field>
              <Label htmlFor="guest">Jumlah Orang</Label>
              <Input
                id="guest"
                name="guest"
                type="number"
                min="1"
                placeholder="Contoh: 2"
              />
            </Field>

            {/* Pesan */}
            <Field>
              <Label htmlFor="message">Pesan</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tulis ucapan atau pesan..."
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit">Kirim</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}