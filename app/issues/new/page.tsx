'use client'
import dynamic from "next/dynamic";
import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "@/app/validationSchema";
import { z } from "zod";

type IssueForm = z.infer<typeof schema>

export default function NewIssuePage() {
  const router = useRouter();
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueForm>({
    resolver: zodResolver(schema)
  });
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
        {errors.title && <Text as="p" color='red'>{errors.title.message}</Text>}
        <Controller
          name='description'
          control={control}
          render={({ field })=> <SimpleMDE {...field}/>}
        />
        {errors.description && <Text color='red' as="p">{errors.description.message}</Text>}
        <Button>Submit New Issue</Button>
    </form>
        
    </div>
  )
}
