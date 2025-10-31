import { FormType } from "@/schema"
import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

export default function FormPersonalFields() {

  const { control } = useFormContext<FormType>()

  return (
    <div className="space-y-6 2xl:space-y-8">

      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="relative">
            <FormLabel className="text-blue-900 2xl:text-lg">
              Name
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g. Stephen King" {...field} className="text-blue-950 font-medium placeholder:text-gray-400 placeholder:font-normal 2xl:text-xl 2xl:h-12 2xl:placeholder:text-lg"/>
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
            <FormLabel className="text-blue-900 2xl:text-lg">
              Email Address
            </FormLabel>
            <FormControl>
              <Input type="email" placeholder="e.g. stephenking@lorem.com" {...field} className="text-blue-950 font-medium placeholder:text-gray-400 placeholder:font-normal 2xl:text-xl 2xl:h-12 2xl:placeholder:text-lg"/>
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
            <FormLabel className="text-blue-900 2xl:text-lg">
              Phone Number
            </FormLabel>
            <FormControl>
              <Input type="tel" placeholder="e.g. +1 234 567 890" {...field} className="text-blue-950 font-medium placeholder:text-gray-400 placeholder:font-normal 2xl:text-xl 2xl:h-12 2xl:placeholder:text-lg"/>
            </FormControl>
            <FormMessage className="absolute right-0"/>
          </FormItem>
        )}
      />

    </div>
  )
}