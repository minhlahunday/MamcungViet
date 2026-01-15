import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const AdminUsers = () => (
  <div className="min-h-screen bg-cream">
    <Header />
    <main className="pt-24 pb-16">
      <div className="container-custom">
        <h1 className="font-heading text-3xl font-bold mb-8">Quản lý người dùng</h1>
        <Card><CardContent className="py-12 text-center"><p className="text-muted-foreground">Danh sách người dùng sẽ hiển thị ở đây</p></CardContent></Card>
      </div>
    </main>
    <Footer />
  </div>
);

export default AdminUsers;
