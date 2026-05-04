import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/NavBar";
import Fiture from "@/components/layout/Fiture";


export default function Home() {
  return (
    /* - overflow-hidden: Mencegah scroll yang tidak diinginkan di level root
       - h-screen & h-[100dvh]: Memastikan background memenuhi layar penuh
    */
    <main className="flex h-dvh w-full items-center justify-center bg-black overflow-hidden">
      {/* - w-full h-full: Memenuhi seluruh area layar di mobile
        - md:max-w-[450px] md:h-[90dvh]: Di desktop, dia tetap terlihat seperti frame HP (opsional)
        - md:rounded-3xl: Memberikan sudut melengkung hanya di tampilan desktop
      */}
      <div
        className="relative flex w-full h-full md:max-w-128 md2:max-w-[550px] md3:max-w-[600px] tb:max-w-[650px] lg:max-w-[700px] xl:max-w-[350px] md:h-[90dvh] lg:h-[100dvh] xl:h-[100dvh] items-center justify-center md:shadow-2xl md:rounded-[3rem] transition-all duration-500 overflow-hidden"
        style={{
          backgroundImage: `url(/background.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Cinematic (Opsional, agar mirip prompt Storytelling Room Anda) */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

        {/* Konten Utama */}
         <Fiture />

        {/* Simulasi Home Bar (Hanya muncul di mobile) */}
        <div className="absolute bottom-2 w-32 h-1 bg-white/30 rounded-full md:hidden" />
      </div>
      <Navbar />
    </main>
  );
}
