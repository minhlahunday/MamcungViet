import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check, 
  Truck, 
  Shield, 
  Clock,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Loader2,
  MapPin
} from 'lucide-react';

interface Offering {
  id: string;
  name: string;
  description: string | null;
  short_description: string | null;
  price: number;
  original_price: number | null;
  image_url: string | null;
  images: string[];
  items: string[];
  rating: number;
  review_count: number;
  sold_count: number;
  supplier_id: string;
  category_id: string | null;
}

const OfferingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [offering, setOffering] = useState<Offering | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetchOffering(id);
    }
  }, [id]);

  const fetchOffering = async (offeringId: string) => {
    try {
      const { data, error } = await supabase
        .from('offerings')
        .select('*')
        .eq('id', offeringId)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setOffering(data as Offering);
      }
    } catch (error) {
      console.error('Error fetching offering:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể tải thông tin sản phẩm',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    navigate(`/checkout?offering=${id}&quantity=${quantity}`);
  };

  const handleBuyNow = () => {
    navigate(`/checkout?offering=${id}&quantity=${quantity}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const discount = offering?.original_price 
    ? Math.round((1 - offering.price / offering.original_price) * 100)
    : 0;

  // Demo images if no images provided
  const images = offering?.images?.length 
    ? offering.images 
    : offering?.image_url 
      ? [offering.image_url]
      : ['/placeholder.svg'];

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
          <p className="text-muted-foreground mb-8">Sản phẩm này không tồn tại hoặc đã bị xóa.</p>
          <Button onClick={() => navigate('/')} className="btn-primary-hero">
            Về trang chủ
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/#offerings" className="hover:text-primary">Mâm cúng</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{offering.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={images[currentImageIndex]}
                  alt={offering.name}
                  className="w-full h-full object-cover"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        prev === 0 ? images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex(prev => 
                        prev === images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground">
                    -{discount}%
                  </Badge>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-heading text-3xl font-bold text-foreground mb-3">
                  {offering.name}
                </h1>
                
                {/* Rating & Stats */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-secondary text-secondary" />
                    <span className="font-medium">{offering.rating || '5.0'}</span>
                    <span className="text-muted-foreground">({offering.review_count || 0} đánh giá)</span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <span className="text-muted-foreground">Đã bán {offering.sold_count || 0}</span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-cream-dark rounded-xl p-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-heading font-bold text-primary">
                    {formatPrice(offering.price)}đ
                  </span>
                  {offering.original_price && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(offering.original_price)}đ
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {offering.short_description && (
                <p className="text-muted-foreground leading-relaxed">
                  {offering.short_description}
                </p>
              )}

              {/* Items Included */}
              {offering.items && offering.items.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-heading font-semibold text-foreground">Bao gồm:</h3>
                  <ul className="grid gap-2">
                    {offering.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Separator />

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-medium">Số lượng:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 btn-primary-hero py-6"
                >
                  Đặt mâm ngay
                </Button>
                <Button
                  onClick={() => setIsFavorite(!isFavorite)}
                  variant="outline"
                  className="w-14 h-14"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
                </Button>
                <Button variant="outline" className="w-14 h-14">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <Card className="border-0 bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Giao hàng đúng giờ</p>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Đảm bảo chất lượng</p>
                  </CardContent>
                </Card>
                <Card className="border-0 bg-muted/50">
                  <CardContent className="p-4 text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Hỗ trợ 24/7</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Full Description */}
          {offering.description && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-bold mb-6">Mô tả chi tiết</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground whitespace-pre-line">{offering.description}</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OfferingDetail;
