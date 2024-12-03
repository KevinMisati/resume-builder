import useDebounce from '@/hooks/useDebounce'
import { ResumeValues } from '@/lib/validation'
import React, { useEffect, useState } from 'react'

const useAutoSaveResume = (resumeData:ResumeValues) => {
    const debouncedResumeData = useDebounce(resumeData,1500)

    const [lastSavedData,setLastSavedData] = useState(
        structuredClone(resumeData)
    )

    const [isSaving,setIsSaving] = useState(false)

    useEffect(() => {
        async function save(){
            setIsSaving(true)
            await new Promise(resolve => setTimeout(resolve,1500))
            setLastSavedData(structuredClone(debouncedResumeData))
        }

        const hasUnsavedChanges = JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData)

        if(hasUnsavedChanges && debouncedResumeData && !isSaving){
            save()
        }
    },[debouncedResumeData,isSaving,lastSavedData])

    return {
        isSaving,
        hasUnsavedChanges:
        JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData),
    };
}

export default useAutoSaveResume