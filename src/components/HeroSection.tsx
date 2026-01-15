import { ArrowRight, Star, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-offering.jpg";

const HeroSection = () => {
  const stats = [
    { icon: Star, value: "4.9/5", label: "Đánh giá" },
    { icon: Users, value: "10,000+", label: "Khách hàng" },
    { icon: Clock, value: "2h", label: "Giao hàng" },
  ];

  return (
    <section id="home" className="relative min-h-screen pt-20 bg-gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-32 h-32 rounded-full bg-secondary/20 blur-3xl animate-float" />
      <div className="absolute bottom-40 right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)] py-12">
          {/* Left Content */}
          <div className="animate-slide-in-left">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/30 text-secondary-foreground font-medium text-sm mb-6">
              ✨ Nền tảng dịch vụ mâm cúng #1 Việt Nam
            </span>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Gìn giữ{" "}
              <span className="text-gradient-primary">truyền thống</span>
              <br />
              Phong cách{" "}
              <span className="text-gradient-gold">hiện đại</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Mâm Cúng Việt cung cấp dịch vụ mâm cúng trọn gói cho mọi dịp: đầy tháng, tân gia, khai trương, 
              giỗ tổ tiên... Chuẩn phong tục, đẹp mắt, giao tận nơi.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-12">
              <Button className="btn-primary-hero group">
                Đặt mâm cúng ngay
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button variant="outline" className="btn-outline-gold">
                Xem catalog
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 animate-fade-in"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center">
                    <stat.icon className="text-secondary" size={24} />
                  </div>
                  <div>
                    <p className="font-heading text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <img 
                src={heroImage} 
                alt="Mâm cúng truyền thống Việt Nam" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-elevated animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                  <Star className="text-secondary-foreground" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Được tin tưởng</p>
                  <p className="text-sm text-muted-foreground">bởi 10,000+ gia đình</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
