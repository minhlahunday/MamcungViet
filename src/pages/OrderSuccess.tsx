import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Phone, Home, Package } from 'lucide-react';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container-custom max-w-2xl">
          <Card className="text-center">
            <CardContent className="py-12">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>

              <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
                Đặt hàng thành công!
              </h1>

              <p className="text-muted-foreground mb-2">
                Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của Mâm Cúng Việt.
              </p>

              {orderId && (
                <p className="text-sm text-muted-foreground mb-6">
                  Mã đơn hàng: <span className="font-mono font-semibold text-foreground">{orderId.slice(0, 8).toUpperCase()}</span>
                </p>
              )}

              <div className="bg-cream-dark rounded-xl p-6 mb-8 text-left">
                <h3 className="font-heading font-semibold mb-4">Bước tiếp theo:</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-semibold text-xs">1</span>
                    </div>
                    <span>Nhân viên sẽ liên hệ xác nhận đơn hàng trong vòng 30 phút</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-semibold text-xs">2</span>
                    </div>
                    <span>Thanh toán theo hướng dẫn (nếu chọn chuyển khoản)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-semibold text-xs">3</span>
                    </div>
                    <span>Mâm cúng sẽ được giao đúng thời gian bạn đã chọn</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn-primary-hero">
                  <Link to="/">
                    <Home className="w-4 h-4 mr-2" />
                    Về trang chủ
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/customer/orders">
                    <Package className="w-4 h-4 mr-2" />
                    Xem đơn hàng
                  </Link>
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Cần hỗ trợ?</p>
                <a 
                  href="tel:1900xxxx" 
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  1900 xxxx
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderSuccess;
