'use client'
import dynamic from "next/dynamic";
import { Button, Callout, TextField } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from "react";


interface IssueForm{
  title: string;
  description: string;
}

export default function NewIssuePage() {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();
  const SimpleMDE = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
  );

  const [error, setError] = useState('')

  return (
    <div className="max-w-xl">
      {error && (<Callout.Root className=" mb-5 " color="red">
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>)
        }
    <form className=' space-y-3' onSubmit={handleSubmit(async (data) => {
      try {
        await axios.post('/api/issues', data);
        router.push('/issues');  
      } catch (error) {
        setError('An unexpected error occured')
      }
      
    })}> 
        <TextField.Root>
            <TextField.Input {...register('title')} placeholder='Title'/>
        </TextField.Root>
        <Controller
          name='description'
          control={control}
          render={({ field })=> <SimpleMDE {...field}/>}
        />
        
        <Button>Submit New Issue</Button>
    </form>
        
    </div>
  )
}
