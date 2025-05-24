"use client"
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import ResumeEditor from './ResumeEditor'

const Page = () => {
  const searchParms = useSearchParams()
  const resumeId = searchParms.get('resumeId')
  const [resumeToEdit,setResumeToEdit] = useState(null)

  useEffect(() => {
      const resumesString = localStorage.getItem("resumeData")
      const resumes = resumesString ? JSON.parse(resumesString) : []
      setResumeToEdit(resumes.filter(resume => resume.id == resumeId)[0])
  }, []);
  
  return <ResumeEditor resumeToEdit ={resumeToEdit}/>;
}

export default Page