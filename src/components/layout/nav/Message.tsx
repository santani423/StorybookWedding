import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, Headphones, Power, MessageSquareText } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Massage() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="w-11 h-11
    md:w-12 
    md:h-12
    flex items-center justify-center
    rounded-full
    bg-black/40
    hover:bg-black/60
    active:scale-95
    transition-all duration-300
    backdrop-blur-md
    shadow-lg
    cursor-pointer"
        >
          <MessageSquareText className="w-5 h-5 text-white" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Semua Pesan</DialogTitle>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <Card
              key={index}
              size="sm"
              className="mx-auto w-full my-2 max-w-sm px-5"
            >
              <CardHeader>
                <CardTitle>Small Card</CardTitle>
                <CardDescription>
                  This card uses the small size variant.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  The card component supports a size prop that can be set to
                  &quot;sm&quot; for a more compact appearance.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
