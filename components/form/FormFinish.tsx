import { useFormContext, useWatch } from "react-hook-form";
import { FormType } from "@/schema";
import { useEffect } from "react";

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
    < >

      {
        !isSubmitSuccessful ? (
          <div>
            <div className=" bg-gray-100 rounded-md p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-blue-950 font-bold">{plans[plan].name} <span> ({periodText}) </span> </h3>
                <p className="text-sm text-blue-950 font-bold">${plans[plan][period]}<span>/{periodMinText}</span> </p>
              </div>
              <hr className="mx-4" />

              {
                onlineservice &&
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400">Online service</p>
                  <p className="text-sm text-blue-950">+${addons.onlineservice[period]}<span>/{periodMinText}</span></p>
                </div>
              }

              {
                largerstorage &&
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400">Larger storage</p>
                  <p className="text-sm text-blue-950">+${addons.largerstorage[period]}<span>/{periodMinText}</span></p>
                </div>
              }

              {
                customizableprofile &&
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-400">Customizable profile</p>
                  <p className="text-sm text-blue-950">+${addons.customizableprofile[period]}<span>/{periodMinText}</span></p>
                </div>
              }

              {
                (!onlineservice && !largerstorage && !customizableprofile) && <p className="text-sm text-gray-400 text-center mt-3">Not Add-ons</p>
              }

            </div>


            <div className="flex justify-between items-center px-4 mt-5">
              <p className="text-sm text-gray-400">Total <span> ({periodTotal}) </span> </p>
              <p className="text-md text-indigo-500 font-bold">+${total}<span>/{periodMinText}</span> </p>
            </div>

          </div>

        ) : (

          <div className="text-center flex flex-col gap-3 items-center py-10">
            <img src='/icon-thank-you.svg' className="w-12"></img>
            <h3 className="text-blue-950 text-xl font-black mt-3">Thank you!</h3>

            <p className="text-gray-400">Thanks for confirming you subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</p>
          </div>


        )
      }
    </>
  );
}
