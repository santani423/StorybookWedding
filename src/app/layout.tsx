import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "@/redux/provider";
import QueryProvider from "@/components/QueryProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const OG_IMAGE = "https://undangan.undesia.com/assets/users/5fe34263026b4ea9b2a6ba1cc5dcb60b/kita.png";

export const metadata: Metadata = {
  title: "Undangan Pernikahan",
  description: "Kami mengundang Anda untuk hadir dan menjadi bagian dari hari bahagia kami.",
  icons: {
    icon: [{ url: OG_IMAGE, type: "image/png" }],
    shortcut: OG_IMAGE,
    apple: [{ url: OG_IMAGE, type: "image/png" }],
  },
  openGraph: {
    title: "Undangan Pernikahan",
    description: "Kami mengundang Anda untuk hadir dan menjadi bagian dari hari bahagia kami.",
    images: [{ url: OG_IMAGE }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Undangan Pernikahan",
    description: "Kami mengundang Anda untuk hadir dan menjadi bagian dari hari bahagia kami.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* INFO RESOLUSI */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                function showResolution() {
                  const width = window.innerWidth;
                  const height = window.innerHeight;

                  let info = document.getElementById("screen-info");

                  if (!info) {
                    info = document.createElement("div");
                    info.id = "screen-info";

                    info.style.position = "fixed";
                    info.style.bottom = "10px";
                    info.style.right = "10px";
                    info.style.zIndex = "9999";
                    info.style.background = "rgba(0,0,0,0.7)";
                    info.style.color = "#fff";
                    info.style.padding = "8px 12px";
                    info.style.borderRadius = "8px";
                    info.style.fontSize = "14px";
                    info.style.fontFamily = "Arial";

                    document.body.appendChild(info);
                  }

                  info.innerText = width + " x " + height;
                }

                window.addEventListener("resize", showResolution);
                window.addEventListener("load", showResolution);
              })();
            `,
          }}
        />

        <QueryProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}