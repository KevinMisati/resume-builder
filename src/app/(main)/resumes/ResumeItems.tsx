"use client"
import React,{useState,useEffect} from 'react'
import ResumeItem from './ResumeItem'

const Page = () => {
  const [resumes,setResumes] = useState([])
  
  useEffect(() => {
      const resumesString = localStorage.getItem("resumeData")
      setResumes(resumesString ? JSON.parse(resumesString) : [])
  }, []);

  return (
    < >
        <div className='space-y-1'>
            <h1 className='text-3xl font-bold'>Your resumes</h1>
            <p>Total: {resumes.length} </p>
        </div>
        <div className='flex items-center justify-center  w-full gap-3'>
            {resumes.map(resume => (
            <ResumeItem 
                key={resume.description}
                resume={resume}
            />
            ))}
        </div> 
    </>
  );
}

export default Page