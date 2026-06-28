"use client"

import {useRoom, useSelf} from "@liveblocks/react/suspense"
import { useEffect, useState } from "react";
import * as Y from "yjs"
import {LiveblocksYjsProvider} from "@liveblocks/yjs"
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import {BlockNoteView} from "@blocknote/shadcn"
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css"
import "@blocknote/shadcn/style.css"
import stringToColor from "@/lib/stringToColor";
import { BlockNoteEditor } from "@blocknote/core";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";


type EditorProps={
    doc:Y.Doc;
    provider:LiveblocksYjsProvider;
    darkMode:boolean;
};
function BlockNote({doc,provider,darkMode}:EditorProps){
    const userInfo=useSelf((me)=>me.info); //It will help to real time typing update

    const editor:BlockNoteEditor=useCreateBlockNote({
        collaboration:{
            provider,
            fragment:doc.getXmlFragment("document-store"),  //important-> used for store the doc
            user:{
                name:userInfo?.name,
                color:stringToColor(userInfo?.email)
            }
        }
    });

    return(
        <div className="relative max-w-6xl mx-auto">
            <BlockNoteView
            className="min-h-screen"
            editor={editor}
            theme={darkMode?"dark":"light"}
            />
        </div>
    )
}


const Editor = () => {
    const room=useRoom();//for getting the room information
    const [doc,setDoc]=useState<Y.Doc>();
    const [provider,setProvider]=useState<LiveblocksYjsProvider>();
    const [darkMode,setDarkMode]=useState(false);

    useEffect(()=>{
        const yDoc=new Y.Doc();
        const yProvider=new LiveblocksYjsProvider(room,yDoc);
        setTimeout(() => {
            setDoc(yDoc);
            setProvider(yProvider);
        }, 0);

        return()=>{
            yDoc?.destroy();
            yProvider?.destroy();
        };
    },[room]);

    if(!doc||!provider){
        return null;
    }

    const style=`hover:text-white ${
        darkMode
        ?"text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
        :"text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
    }`

  return (
    <div className='max-w-6xl mx-auto'>
      <div className="flex items-center gap-2 justify-end mb-10">
        {/* TranslateDocument Ai */}
        <TranslateDocument doc={doc}/>
        {/* ChatToDocument Ai */}
        <ChatToDocument doc={doc}/>

        {/* Dark mode */}
        <Button className={style} onClick={()=>setDarkMode(!darkMode)}>
            {darkMode?<SunIcon/>:<MoonIcon/>}
        </Button>
      </div>
      {/* Block Note */}
      <BlockNote doc={doc} provider={provider} darkMode={darkMode}/>
    </div>
  )
}

export default Editor
