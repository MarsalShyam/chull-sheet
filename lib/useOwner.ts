import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { collectionGroup, query, where } from "firebase/firestore";
import { useMemo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

const useOwner = () => {
  const { user } = useUser();
  const room = useRoom();
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  const isOwner = useMemo(() => {
    if (!usersInRoom?.docs || !user) return false;

    const owners = usersInRoom.docs.filter(
      (doc) => doc.data().role === "owner"
    );

    return owners.some(
      (owner) => owner.data().userId === user.emailAddresses[0].toString()
    );
  }, [usersInRoom, user]);

  return isOwner;
};

export default useOwner;
