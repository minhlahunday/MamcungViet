import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package, ShoppingBag, User, LogOut } from 'lucide-react';

const CustomerDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-heading text-3xl font-bold">Xin chào, {profile?.full_name || 'Khách hàng'}</h1>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader><CardTitle className="flex items-center gap-2"><ShoppingBag className="text-primary" /> Đơn hàng</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Xem và theo dõi đơn hàng của bạn</p>
                <Button asChild className="w-full"><Link to="/customer/orders">Xem đơn hàng</Link></Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader><CardTitle className="flex items-center gap-2"><Package className="text-primary" /> Mâm cúng</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Khám phá các mâm cúng đa dạng</p>
                <Button asChild variant="outline" className="w-full"><Link to="/#offerings">Xem mâm cúng</Link></Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader><CardTitle className="flex items-center gap-2"><User className="text-primary" /> Tài khoản</CardTitle></CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Quản lý thông tin cá nhân</p>
                <Button variant="outline" className="w-full">Cập nhật thông tin</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
