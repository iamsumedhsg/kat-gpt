import { onboardUser } from "@/features/auth/action/onboard";
import React from "react";
import { auth } from "@clerk/nextjs/server";


const RootGrouplayout = async ({ children }: {children: React.ReactNode}) => {

    await auth.protect();
    await onboardUser();

    return (
        <div>{children}</div>
    )
}

export default RootGrouplayout
