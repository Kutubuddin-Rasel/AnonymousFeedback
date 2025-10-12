import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession, User } from "next-auth";

export async function checkAuthentication():Promise<User> {
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    return user;
}