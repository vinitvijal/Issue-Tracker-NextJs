'use client'
import dynamic from "next/dynamic";
import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';


interface IssueForm{
  title: string;
  description: string;
}

export default function NewIssuePage() {
  const router = useRouter();
  const {register, control, handleSubmit} = useForm<IssueForm>();
  const SimpleMdeEditor = dynamic(
    () => import("react-simplemde-editor"),
    { ssr: false }
  );

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
      await axios.post('/api/issues', data);
      router.push('/issues');
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
  )
}
