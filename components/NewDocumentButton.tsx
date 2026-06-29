"use client"

import { useTransition } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { createNewDocument } from '@/actions/actions'
import { Plus, PlusCircle, PlusIcon } from 'lucide-react'

const NewDocumentButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleCreateNewDocument = () => {
    startTransition(async () => {
      const { docId } = await createNewDocument();
      router.push(`/doc/${docId}`);
    })
  }

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending} className='flex justify-center items-center'>
      {/* <Plus size={20} className="mr-1" /> */}
      <Plus />
      {isPending ? "Creating..." : "New Document"}
    </Button>
  )
}

export default NewDocumentButton
