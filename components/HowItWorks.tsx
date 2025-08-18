export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Choose Your Plan",
      description:
        "Select from our variety of meal plans that suit your appetite and budget",
    },
    {
      number: 2,
      title: "Place Your Order",
      description:
        "Call us or WhatsApp to place your order and confirm delivery details",
    },
    {
      number: 3,
      title: "Fresh Delivery",
      description: "Enjoy hot, fresh meals delivered to your doorstep daily",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="section-padding bg-white scroll-mt-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting delicious, authentic Indian meals is as easy as 1-2-3
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="text-center relative">
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary-200 -translate-y-1/2" />
              )}

              <div className="w-16 h-16 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center text-white text-xl font-bold relative z-10">
                {step.number}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {step.title}
              </h3>

              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
