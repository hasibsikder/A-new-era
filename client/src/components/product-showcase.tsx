import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

interface ProductShowcaseProps {
  onAddToCart: (product: Product) => void;
  searchQuery: string;
}

export function ProductShowcase({ onAddToCart, searchQuery }: ProductShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products'],
  });

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product: Product) => {
      const matchesCategory = activeFilter === 'all' || product.category === activeFilter;
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a: Product, b: Product) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        filtered.sort((a: Product, b: Product) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'newest':
        filtered.sort((a: Product, b: Product) => b.id - a.id);
        break;
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [products, activeFilter, sortBy, searchQuery]);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWish
