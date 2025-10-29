'use client'

import { formSchema, FormType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import FormPersonalFields from "./FormPersonalFields";
import FormPlanFields from "./FormPlanFields";
import FormAddonsFields from "./FormAddonsFields";

export default function FormComponent() {

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      plan: "arcade",
      period: "monthly", // false is monthly
      onlineservice: false,
      largerstorage: false,
      customizableprofile: false,
    }
  })


  return (
    <div>
      <div>

        <Form {...form}>
          <form className="space-y-6">


            <FormPersonalFields />
            <FormPlanFields />
            <FormAddonsFields />


          </form>

        </Form>

      </div>
    </div>
  )
}