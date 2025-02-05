import { ObjectId } from 'mongodb';
import { BaseEntity } from './common';
import type { NinjaOrderStatus } from '../schemas/ninja-orders';

export interface NinjaOrder extends BaseEntity {
  _id: ObjectId;
  service_type: string;
  organization_id: string;
  status: NinjaOrderStatus;
  total_cost: number;
  notes?: string;
  metadata?: Record<string, unknown>;
} 