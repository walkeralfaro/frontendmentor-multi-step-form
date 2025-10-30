import { FormType } from "@/schema"
import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

export default function FormPersonalFields() {

  const { control } = useFormContext<FormType>()

  return (
    <>

      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel className="text-blue-900">
              Name
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g. Stephen King" {...field} />
            </FormControl>
            <FormMessage className="absolute right-0"/>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel className="text-blue-900">
              Email Address
            </FormLabel>
            <FormControl>
              <Input type="email" placeholder="e.g. stephenking@lorem.com" {...field} />
            </FormControl>
            <FormMessage className="absolute right-0"/>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phone"
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel className="text-blue-900">
              Phone Number
            </FormLabel>
            <FormControl>
              <Input type="tel" placeholder="e.g. +1 234 567 890" {...field} />
            </FormControl>
            <FormMessage className="absolute right-0"/>
          </FormItem>
        )}
      />

    </>
  )
}