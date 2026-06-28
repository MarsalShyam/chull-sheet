import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    await auth.protect(); //Ensure the user is authenticated


    const {sessionClaims}=await auth();
    const {room}=await req.json();

    const email = sessionClaims?.email;
    const name = sessionClaims?.fullName;
    const avatar = sessionClaims?.image;

    if (!email || !name || !avatar) {
        return NextResponse.json(
            { message: "Missing user details in session claims" },
            { status: 400 }
        );
    }

    const session=liveblocks.prepareSession(email,{
        userInfo:{
            name,
            email,
            avatar,
        }
    });

    const usersInRoom=await adminDb.collectionGroup("rooms").where("userId","==",email).get();
    const userInRoom=usersInRoom.docs.find((doc)=>doc.id==room);

    if(userInRoom?.exists){
        session.allow(room,session.FULL_ACCESS);
        const {body,status}=await session.authorize();

        console.log("You are authorised");

        return new Response(body, {status});
    }else{
        return NextResponse.json(
            {message:"You are not in this room"},
            {status:403}
        )
    }
}