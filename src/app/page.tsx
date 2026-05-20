import type { Metadata } from "next";
import HomeClient from "./HomeClient";

type Props = {
  searchParams: Promise<{ name?: string; slug?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { name, slug } = await searchParams;

  let ogImage = process.env.NEXT_PUBLIC_API_URL + "/assets/default/kita.png";

  if (name) {
    try {
      const query = slug ? "?slug=" + slug : "";
      const url = `https://bancendundesia.undesia.com/api/domains/${name}${query}`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (res.ok) {
        const json = await res.json();
        const kunci = json?.data?.user?.data?.kunci;
        if (kunci) {
          ogImage = process.env.NEXT_PUBLIC_API_URL + `/assets/users/${kunci}/kita.png`;
        }
      }
    } catch {
      // fallback ke default
    }
  }

  return {
    title: "Undangan Pernikahan",
    description: "Kami mengundang Anda untuk hadir dan menjadi bagian dari hari bahagia kami.",
    icons: {
      icon: [{ url: ogImage, type: "image/png" }],
      shortcut: ogImage,
      apple: [{ url: ogImage, type: "image/png" }],
    },
    openGraph: {
      title: "Undangan Pernikahan",
      description: "Kami mengundang Anda untuk hadir dan menjadi bagian dari hari bahagia kami.",
      images: [{ url: ogImage }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Undangan Pernikahan",
      description: "Kami mengundang Anda untuk hadir dan menjadi bagian dari hari bahagia kami.",
      images: [ogImage],
    },
  };
}

export default function Home() {
  return <HomeClient />;
}
