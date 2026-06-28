"use client"

import { useMyPresence,useOthers } from "@liveblocks/react/suspense"
import FollowPointer from "../FollowPointer";

const LiveCursorProvider = ({children}:{children:React.ReactNode}) => {
    const [, updateMyPresence]=useMyPresence();
    const others=useOthers();

    function handlePointerMove(e:React.PointerEvent<HTMLDivElement>){
        //update from ClientX and ClientY to PageX and PageY for full page cursor tracing
        const cursor={x:Math.floor(e.pageX),y:Math.floor(e.pageY)};
        updateMyPresence({cursor});
    }

    function handlePointerleave(){
        updateMyPresence({cursor:null});
    }
  return (
    <div
    onPointerMove={handlePointerMove}
    onPointerLeave={handlePointerleave}
    >
      {/* Render cursor */}
      {others.filter((other)=>other.presence.cursor!==null)
      .map(({connectionId,presence,info})=>(
        <FollowPointer key={connectionId} info={info} x={presence.cursor!.x} y={presence.cursor!.y}/>
      ))}
      {children}
    </div>
  )
}

export default LiveCursorProvider
