'use server'

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server"

export async function createNewDocument(){
    await auth.protect();

    const {sessionClaims}=await auth();
    const email = sessionClaims?.email as string;
    if (!email) {
        throw new Error("User email not found in session claims");
    }

    //Create New Document

    const docCollectionRef=adminDb.collection("documents");
    const docRef=await docCollectionRef.add({
        title:"New Doc"
    })

    await adminDb
    .collection('users')
    .doc(email)
    .collection("rooms")
    .doc(docRef.id)
    .set({
        userId:email,
        role:"owner",
        createdAt:new Date(),
        roomId:docRef.id,
    });

    return {docId: docRef.id}
}

//it's another server action
export async function deleteDocument(roomId:string){
    auth.protect();

    console.log("deleteDocument", roomId);

    try{
        //delete the doc reference itself
        await adminDb.collection("documents").doc(roomId).delete();

        const query=await adminDb
        .collectionGroup("rooms")
        .where("roomId","==",roomId)
        .get();

        const batch=adminDb.batch();

        //delete the room reference in the user's collection for every user in the room
        query.docs.forEach((doc)=>{
            batch.delete(doc.ref);
        })

        await batch.commit();

        //Delete the room in liveblocks
        await liveblocks.deleteRoom(roomId);

        return {success:true};
    }catch(error){
        console.error(error);
        return {success:false};
    }
}

export async function inviteUserToDocument(roomId:string,email:string){
    auth.protect();
    console.log("InvaliteUserToDocument");

    try{
        await adminDb
        .collection("users")
        .doc(email)
        .collection("rooms")
        .doc(roomId)
        .set({
            userId:email,
            role:"editor",
            createdAt:new Date(),
            roomId,
        });
        return {success:true};
    }catch(error){
        console.error(error);
        return {success:false};
    }
}

export async function removeUserFromDocument(roomId:string,email:string){
    auth.protect();
    console.log("removeUserFromDocument",roomId,email);

    try{
        await adminDb
        .collection("users")
        .doc(email)
        .collection("rooms")
        .doc(roomId)
        .delete();

        return {success:true};
    }catch(error){
        console.error(error);
        return {success: false};
    }
}