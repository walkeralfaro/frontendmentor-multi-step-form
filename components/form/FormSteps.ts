import { Step } from "@/hooks/useFormSteps";

export const FormSteps: Step[] = [
  {
    title: 'Personal info',
    fields: [
      'name',
      'email',
      'phone'
    ],
    disabled: false,
    description: "Please provide your name, email, adderss and phone number."
  },
  {
    title: 'Select your plan',
    fields: [
      'plan',
      'period'
    ],
    disabled: false,
    description: "You have the option of monthly or yearly billing."
  },
  {
    title: 'Pick add-ons',
    fields: [
      'onlineservice',
      'largerstorage',
      'customizableprofile',
    ],
    disabled: false,
    description: "Add-ons help enhance your gaming experience."
  },
]