import { useFormContext, useWatch } from "react-hook-form";
import { FormType } from "@/schema";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

const plans = {
  arcade: { name: "Arcade", monthly: 9, yearly: 90 },
  advanced: { name: "Advance", monthly: 12, yearly: 120 },
  pro: { name: "Pro", monthly: 15, yearly: 150 },
};

const addons = {
  onlineservice: { monthly: 1, yearly: 10 },
  largerstorage: { monthly: 2, yearly: 20 },
  customizableprofile: { monthly: 2, yearly: 20 },
};


export default function FormFinish() {
  const { control, formState: { isSubmitSuccessful }, reset } = useFormContext<FormType>();
  const [progress, setProgress] = useState(0)

  // Observar valores en tiempo real
  const plan = useWatch({ control, name: "plan" });
  const period = useWatch({ control, name: "period" });
  const onlineservice = useWatch({ control, name: "onlineservice" });
  const largerstorage = useWatch({ control, name: "largerstorage" });
  const customizableprofile = useWatch({ control, name: "customizableprofile" });

  const isYearly = period === "yearly"
  const periodText = isYearly ? "Yearly" : "Monthly"
  const periodMinText = isYearly ? "yr" : "mo"
  const periodTotal = isYearly ? "per year" : "per month"

  // Calcular total dinámicamente
  const basePrice = plans[plan][period];
  let total = basePrice;

  if (onlineservice) total += addons.onlineservice[period];
  if (largerstorage) total += addons.largerstorage[period];
  if (customizableprofile) total += addons.customizableprofile[period];

  return (
    <>
      {
        !isSubmitSuccessful && (
          <div className="md:grow">
            <div className=" bg-gray-100 rounded-md p-4 space-y-2 2xl:space-y-4 2xl:p-8">
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-blue-950 font-bold 2xl:text-xl">{plans[plan].name} <span> ({periodText}) </span> </h3>
                <p className="text-sm text-blue-950 font-bold 2xl:text-xl">${plans[plan][period]}<span>/{periodMinText}</span> </p>
              </div>
              <hr className="mx-4" />

              {
                onlineservice &&
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400 2xl:text-xl">Online service</p>
                  <p className="text-sm text-blue-950 2xl:text-xl">+${addons.onlineservice[period]}<span>/{periodMinText}</span></p>
                </div>
              }

              {
                largerstorage &&
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400 2xl:text-xl">Larger storage</p>
                  <p className="text-sm text-blue-950 2xl:text-xl">+${addons.largerstorage[period]}<span>/{periodMinText}</span></p>
                </div>
              }

              {
                customizableprofile &&
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400 2xl:text-xl">Customizable profile</p>
                  <p className="text-sm text-blue-950 2xl:text-xl">+${addons.customizableprofile[period]}<span>/{periodMinText}</span></p>
                </div>
              }

              {
                (!onlineservice && !largerstorage && !customizableprofile) && <p className="text-sm text-gray-400 text-center mt-3">Not Add-ons</p>
              }

            </div>

            <div className="flex justify-between items-center px-4 mt-5">
              <p className="text-sm text-gray-400 2xl:text-xl">Total <span> ({periodTotal}) </span> </p>
              <p className="text-md text-indigo-500 font-bold 2xl:text-2xl">+${total}<span>/{periodMinText}</span> </p>
            </div>

          </div>

        )
      }
    </>
  );
}
