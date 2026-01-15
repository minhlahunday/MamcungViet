import { Search, ClipboardList, CreditCard, Truck } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Chọn dịch vụ",
      description: "Duyệt qua danh mục mâm cúng theo dịp lễ và chọn gói phù hợp với nhu cầu.",
    },
    {
      icon: ClipboardList,
      step: "02",
      title: "Tùy chỉnh mâm",
      description: "Điều chỉnh các món theo sở thích, chọn kích thước và phong cách trang trí.",
    },
    {
      icon: CreditCard,
      step: "03",
      title: "Thanh toán",
      description: "Thanh toán an toàn qua ví điện tử, chuyển khoản hoặc thẻ tín dụng.",
    },
    {
      icon: Truck,
      step: "04",
      title: "Nhận mâm cúng",
      description: "Giao hàng đúng giờ theo lịch hẹn. Hỗ trợ bày biện và hướng dẫn nghi thức.",
    },
  ];

  return (
    <section id="process" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent-foreground font-medium text-sm mb-4">
            Quy trình đặt hàng
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 decoration-traditional">
            Đặt Mâm Cúng Dễ Dàng
          </h2>
          <p className="text-muted-foreground mt-8">
            Chỉ với 4 bước đơn giản, bạn đã có thể đặt mâm cúng chất lượng giao tận nhà.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-secondary to-secondary/20" />
              )}

              <div className="relative bg-gradient-card rounded-2xl p-8 text-center shadow-soft group-hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-2">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-gold text-secondary-foreground text-sm font-bold flex items-center justify-center shadow-gold">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-gradient-primary transition-all duration-300">
                  <step.icon className="text-primary group-hover:text-primary-foreground transition-colors" size={32} />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
