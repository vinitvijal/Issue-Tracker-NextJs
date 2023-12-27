'use client'

import {Button, TextArea, TextField} from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

export default function NewIssuePage() {
  return (
    <div className='max-w-xl space-y-3'> 
        <TextField.Root>
            <TextField.Input placeholder='Title'/>
        </TextField.Root>
        <SimpleMDE/>
        <Button>Submit New Issue</Button>
    </div>
  )
}
