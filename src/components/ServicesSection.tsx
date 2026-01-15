import { Baby, Home, Store, Heart } from "lucide-react";
import offeringBaby from "@/assets/offering-baby.jpg";
import offeringHousewarming from "@/assets/offering-housewarming.jpg";
import offeringOpening from "@/assets/offering-opening.jpg";
import offeringAncestor from "@/assets/offering-ancestor.jpg";

const ServicesSection = () => {
  const services = [
    {
      icon: Baby,
      title: "Đầy Tháng",
      description: "Mâm cúng đầy tháng, thôi nôi cho bé với đầy đủ lễ vật theo phong tục từng vùng miền.",
      image: offeringBaby,
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Home,
      title: "Tân Gia",
      description: "Mâm cúng nhập trạch, tân gia nhà mới với nghi thức chuẩn, mang may mắn cho gia chủ.",
      image: offeringHousewarming,
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: Store,
      title: "Khai Trương",
      description: "Mâm cúng khai trương, động thổ cho doanh nghiệp, cầu mong làm ăn phát đạt, thuận lợi.",
      image: offeringOpening,
      color: "from-red-500 to-rose-600",
    },
    {
      icon: Heart,
      title: "Giỗ Tổ Tiên",
      description: "Mâm cúng giỗ ông bà, tổ tiên trang trọng, thể hiện lòng thành kính với người đã khuất.",
      image: offeringAncestor,
      color: "from-yellow-500 to-amber-600",
    },
  ];

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
            Dịch vụ của chúng tôi
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 decoration-traditional">
            Mâm Cúng Cho Mọi Dịp
          </h2>
          <p className="text-muted-foreground mt-8">
            Chúng tôi cung cấp đa dạng các loại mâm cúng phù hợp với từng dịp lễ, 
            được chuẩn bị bởi đội ngũ có kinh nghiệm lâu năm.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-offering group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                
                {/* Icon Badge */}
                <div className={`absolute top-4 right-4 w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                  <service.icon className="text-primary-foreground" size={24} />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <button className="mt-4 text-primary font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Xem chi tiết
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
