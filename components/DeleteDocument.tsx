"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname,useRouter } from "next/navigation";

import { deleteDocument } from "@/actions/actions";
import { toast } from "sonner";
const DeleteDocument = () => {
  const [isOpen, setIsopen] = useState(false);
  const [isPending, setTransition]=useTransition();
  const pathname=usePathname();
  const router=useRouter();//from navigation

  const handleDelete=async()=>{
    const roomId=pathname.split("/").pop(); //pop is used to get the last thing
    if(!roomId) return;

    setTransition(async()=>{
        const {success}=await deleteDocument(roomId);

        if(success){
            setIsopen(false);
            router.replace("/");
            toast.success("Room Deleted successfully!");
        }else{
            toast.error("Failed to delete room!");
        }
    })
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsopen}>
      <Button asChild variant="destructive">
        <DialogTrigger>Delete</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are u sure u want to Delete?</DialogTitle>
          <DialogDescription>
            This will delete the document and all its contents, all users from the document.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end gap-2">
            <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
            >
                {isPending?"Deleting...":"Delete"}
            </Button>
            <DialogClose asChild>
                <Button type="button" variant="secondary">
                    Close
                </Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDocument;
