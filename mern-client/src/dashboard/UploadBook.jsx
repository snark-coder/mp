import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const UploadBook = () => {
  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 font-bold text-3xl'>Upload your book</h2>

      <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Your email</Label>
        </div>
        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1">Your password</Label>
        </div>
        <TextInput id="password1" type="password" required />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
    </form>
    </div>
  )
}

export default UploadBook
