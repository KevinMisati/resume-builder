'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import ResumeEditor from './ResumeEditor'

const Page = () => {
  const resumesString = localStorage.getItem("resumeData")
  const resumes = resumesString ? JSON.parse(resumesString) : []
  const searchParms = useSearchParams()
  const resumeId = searchParms.get('resumeId')

  const resumeToEdit = resumes.filter(resume => resume.id == resumeId)[0]
  console.log(resumes,resumeToEdit,"hello resume id")
  return <ResumeEditor resumeToEdit ={resumeToEdit}/>;
}

export default Page