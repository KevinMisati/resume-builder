import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAutoSaveResume(resumeData: ResumeValues) {
  const searchParams = useSearchParams();

  const resumesString = localStorage.getItem("resumeData")
  const resumes = resumesString ? JSON.parse(resumesString) : []

  const { toast } = useToast();

  const debouncedResumeData = useDebounce(resumeData, 1500);

  const [resumeId, setResumeId] = useState(resumeData.id);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    if(resumeData.id){
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
      console.log(resumes,newResumes,resumeData,"hello resumes")
      localStorage.setItem("resumeData", JSON.stringify(newResumes));
      setIsSaving(false)
    }
    
  }, [resumeData]);

  return {
    isSaving,
    hasUnsavedChanges:JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
