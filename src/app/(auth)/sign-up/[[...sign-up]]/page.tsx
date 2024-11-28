import React from 'react'
import { SignUp } from '@clerk/nextjs'

const page = () => {
  return (
    <div className="flex h-screen items-center justify-center p-3">
      <SignUp />
    </div>
  );
}

export default page