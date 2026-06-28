"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

import { inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
const InviteUser = () => {
    const [email,setEmail]=useState("");
  const [isOpen, setIsopen] = useState(false);
  const [isPending, setTransition]=useTransition();
  const pathname=usePathname();

//   const router=useRouter();//from navigation

  const handleInvite=async()=>{
    const roomId=pathname.split("/").pop(); //pop is used to get the last thing
    if(!roomId) return;

    setTransition(async()=>{
        const {success}=await inviteUserToDocument(roomId, email);

        if(success){
            setIsopen(false);
            setEmail('')
            toast.success("User Added to Room successfully!");
        }else{
            toast.error("Failed to add user to room!");
        }
    })
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsopen}>
      <Button asChild variant="outline">
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a User to colloborate!</DialogTitle>
          <DialogDescription>
            Enter the email of the user u want to invite.
          </DialogDescription>
        </DialogHeader>

        <form className="flex gap-2" onSubmit={handleInvite}>
            <Input type="email" placeholder="email" value={email} className="w-full" onChange={(e)=>setEmail(e.target.value)}/>
            <Button type="submit" disabled={!email||isPending}>
                {isPending?"Inviting...":"Invite"}
            </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUser;
