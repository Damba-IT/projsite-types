import { z } from 'zod';
import { ObjectId } from 'mongodb';

const orderItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  quantity: z.number().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive'),
  subtotal: z.number().positive('Subtotal must be positive')
});

export const createOrderSchema = z.object({
  order_number: z.string(),
  customer_name: z.string().min(1, 'Customer name is required'),
  customer_email: z.string().email('Invalid email address'),
  customer_phone: z.string().min(1, 'Phone number is required'),
  delivery_address: z.string().min(1, 'Delivery address is required'),
  items: z.array(orderItemSchema).min(1, 'At least one item is required'),
  total_amount: z.number().positive('Total amount must be positive'),
  payment_status: z.enum(['pending', 'paid', 'failed', 'refunded']),
  payment_method: z.enum(['credit_card', 'cash', 'bank_transfer', 'digital_wallet']),
  notes: z.string().optional(),
  created_by: z.string()
});

export const updateOrderSchema = createOrderSchema
  .partial()
  .extend({
    status: z.enum(['pending', 'processing', 'completed', 'cancelled']).optional(),
    last_modified_by: z.string()
  });

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>; 