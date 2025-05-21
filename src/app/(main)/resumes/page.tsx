
import React from 'react'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { PlusSquare } from 'lucide-react'
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { resumeDataInclude } from '@/lib/types'
import ResumeItems from './ResumeItems'

// export const metadata:Metadata = {
//   title:"Your resumes"
// }

const Page = () => {
  //const { userId } = await auth()
  // console.log(userId,"hello userId")
  // if(!userId){
  //   return null
  // }
  

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New resume
        </Link>
      </Button>
      <ResumeItems />
    </main>
  );
}

export default Page