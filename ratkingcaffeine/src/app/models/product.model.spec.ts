import { Product } from './product.model';

describe('Product Interface', () => {
  it('should have correct properties', () => {
      const product: Product = {
    title: 'Test Product',
    description: 'Test description',
    imageUrl: ['https://example.com/image.jpg'],
    price: 10.99,
    category: 'Electronics',
    id: '1',
    rating: 4.5,
    stock: 100,
    isAvailable: true,
    createdAt: new Date('2024-03-18T12:00:00Z'),
    updatedAt: new Date('2024-03-18T12:00:00Z'),
    discountPercentage: 10,
    sku: 'ABC123'
  };

    expect(product).toBeTruthy();
    expect(product.id).toEqual('1');
    expect(product.title).toEqual('Test Product');
    // Add more expectations for other properties...
  });
});
