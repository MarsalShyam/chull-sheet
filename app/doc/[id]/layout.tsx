import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

interface DocLayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string }>; //Mark params as a Promise
}
const Doclayout = async({
    children, 
    params
}:DocLayoutProps) => {
    auth.protect();
    const {id}=await params;
  return (
    <RoomProvider roomId={id}>
      {children}
    </RoomProvider>
  )
}

export default Doclayout
