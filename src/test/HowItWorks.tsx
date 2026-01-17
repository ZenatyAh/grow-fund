import StepCard from "@/components/shared/StepCard";
// U can use this comonents whereever u want, try it please and if there is any problem let me know
const steps = [
  {
    image: "/images/account.png",
    title: "إعداد الحساب الشخصي",
    description: "أكمل بياناتك الأساسية.",
    buttonText: "إعداد الحساب الآن",
  },
  {
    image: "/images/donation.png",
    title: "أنشئ حملتك الأولى",
    description: "ابدأ بإنشاء أول حملة لك بسهولة.",
    buttonText: "ابدأ إنشاء حملة",
  },
];

export default function HowItWorks() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {steps.map((step, index) => (
        <StepCard
          key={index}
          {...step}
          onClick={() => console.log(step.title)}
        />
      ))}
    </section>
  );
}
