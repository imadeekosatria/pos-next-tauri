import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8 col-span-7">
      <h1 className="text-zinc-950 font-semibold text-3xl">UD Sari Ekotin</h1>
      <Link href="/beranda">Beranda</Link>  
    </main>
  )
}
