'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import GeneralForm from './form/GeneralForm'
import PersonalInfoForm from './form/PersonalInfoForm'
import { useSearchParams } from 'next/navigation'
import { steps } from './steps'

const ResumeEditor = () => {
    const searchParams = useSearchParams()
    const currentstep = searchParams.get("step") || steps[0].key
    const setStep = (key:string) => {
        const newSearchParams = new URLSearchParams(searchParams)
    }
  return (
    <div className='flex grow flex-col'>
        <header className='space-y-1.5 border-b px-3 py-5 text-center'>
            <h1 className='text-2xl font-bold'>
                Design your resume
            </h1>
            <p className='text-sm text-muted-foreground'>
                Follow the steps to create your resume. Your progress will be saved automatically
            </p>
        </header>
        <main className='relative grow'>
            <div className='absolute bottom-0 top-0 flex w-full'>
                <div className='w-full p-3 md:w-1/2 overflow-y-auto'>
                    <PersonalInfoForm />
                </div>
                <div className='grow md:border-r' />
                <div className='hidden w-1/2 md:flex'>right</div>
            </div>
        </main>
        <footer className='w-full border-t px-3 py-5'>
            <div className='max-w-7xl mx-auto flex flex-wrap justify-between gap-3'>
                <div className='flex items-center gap-3'>
                    <Button variant='secondary'>
                        Previous step
                    </Button>
                    <Button>
                        Next step
                    </Button>
                </div>
                <div className='flex items-start gap-3'>
                    <Button variant='secondary' asChild>
                        <Link href='/resumes'>Close</Link>
                    </Button>
                    <p className='text-muted-foreground opacity-0'>Saving...</p>
                </div>
            </div>
        </footer>
    </div>
  )
}

export default ResumeEditor