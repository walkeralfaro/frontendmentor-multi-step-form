import { FormType } from "@/schema"
import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Input } from "../ui/input"

export default function FormPersonalFields() {

  const { control } = useFormContext<FormType>()

  return (
    <>

      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Name
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g. Stephen King" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Email Address
            </FormLabel>
            <FormControl>
              <Input type="email" placeholder="e.g. stephenking@lorem.com" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Phone Number
            </FormLabel>
            <FormControl>
              <Input type="tel" placeholder="e.g. +1 234 567 890" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

    </>
  )
}