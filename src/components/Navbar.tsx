import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-7">
        <ul className="flex justify-around pt-3">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="#">Users</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <button>Dark theme</button>
          </li>
        </ul>
      </nav>
      {/* better way to keep track of how much distance I need too keep from the top */}
      <div className="pb-14"></div>
    </>
  );
}
