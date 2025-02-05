// Organization Settings
export interface OrganizationSettings {
  warehouse_module: boolean;
}

// Project Settings
export interface ProjectSettings {
  waste_booking_color: string;
  resource_booking_color: string;
  information: string;
  shipment_module: boolean;
  checkpoint_module: boolean;
  warehouse_module: boolean;
  waste_module: boolean;
  inbox_module: boolean;
  auto_approval: boolean;
  waste_auto_approval: boolean;
  sub_projects_enabled: boolean;
} 