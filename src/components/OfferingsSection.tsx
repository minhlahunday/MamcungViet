import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const OfferingsSection = () => {
  const packages = [
    {
      name: "Tiêu Chuẩn",
      price: "800.000",
      description: "Phù hợp cho gia đình nhỏ, nghi thức đơn giản",
      features: [
        "Mâm ngũ quả tươi",
        "Hoa cúng trang trí",
        "Nhang đèn đầy đủ",
        "Giấy tiền vàng mã",
        "Giao hàng trong ngày",
      ],
      popular: false,
    },
    {
      name: "Cao Cấp",
      price: "1.500.000",
      description: "Được ưa chuộng nhất, đầy đủ lễ vật",
      features: [
        "Tất cả gói Tiêu Chuẩn",
        "Gà luộc/Heo quay mini",
        "Xôi gấc đỏ may mắn",
        "Bánh kẹo cao cấp",
        "Trang trí bàn thờ",
        "Hướng dẫn nghi thức",
      ],
      popular: true,
    },
    {
      name: "Đặc Biệt",
      price: "3.000.000",
      description: "Trọn gói sang trọng cho dịp quan trọng",
      features: [
        "Tất cả gói Cao Cấp",
        "Heo quay nguyên con",
        "Rượu lễ cao cấp",
        "Nhân viên hỗ trợ tại nhà",
        "Chọn giờ giao theo phong thủy",
        "Quà tặng hậu lễ",
      ],
      popular: false,
    },
  ];

  return (
    <section id="offerings" className="section-padding bg-cream-dark">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/30 text-secondary-foreground font-medium text-sm mb-4">
            Bảng giá dịch vụ
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 decoration-traditional">
            Các Gói Mâm Cúng
          </h2>
          <p className="text-muted-foreground mt-8">
            Lựa chọn gói dịch vụ phù hợp với nhu cầu và ngân sách của gia đình bạn.
            Tất cả đều được chuẩn bị chu đáo và trang trọng.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl p-8 transition-all duration-300 animate-fade-in ${
                pkg.popular
                  ? "shadow-gold border-2 border-secondary scale-105 z-10"
                  : "shadow-soft hover:shadow-elevated hover:-translate-y-1"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-gold rounded-full text-secondary-foreground text-sm font-semibold flex items-center gap-1">
                  <Sparkles size={14} />
                  Phổ biến nhất
                </div>
              )}

              {/* Package Header */}
              <div className="text-center mb-6">
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                  {pkg.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-heading font-bold text-primary">{pkg.price}</span>
                  <span className="text-muted-foreground">đ</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center ${
                      pkg.popular ? "bg-secondary text-secondary-foreground" : "bg-primary/10 text-primary"
                    }`}>
                      <Check size={12} />
                    </div>
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={`w-full py-6 font-semibold transition-all ${
                  pkg.popular
                    ? "btn-primary-hero"
                    : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                Đặt ngay
              </Button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-muted-foreground mt-12 text-sm">
          * Giá có thể thay đổi theo vùng miền và yêu cầu đặc biệt. Liên hệ để được tư vấn chi tiết.
        </p>
      </div>
    </section>
  );
};

export default OfferingsSection;
