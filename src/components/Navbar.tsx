"use client";

import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
    const {data:session} = useSession();
    const user:User = session?.user as User;
    if(!user) return null;
  return (
    <nav className="p-4 md:p-6 shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <Link href={'#'} className="text-xl font-bold mb-4 md:mb-0">
            TrueFeedBack
            </Link>
            {
                session? (
                    <>
                    <span className="mr-4">
                        Welcome, {user?.username || user?.email}
                        <Button onClick={()=>signOut()} className="w-full mx-auto">
                            Logout
                        </Button>
                    </span>
                    </>
                ) :(
                    <Link href={"/sing-in"}>
                        <Button className="w-full md:w-auto">Login</Button>
                    </Link>
                )
            }
        </div>
    </nav>
  )
}

export default Navbar