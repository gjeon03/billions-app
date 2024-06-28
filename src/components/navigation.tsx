import Link from "next/link";

export default function Navigation() {
  return (
    <div className="w-full max-w-[1000px]">
      <h1 className="text-5xl pt-5">
        <Link href="/">BILLIONS APP</Link>
      </h1>
    </div>
  );
}
