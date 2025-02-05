import { BaseEntity } from './common';
import { OrderStatus, PaymentStatus, PaymentMethod } from './common';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface NinjaOrder extends BaseEntity {
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  notes?: string;
} 