import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import React from 'react'
import { steps } from './steps';
interface BreadCrumbsProps{
    currentstep:string;
    setCurrentStep:(step:string) => void
}

const BreadCrumb = ({currentstep,setCurrentStep}:BreadCrumbsProps) => {
  return (
    <div className='flex justify-center '>
        <Breadcrumb>
            <BreadcrumbList>
                {steps.map(step => (
                    <React.Fragment key={step.key}>
                        <BreadcrumbItem>
                            {step.key == currentstep ? (
                                <BreadcrumbPage>
                                    {step.title}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink>
                                <button onClick={() => setCurrentStep(step.key) }>
                                    {step.title}
                                </button>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    </div>
  )
}

export default BreadCrumb