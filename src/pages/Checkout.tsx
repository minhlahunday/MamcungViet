import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { 
  CalendarIcon, 
  Loader2, 
  MapPin, 
  Phone, 
  Mail, 
  User,
  CreditCard,
  Wallet,
  Building2,
  Clock,
  Check
} from 'lucide-react';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  customerPhone: z.string().regex(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
  customerEmail: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  deliveryAddress: z.string().min(10, 'Địa chỉ phải có ít nhất 10 ký tự'),
  deliveryDate: z.date({ required_error: 'Vui lòng chọn ngày giao hàng' }),
  deliveryTime: z.string().min(1, 'Vui lòng chọn giờ giao hàng'),
  paymentMethod: z.enum(['bank_transfer', 'momo', 'vnpay']),
});

interface Offering {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  supplier_id: string;
}

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const offeringId = searchParams.get('offering');
  const quantityParam = parseInt(searchParams.get('quantity') || '1');

  const [offering, setOffering] = useState<Offering | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [quantity] = useState(quantityParam);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [deliveryTime, setDeliveryTime] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'momo' | 'vnpay'>('bank_transfer');

  useEffect(() => {
    if (offeringId) {
      fetchOffering(offeringId);
    }
  }, [offeringId]);

  useEffect(() => {
    if (profile) {
      setCustomerName(profile.full_name || '');
      setCustomerPhone(profile.phone || '');
      setCustomerEmail(profile.email || '');
      setDeliveryAddress(profile.address || '');
    }
  }, [profile]);

  const fetchOffering = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('offerings')
        .select('id, name, price, image_url, supplier_id')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setOffering(data as Offering);
      }
    } catch (error) {
      console.error('Error fetching offering:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const totalPrice = offering ? offering.price * quantity : 0;

  const timeSlots = [
    '06:00 - 08:00',
    '08:00 - 10:00',
    '10:00 - 12:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      checkoutSchema.parse({
        customerName,
        customerPhone,
        customerEmail,
        deliveryAddress,
        deliveryDate,
        deliveryTime,
        paymentMethod,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    if (!offering) return;

    setSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert({
          customer_id: user?.id || null,
          supplier_id: offering.supplier_id,
          offering_id: offering.id,
          offering_name: offering.name,
          quantity,
          unit_price: offering.price,
          total_price: totalPrice,
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail || null,
          delivery_address: deliveryAddress,
          delivery_date: format(deliveryDate!, 'yyyy-MM-dd'),
          delivery_time: deliveryTime,
          special_notes: specialNotes || null,
          payment_method: paymentMethod,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Đặt hàng thành công!',
        description: 'Chúng tôi sẽ liên hệ với bạn sớm nhất.',
      });

      navigate(`/order-success?id=${data.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Lỗi đặt hàng',
        description: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!offering) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container-custom py-20 text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Không tìm thấy sản phẩm</h1>
          <Button onClick={() => navigate('/')} className="btn-primary-hero">
            Về trang chủ
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container-custom">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Đặt hàng</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Customer Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Thông tin người đặt
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customerName">Họ và tên *</Label>
                        <Input
                          id="customerName"
                          placeholder="Nguyễn Văn A"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                        />
                        {errors.customerName && (
                          <p className="text-sm text-destructive">{errors.customerName}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customerPhone">Số điện thoại *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="customerPhone"
                            placeholder="0912345678"
                            className="pl-10"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                          />
                        </div>
                        {errors.customerPhone && (
                          <p className="text-sm text-destructive">{errors.customerPhone}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerEmail">Email (không bắt buộc)</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="customerEmail"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Thông tin giao hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryAddress">Địa chỉ giao hàng *</Label>
                      <Textarea
                        id="deliveryAddress"
                        placeholder="Số nhà, đường, phường/xã, quận/huyện, thành phố"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                      />
                      {errors.deliveryAddress && (
                        <p className="text-sm text-destructive">{errors.deliveryAddress}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Ngày giao hàng *</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal',
                                !deliveryDate && 'text-muted-foreground'
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {deliveryDate 
                                ? format(deliveryDate, 'PPP', { locale: vi })
                                : 'Chọn ngày'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={deliveryDate}
                              onSelect={setDeliveryDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {errors.deliveryDate && (
                          <p className="text-sm text-destructive">{errors.deliveryDate}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Khung giờ giao *</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot}
                              type="button"
                              variant={deliveryTime === slot ? 'default' : 'outline'}
                              size="sm"
                              className={deliveryTime === slot ? 'btn-primary-hero' : ''}
                              onClick={() => setDeliveryTime(slot)}
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              {slot}
                            </Button>
                          ))}
                        </div>
                        {errors.deliveryTime && (
                          <p className="text-sm text-destructive">{errors.deliveryTime}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialNotes">Ghi chú đặc biệt</Label>
                      <Textarea
                        id="specialNotes"
                        placeholder="Yêu cầu đặc biệt, hướng dẫn giao hàng..."
                        value={specialNotes}
                        onChange={(e) => setSpecialNotes(e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Phương thức thanh toán
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={(value) => setPaymentMethod(value as typeof paymentMethod)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                        <Label htmlFor="bank_transfer" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Building2 className="w-6 h-6 text-primary" />
                          <div>
                            <p className="font-medium">Chuyển khoản ngân hàng</p>
                            <p className="text-sm text-muted-foreground">Thanh toán qua tài khoản ngân hàng</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                        <RadioGroupItem value="momo" id="momo" />
                        <Label htmlFor="momo" className="flex items-center gap-3 cursor-pointer flex-1">
                          <Wallet className="w-6 h-6 text-pink-500" />
                          <div>
                            <p className="font-medium">Ví MoMo</p>
                            <p className="text-sm text-muted-foreground">Thanh toán qua ví điện tử MoMo</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                        <RadioGroupItem value="vnpay" id="vnpay" />
                        <Label htmlFor="vnpay" className="flex items-center gap-3 cursor-pointer flex-1">
                          <CreditCard className="w-6 h-6 text-blue-500" />
                          <div>
                            <p className="font-medium">VNPay</p>
                            <p className="text-sm text-muted-foreground">Thanh toán qua VNPay (ATM, Visa, Mastercard)</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-28">
                  <CardHeader>
                    <CardTitle>Đơn hàng của bạn</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={offering.image_url || '/placeholder.svg'}
                          alt={offering.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground line-clamp-2">{offering.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Số lượng: {quantity}</p>
                        <p className="text-primary font-semibold mt-1">{formatPrice(offering.price)}đ</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tạm tính</span>
                        <span>{formatPrice(totalPrice)}đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phí giao hàng</span>
                        <span className="text-green-600">Miễn phí</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center">
                      <span className="font-medium">Tổng cộng</span>
                      <span className="text-2xl font-heading font-bold text-primary">
                        {formatPrice(totalPrice)}đ
                      </span>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-primary-hero py-6"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      Xác nhận đặt hàng
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Bằng việc đặt hàng, bạn đồng ý với điều khoản dịch vụ của chúng tôi
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
