"use client"
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    const resumesString = localStorage.getItem("resumeData")
    const resumes = resumesString ? JSON.parse(resumesString) : []
     if(resumeData?.id){
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("resumeId", `${resumeData.id}`)
      window.history.pushState(null, "", `?${newSearchParams.toString()}`);

      setIsSaving(true);
      const newResumes = resumes.length ? 
        resumes.map(resume => {
          if(resume.id === resumeData.id){
            return resumeData
          }
          return resume
        }):
        [resumeData]

      localStorage.setItem("resumeData", JSON.stringify(newResumes));
      setIsSaving(false)
    } 
    
  }, [resumeData]);

  return {
    isSaving,
    hasUnsavedChanges:JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
