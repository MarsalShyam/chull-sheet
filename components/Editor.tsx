"use client"

import { useRoom, useSelf } from "@liveblocks/react/suspense"
import { useEffect, useState } from "react";
import * as Y from "yjs"
import { LiveblocksYjsProvider } from "@liveblocks/yjs"
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn"
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css"
import "@blocknote/shadcn/style.css"
import stringToColor from "@/lib/stringToColor";
import { BlockNoteEditor } from "@blocknote/core";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";


type EditorProps = {
    doc: Y.Doc;
    provider: LiveblocksYjsProvider;
    darkMode: boolean;
};
function BlockNote({ doc, provider, darkMode }: EditorProps) {
    const userInfo = useSelf((me) => me.info); //It will help to real time typing update

    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider: provider as any,
            fragment: doc.getXmlFragment("document-store"),  //important-> used for store the doc
            user: {
                name: userInfo?.name,
                color: stringToColor(userInfo?.email)
            }
        }
    });

    return (
        <div className="relative max-w-6xl mx-auto">
            <BlockNoteView
                className="min-h-screen"
                editor={editor}
                theme={darkMode ? "dark" : "light"}
            />
        </div>
    )
}


const Editor = () => {
    const room = useRoom();//for getting the room information
    const [doc, setDoc] = useState<Y.Doc>();
    const [provider, setProvider] = useState<LiveblocksYjsProvider>();
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, yDoc);
        setTimeout(() => {
            setDoc(yDoc);
            setProvider(yProvider);
        }, 0);

        return () => {
            yDoc?.destroy();
            yProvider?.destroy();
        };
    }, [room]);

    if (!doc || !provider) {
        return null;
    }

    const style = `hover:text-white transition-colors cursor-pointer border border-zinc-800/80 ${darkMode
        ? "text-zinc-300 bg-zinc-900/60 hover:bg-zinc-800 hover:text-white"
        : "text-zinc-700 bg-zinc-200 hover:bg-zinc-300 hover:text-zinc-800"
        }`

    return (
        <div className='max-w-6xl mx-auto'>
            <div className="flex items-center gap-2 justify-end mb-10">
                {/* TranslateDocument Ai */}
                <TranslateDocument doc={doc} />
                {/* ChatToDocument Ai */}
                <ChatToDocument doc={doc} />

                {/* Dark mode */}
                <Button className={style} onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </Button>
            </div>
            {/* Block Note */}
            <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
        </div>
    )
}

export default Editor
