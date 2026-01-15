import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Loader2, Package } from 'lucide-react';

const CustomerOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    const { data } = await supabase.from('orders').select('*').eq('customer_id', user?.id).order('created_at', { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-purple-100 text-purple-800',
    delivering: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusLabels: Record<string, string> = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    preparing: 'Đang chuẩn bị',
    delivering: 'Đang giao',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <h1 className="font-heading text-3xl font-bold mb-8">Đơn hàng của tôi</h1>
          
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
          ) : orders.length === 0 ? (
            <Card><CardContent className="py-12 text-center"><Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" /><p className="text-muted-foreground">Bạn chưa có đơn hàng nào</p></CardContent></Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">{order.offering_name}</CardTitle>
                    <Badge className={statusColors[order.order_status]}>{statusLabels[order.order_status]}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div><span className="text-muted-foreground">Ngày giao:</span> {format(new Date(order.delivery_date), 'dd/MM/yyyy', { locale: vi })}</div>
                      <div><span className="text-muted-foreground">Giờ:</span> {order.delivery_time}</div>
                      <div><span className="text-muted-foreground">Số lượng:</span> {order.quantity}</div>
                      <div className="font-semibold text-primary">{new Intl.NumberFormat('vi-VN').format(order.total_price)}đ</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerOrders;
