import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Package, ShoppingBag, BarChart3, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!user || !isAdmin) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" onClick={signOut}><LogOut className="w-4 h-4 mr-2" /> Đăng xuất</Button>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader><CardTitle className="flex items-center gap-2"><Users className="text-primary" /> Người dùng</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Quản lý tất cả người dùng</p>
                <Button asChild className="w-full"><Link to="/admin/users">Quản lý</Link></Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader><CardTitle className="flex items-center gap-2"><Package className="text-primary" /> Sản phẩm</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Duyệt sản phẩm mới</p>
                <Button asChild variant="outline" className="w-full"><Link to="/admin/products">Xem sản phẩm</Link></Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader><CardTitle className="flex items-center gap-2"><ShoppingBag className="text-primary" /> Đơn hàng</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Quản lý đơn hàng toàn hệ thống</p>
                <Button asChild variant="outline" className="w-full"><Link to="/admin/orders">Xem đơn hàng</Link></Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="text-primary" /> Thống kê</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Báo cáo tổng quan</p>
                <Button variant="outline" className="w-full">Xem báo cáo</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
