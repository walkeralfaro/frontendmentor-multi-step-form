import { FormType } from "@/schema"
import { useFormContext, useWatch } from "react-hook-form"
import { FormField, FormItem } from "../ui/form"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"

const addons = [
  {
    title: 'Online service',
    name: 'onlineservice',
    description: 'Access to multiplayer games',
    priceMonthly: 1,
    priceYearly: 10,
  },
  {
    title: 'Larger storage',
    name: 'largerstorage',
    description: 'Extra 1TB of cloud save',
    priceMonthly: 2,
    priceYearly: 20,
  },
  {
    title: 'Customizable profile',
    name: 'customizableprofile',
    description: 'Custom theme on your profile',
    priceMonthly: 2,
    priceYearly: 20,
  },
]

export default function FormAddonsFields() {

  const { control } = useFormContext<FormType>()
  const period = useWatch({ control, name: "period" })
  const isYearly = period === "yearly"
  const periodText = isYearly ? "/yr" : "/mo"

  return (
    <>
      {
        addons.map((addon) => {
          const price = isYearly ? addon.priceYearly : addon.priceMonthly

          return (
            <FormField
              key={addon.name}
              control={control}
              name={addon.name as keyof FormType}
              render={({ field }) => (
                <FormItem className="mb-3">
                  <Label className="hover:bg-accent/50 flex gap-3 rounded-lg border p-4 has-aria-checked:border-indigo-600 has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950">
                    <Checkbox
                      id={addon.name}
                      checked={!!field.value}
                      
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                    />
                    <div className="flex gap-3 justify-between items-center w-full">
                      <div>
                        <p className="text-base text-blue-950">
                          {addon.title}
                        </p>
                        <p className="text-gray-400">
                          {addon.description}
                        </p>
                      </div>
                      <p className="text-indigo-700">{'+$'}{price}<span>{periodText}</span> </p>
                    </div>
                  </Label>

                </FormItem>
              )}

            />
          )
        })
      }


    </>
  )
}