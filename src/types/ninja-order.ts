import { BaseEntity } from './common';
import type { NinjaOrderStatus } from '../schemas/ninja-orders';

export interface NinjaOrder extends BaseEntity {
  service_type: string;
  service_form_values: Record<string, any>;
  company_id: string;
  status: NinjaOrderStatus;
  total_cost: number;
  notes?: string;
} 