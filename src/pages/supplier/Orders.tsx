import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';

const SupplierOrders = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <h1 className="font-heading text-3xl font-bold mb-8">Đơn hàng cần xử lý</h1>
          <Card><CardContent className="py-12 text-center"><Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" /><p className="text-muted-foreground">Chưa có đơn hàng mới</p></CardContent></Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupplierOrders;
