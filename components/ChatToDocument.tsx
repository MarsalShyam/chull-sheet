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
import { FormEvent, startTransition, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname,useRouter } from "next/navigation";

import { deleteDocument, inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import * as Y from "yjs";
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";


const ChatToDocument = ({doc}:{doc:Y.Doc}) => {
    const [input,setInput]=useState("");
  const [isOpen, setIsopen] = useState(false);
  const [isPending, setTransition]=useTransition();
  const [summary, setSummary]=useState("");
  const [question, setQuestion]=useState("");


//   const router=useRouter();//from navigation

  const handleAskQuestion=async(e:FormEvent)=>{
    e.preventDefault();

    setQuestion(input);
     
    setTransition(async()=>{
        const fragment=doc.getXmlFragment("document-store");
        const documentData=JSON.stringify(fragment.toJSON());
        const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                documentData,
                question:input,
            })
        });
        if(res.ok){
            const {message}=await res.json();
            // console.log(translated_text);
            setSummary(message);
            // toast.success("Translated Summary successfully!");
        }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsopen}>
      <Button asChild variant="outline">
        <DialogTrigger>
            <MessageCircleCode className="mr-2"/>
            Chat to Document
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chat to the Document!</DialogTitle>
          <DialogDescription>
            Ask a question and chat to the document with AI.
          </DialogDescription>
          <hr className="mt-5" />
          {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
        </DialogHeader>
        
        {summary && (
          <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                AI {isPending ? "Thinking..." : "Says"}
              </p>
            </div>
            <div>
              {isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}
            </div>
          </div>
        )}

        <form className="flex gap-2" onSubmit={handleAskQuestion}>
            <Input type="text" placeholder="i.e. what is this about?" value={input} className="w-full" onChange={(e)=>setInput(e.target.value)}/>
            <Button type="submit" disabled={!input||isPending}>
                {isPending?"Asking...":"Ask"}
            </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatToDocument;
