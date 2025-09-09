import PricingTables from "@/components/home/pricing/pricing-tables";

export default function Pricing() {
  return (
    <section id="pricing" className="py-12 md:py-24 lg:py-32 ">
      <div className="wrapper">
        <div className="text-center mb-12">
          <h2>Simple, Transparent Pricing</h2>
          <p>Choose the plan that&apos;s right for your business</p>
        </div>
        <PricingTables />
      </div>
    </section>
  );
}
