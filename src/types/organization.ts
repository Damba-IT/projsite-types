import { ObjectId } from 'mongodb';
import { BaseEntity } from './common';
import { OrganizationSettings } from './settings';

export interface Organization extends BaseEntity {
  name: string;
  active: boolean;
  is_deleted: boolean;
  logo?: string;
  settings: OrganizationSettings;
  created_by_user?: string;
  created_by_service?: string;
} 