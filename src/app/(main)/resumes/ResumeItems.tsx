"use client"
import React,{useState,useEffect} from 'react'
import ResumeItem from './ResumeItem'
import { Button } from '@/components/ui/button'
import { PlusSquare } from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  const [resumes,setResumes] = useState([])
  
  useEffect(() => {
      const resumesString = localStorage.getItem("resumeData")
      setResumes(resumesString ? JSON.parse(resumesString) : [])
  }, []);

  return (
    < >
        {resumes.length === 0 &&
            <Button asChild className="mx-auto flex w-fit gap-2">
                <Link href="/editor">
                    <PlusSquare className="size-5" />
                    New resume
                </Link>
            </Button>
        }
        {
            resumes.length > 0 && <div className='space-y-1'>
                <h1 className='text-3xl font-bold text-center'>Your resume</h1>
            </div>
        }
        <div className='flex items-center justify-center  w-full gap-3'>
            {resumes.map(resume => (
            <ResumeItem 
                key={resume.description}
                resume={resume}
                resumes={resumes}
            />
            ))}
        </div> 
    </>
  );
}

export default Page