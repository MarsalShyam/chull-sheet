"use client"
import Document from "@/components/Document";
import {useParams} from "next/navigation";


const DocumentPage = () => {
    const params=useParams();
    const id=params.id as string;
    console.log(id);

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id}/>
      {/* <p>Document</p> */}
    </div>
  )
}

export default DocumentPage
