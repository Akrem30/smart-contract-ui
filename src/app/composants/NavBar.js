import Link from "next/link"

export default function NavBar() {
  return (
    <header className="flex items-center justify-between bg-[#1E293B] px-4 py-3 md:px-6 md:py-4  h-28">
      <div className="flex items-center">
        <MountainIcon className="h-8 w-8 text-white" />
        <Link href="/">
        <span className="ml-2 text-2xl font-bold tracking-wider text-white">DiplomaTrust</span>
        </Link>
      </div>
      <div className="flex items-center mr-20 text-2xl">
        <Link  className="text-white hover:underline"  href="/ajout">
          Ajouter
        </Link>
         <Link className="ml-6 text-white hover:underline" href="#">
          À propos
        </Link>
        <Link className="ml-6 text-white hover:underline" href="#">
          Contact
        </Link>
      </div>
    </header> 
  )
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

