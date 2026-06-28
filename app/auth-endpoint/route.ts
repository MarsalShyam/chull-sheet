import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // 1. Ensure the user is authenticated at the protocol level
    await auth.protect();

    const { sessionClaims } = await auth();
    const user = await currentUser();

    // 2. Safely parse the room ID from the body
    const body = await req.json();
    const { room } = body;

    // 3. Get User Details with robust fallbacks
    // We use the email as the primary ID for Liveblocks
    const email = (sessionClaims?.email as string) || user?.emailAddresses[0]?.emailAddress;

    // Fallback for Name: Try Claim -> Clerk FullName -> Clerk FirstName -> Email -> Anonymous
    const name = (sessionClaims?.fullName as string) || user?.fullName || user?.firstName || email || "Anonymous";

    // Fallback for Avatar: Try Claim -> Clerk Image -> Default Avatar string
    const avatar = (sessionClaims?.image as string) || user?.imageUrl || "";

    // 4. Check if Email exists (this is the only one we REALLY need for the ID)
    if (!email) {
        return NextResponse.json(
            { message: "User email not found" },
            { status: 400 }
        );
    }

    console.log("Authenticating user:", email, "for room:", room);

    // 5. Prepare Liveblocks Session
    const session = liveblocks.prepareSession(email, {
        userInfo: {
            name,
            email,
            avatar,
        }
    });

    // 6. Firebase Permissions Check
    try {
        const usersInRoom = await adminDb
            .collectionGroup("rooms")
            .where("userId", "==", email)
            .get();

        const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

        if (userInRoom?.exists) {
            session.allow(room, session.FULL_ACCESS);
            const { body: authBody, status } = await session.authorize();

            console.log("✅ User authorized successfully");
            return new Response(authBody, { status });
        } else {
            console.log("❌ User does not have access to this room in Firebase");
            return NextResponse.json(
                { message: "You are not in this room" },
                { status: 403 }
            );
        }
    } catch (error) {
        console.error("Firebase Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error during permission check" },
            { status: 500 }
        );
    }
}