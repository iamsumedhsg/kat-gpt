"use server";

import {currentUser} from "@clerk/nextjs/server";
import {prisma} from "@/lib/db";

export async function onboardUser(){
    const clerkUser = await currentUser();
    if(!clerkUser) throw new Error("Unauthorized");

    const email = clerkUser.emailAddresses[0]?.emailAddress ?? null;

    return prisma.user.upsert({
        where: {clerkId: clerkUser.id},
        create : {
            clerkId: clerkUser.id,
            email,
            firstName: clerkUser.firstName ?? null,
            lastName: clerkUser.lastName ?? null,
            imageUrl: clerkUser.imageUrl
        },
        update: {
            email,
            firstName: clerkUser.firstName ?? null,
            lastName: clerkUser.lastName ?? null,
            imageUrl: clerkUser.imageUrl
        }
    })
};
