import { BaseEntity } from './common';
import type { NinjaOrderCreatedByService, NinjaOrderStatus } from '../schemas/ninja-orders';

export interface NinjaOrder extends BaseEntity {
  service_type: string;
  service_form_values: Record<string, any>;
  company_id: string;
  status: NinjaOrderStatus;
  total_cost: number;
  notes?: string;
  created_by_service: NinjaOrderCreatedByService;
} 