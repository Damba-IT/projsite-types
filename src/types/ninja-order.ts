import { ObjectId } from 'mongodb';
import { BaseEntity } from './common';
import type { NinjaOrderStatus } from '../schemas/ninja-orders';

export interface NinjaOrder extends BaseEntity {
  _id: ObjectId;
  service_type: string;
  service_form_values?: Record<string, unknown>;
  company_id: string;
  status: NinjaOrderStatus;
  total_cost: number;
  notes?: string;
  created_by_user: string;
  created_by_service: 'web' | 'mobile';
} 