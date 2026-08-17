import { NextRequest } from "next/server";
import { getAuthUser } from "./getAuthUser";


export function authorize (

    req: NextRequest,
    allowedRoles: string[]
) {
    const user = getAuthUser(req);

    if (!allowedRoles.includes(user.role)) {

        throw new Error("Forbidden")
        
    }

    return user
}