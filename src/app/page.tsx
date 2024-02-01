
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="">
        <Link href={"/lists"}>List</Link>
      </div>
    </main>
  );
}
