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
    description: "Please provide your name, email, adderss and phone number.",
    side_description: "your info"
  },
  {
    title: 'Select your plan',
    fields: [
      'plan',
      'period'
    ],
    disabled: false,
    description: "You have the option of monthly or yearly billing.",
    side_description: "select plan"
  },
  {
    title: 'Pick add-ons',
    fields: [
      'onlineservice',
      'largerstorage',
      'customizableprofile',
    ],
    disabled: false,
    description: "Add-ons help enhance your gaming experience.",
    side_description: "add-ons"
  },
  {
    title: 'Finishing up',
    fields: [],
    disabled: false,
    description: "Double-check everything looks OK before confirming.",
    side_description: "summary"
  },
]