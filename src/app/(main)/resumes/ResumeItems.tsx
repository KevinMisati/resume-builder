"use client"
import React from 'react'
import ResumeItem from './ResumeItem'

const Page = () => {
  const resumesString = localStorage.getItem("resumeData")
  const resumes = resumesString ? [JSON.parse(resumesString)] : []
  const totalCount = resumes.length
  console.log(resumes, "hello resumes")

  return (
    < >
        <div className='space-y-1'>
            <h1 className='text-3xl font-bold'>Your resumes</h1>
            <p>Total: {totalCount} </p>
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