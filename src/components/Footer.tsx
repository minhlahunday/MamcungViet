import { Phone, Mail, MapPin, Facebook, MessageCircle } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "Trang chủ", href: "#home" },
    { label: "Dịch vụ", href: "#services" },
    { label: "Bảng giá", href: "#offerings" },
    { label: "Quy trình", href: "#process" },
  ];

  const services = [
    "Mâm cúng đầy tháng",
    "Mâm cúng tân gia",
    "Mâm cúng khai trương",
    "Mâm cúng giỗ",
  ];

  return (
    <footer id="contact" className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom section-padding pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-secondary-foreground font-heading text-xl font-bold">MC</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold">Mâm Cúng Việt</h3>
                <p className="text-xs opacity-70">Truyền thống - Hiện đại</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              Nền tảng dịch vụ mâm cúng hàng đầu Việt Nam. Gìn giữ truyền thống, 
              phục vụ hiện đại cho mọi gia đình.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-secondary transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Liên kết nhanh</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm opacity-80 hover:opacity-100 hover:text-secondary transition-all">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Dịch vụ</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-sm opacity-80">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-6">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium">Hotline</p>
                  <p className="text-sm opacity-80">1900 xxxx (8h - 20h)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm opacity-80">contact@mamcungviet.vn</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium">Địa chỉ</p>
                  <p className="text-sm opacity-80">TP. Hồ Chí Minh, Việt Nam</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70">
            <p>© 2025 Mâm Cúng Việt. Bảo lưu mọi quyền.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:opacity-100 transition-opacity">Điều khoản sử dụng</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Chính sách bảo mật</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
