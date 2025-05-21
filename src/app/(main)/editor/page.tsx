'use client'
import React from 'react'
import { Metadata } from 'next'
import ResumeEditor from './ResumeEditor'
import prisma from '@/lib/prisma'
import { resumeDataInclude } from '@/lib/types'

interface PageProps {
  searchParams: Promise<{resumeId?:string}>
}


// export const metadata:Metadata = {
//     title:"Design your resume"
// }
const Page = async ({searchParams}:PageProps) => {
  //const {resumeId} = await searchParams

  // const { userId } = await auth()
  // if(!userId){
  //   return null
  // }
  const resumesString = localStorage.getItem("resumeData")
  const resumes = resumesString ? [JSON.parse(resumesString)] : []

  const resumeToEdit = resumes[0]
  return <ResumeEditor resumeToEdit ={resumeToEdit}/>;
}

export default Page