import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/NavBar";
import Bg from "@/assets/bg.png";

export default function Home() {
  return (
    /* - overflow-hidden: Mencegah scroll yang tidak diinginkan di level root
       - h-screen & h-[100dvh]: Memastikan background memenuhi layar penuh
    */
    <main className="flex h-screen h-[100dvh] w-full items-center justify-center  bg-black overflow-hidden">
      {/* - w-full h-full: Memenuhi seluruh area layar di mobile
        - md:max-w-[450px] md:h-[90dvh]: Di desktop, dia tetap terlihat seperti frame HP (opsional)
        - md:rounded-3xl: Memberikan sudut melengkung hanya di tampilan desktop
      */}
      <div
        className="relative flex w-full h-full md:max-w-[450px] md:h-[90dvh] items-center justify-center   md:shadow-2xl md:rounded-[3rem] transition-all duration-500 overflow-hidden"
        style={{
          backgroundImage: `url(${Bg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Cinematic (Opsional, agar mirip prompt Storytelling Room Anda) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

        {/* Konten Utama */}
        <div className="z-10 flex flex-col items-center gap-6 px-8 text-center">
          <div className="space-y-2">
            <h1 className="text-white font-bold text-3xl tracking-tight">
              Storytelling Room
            </h1>
            <p className="text-amber-100/80 text-sm">
              Experience the cinematic vibe
            </p>
          </div>

          <Button
            variant="outline"
            className="bg-white/10 text-white border-white/20 backdrop-blur-md hover:bg-white/20"
          >
            Start Journey
          </Button>
        </div>

        {/* Simulasi Home Bar (Hanya muncul di mobile) */}
        <div className="absolute bottom-2 w-32 h-1 bg-white/30 rounded-full md:hidden" />
      </div>
      <Navbar />
    </main>
  );
}
