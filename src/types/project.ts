import { ObjectId } from 'mongodb';
import { BaseEntity, ProjectStatus } from './common';
import { ProjectSettings } from './settings';
import { FormValidationRules } from './validation';

export interface Project extends BaseEntity {
  project_id: string;
  name: string;
  organization_id: ObjectId;
  start_date: Date;
  end_date: Date;
  status: ProjectStatus;
  location_address?: string;
  location_formatted_address?: string;
  location_place_id?: string;
  location_lat?: string;
  location_lng?: string;
  settings: ProjectSettings;
  form_validation_rules: FormValidationRules;
} 