import { Product } from './product.model';

describe('Product Interface', () => {
  it('should have correct properties', () => {
    const product: Product = {
      id: 1,
      name: 'Test Product',
      description: 'Test description',
      SKU: 'ABC123',
      category_id: 1,
      inventory_id: 1,
      price: 10.99,
      discount_id: 1,
      created_at: '2024-03-18T12:00:00Z',
      modified_at: '2024-03-18T12:00:00Z',
      deleted_at: '2024-03-18T12:00:00Z'
    };

    expect(product).toBeTruthy();
    expect(product.id).toEqual(1);
    expect(product.name).toEqual('Test Product');
    // Add more expectations for other properties...
  });
});
