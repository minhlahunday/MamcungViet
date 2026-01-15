import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const SupplierProducts = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-heading text-3xl font-bold">Sản phẩm của tôi</h1>
            <Button className="btn-primary-hero"><Plus className="w-4 h-4 mr-2" /> Thêm sản phẩm</Button>
          </div>
          <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">Bạn chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên!</p></CardContent></Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupplierProducts;
