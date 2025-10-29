
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { useFormContext, useWatch } from "react-hook-form"
import { FormType } from "@/schema"
import { Switch } from "../ui/switch"

const plans = [
  {
    value: 'arcade',
    title: 'Arcade',
    priceMonthly: 9,
    priceYearly: 90,
    message: '2 months free',
    icon: '/icon-arcade.svg',
  },
  {
    value: 'advanced',
    title: 'Advanced',
    priceMonthly: 12,
    priceYearly: 120,
    message: '2 months free',
    icon: '/icon-advanced.svg',
  },
  {
    value: 'pro',
    title: 'Pro',
    priceMonthly: 15,
    priceYearly: 150,
    message: '2 months free',
    icon: '/icon-pro.svg',
  }
]

export default function FormPlanFields() {

  const { control, setValue } = useFormContext<FormType>()
  const period = useWatch({ control, name: "period" })
  const isYearly = period === "yearly"

  const handleTogglePeriod = () => {
    setValue("period", period === "monthly" ? "yearly" : "monthly", {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  return (
    <div className="space-y-5">

      <FormField
        control={control}
        name="plan"
        render={({ field }) => (
          <FormItem className="">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col gap-5"
              >

                {
                  plans.map((plan) => {

                    const isSelected = field.value === plan.value

                    const price = isYearly ? plan.priceYearly : plan.priceMonthly
                    const periodText = isYearly ? "/yr" : "/mo"

                    return (
                      <FormItem key={plan.value}>
                        <FormLabel>

                          <div className={`flex items-start gap-4 md:flex-col w-full p-4 rounded-lg ${isSelected ? "outline-indigo-900 bg-indigo-50 outline" : "outline-2"}`}>
                            <div className="h-[50px]">
                              <img className="h-full" src={plan.icon} />
                            </div>
                            <div>
                              <h3 className="text-blue-950 text-lg">{plan.title}</h3>
                              <p className="text-gray-400 text-base">${price}<span>{periodText}</span></p>
                              {
                                isYearly && <p className="mt-1 text-blue-900">{plan.message}</p>
                              }
                            </div>
                          </div>

                        </FormLabel>
                        <FormControl>
                          <RadioGroupItem className="hidden" value={plan.value} />
                        </FormControl>
                      </FormItem>
                    )
                  })
                }

              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex justify-center p-4 bg-gray-100 rounded-lg">
        <div className="flex items-center gap-4">
          <p className={` text-lg font-bold  ${!isYearly ? "text-blue-950" : "text-gray-400"}  `}>Monthly</p>
          <FormField
            control={control}
            name="period"
            render={() => (
              <FormItem>
                <FormControl>
                  <Switch
                    checked={period === "yearly"}
                    onCheckedChange={handleTogglePeriod}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <p className={` text-lg font-bold  ${isYearly ? "text-blue-950" : "text-gray-400"}  `}>Yearly</p>
        </div>
      </div>



    </div>
  )
}