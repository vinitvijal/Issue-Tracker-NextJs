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
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

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
    const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="max-w-xl">
      {error && (<Callout.Root className=" mb-5 " color="red">
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>)
        }
    <form className=' space-y-3' onSubmit={handleSubmit(async (data) => {
      try {
        setIsSubmitting(true);
        await axios.post('/api/issues', data);
        router.push('/issues');  
      } catch (error) {
        setIsSubmitting(false);
        setError('An unexpected error occured')
      }
      
    })}> 
        <TextField.Root>
            <TextField.Input {...register('title')} placeholder='Title'/>
        </TextField.Root>
        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>
        <Controller
          name='description'
          control={control}
          render={({ field })=> <SimpleMDE {...field}/>}
        />
        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner/>}</Button>
    </form>
        
    </div>
  )
}
