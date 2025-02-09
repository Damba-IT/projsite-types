import { z } from "zod";
import { locationSchema, dateRangeSchema } from "./common";

const contactPersonSchema = z.object({
  name: z.string().min(1, "Name is required"),
  user_id: z.string().optional(),
  company_name: z.string().min(1, "Company name is required"),
  company_id: z.string().optional(),
  role: z.string().min(1, "Role is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
});

const projectInfoSchema = z.object({
  project_id: z.string().optional(),
  project_name: z.string().min(1, "Project name is required"),
  location: locationSchema,
  estimated_duration: dateRangeSchema,
});

const fileSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  type: z.string(),
  size: z.number(),
  uploaded_at: z.date(),
});

// 1. Phasing Plan Schemas
export const phasingPlanSchema = z.object({
  project_info: projectInfoSchema,
  key_details: z.object({
    phasing_objective: z.enum([
      "staging",
      "sequential_phases",
      "parallel_workflows",
      "other",
    ]),
    phasing_objective_other: z.string().optional(),
    number_of_phases: z.number().min(1, "Number of phases is required"),
  }),
  site_overview: z.object({
    total_site_area: z.number().min(0, "Site area must be positive"),
    key_access_points: z
      .array(z.string())
      .min(1, "At least one access point is required")
      .optional(),
    constraints: z.array(
      z.enum([
        "environmental",
        "regulatory",
        "space_limitations",
        "access_restrictions",
      ])
    ),
  }),
  attachments: z
    .object({
      site_layout: z.array(fileSchema).optional(),
      zoning_reports: z.array(fileSchema).optional(),
      site_photos: z.array(fileSchema).optional(),
    })
    .optional(),
  contact: contactPersonSchema,
});

// 2. Draft Site Plans Schema
export const draftSitePlansSchema = z.object({
  project_info: projectInfoSchema.extend({
    project_id: z.string().optional(),
  }),
  key_details: z.object({
    purpose: z.string().min(1, "Purpose is required"),
    specific_features: z.string().min(1, "Specific features are required"),
    known_constraints: z.string().min(1, "Known constraints are required"),
  }),
  site_details: z.object({
    total_site_area: z.number().min(0, "Site area must be positive"),
    access_points: z
      .array(z.string())
      .min(1, "At least one access point is required"),
    utility_connections: z
      .array(
        z.object({
          type: z.string(),
          details: z.string(),
        })
      )
      .optional(),
  }),
  attachments: z.object({
    existing_site_layout: z
      .array(fileSchema)
      .min(1, "Existing site layout is required"),
    site_photos: z.array(fileSchema).optional(),
    zoning_reports: z.array(fileSchema).optional(),
  }),
  contact: contactPersonSchema,
});

// 3. Site Plan Updates Schema
export const sitePlanUpdatesSchema = z.object({
  project_info: projectInfoSchema.pick({
    project_name: true,
    location: true,
  }),
  update_details: z.object({
    reason: z.enum([
      "project_progression",
      "design_change",
      "space_adjustment",
      "other",
    ]),
    reason_other: z.string().optional(),
    specific_changes: z.array(
      z.enum([
        "storage_adjustments",
        "traffic_rerouting",
        "equipment_relocations",
        "other",
      ])
    ),
    specific_changes_other: z.string().optional(),
  }),
  current_site_info: z.object({
    is_existing_plan_accurate: z.boolean().default(false),
    discrepancies: z.string().optional(),
  }),
  attachments: z.object({
    current_site_plan: z
      .array(fileSchema)
      .min(1, "Current site plan is required"),
    supporting_documents: z.array(fileSchema).optional(),
  }),
  contact: contactPersonSchema,
});

// 4. Construction Logistics Plan (CLP) Schema
export const constructionLogisticsPlanSchema = z.object({
  project_info: projectInfoSchema,
  key_logistics_details: z.object({
    delivery_schedule: z.object({
      schedule_type: z.enum(["daily", "weekly", "monthly", "custom"], {
        required_error: "Schedule type is required",
      }),
      time_restrictions: z.string().optional(),
      peak_off_peak: z.string().optional(),
      delivery_volume: z.object({
        daily_deliveries: z.number().min(0, {
          message: "Number of deliveries per day is required",
        }),
        weekly_volume: z.string().optional(),
      }),
      additional_notes: z.string().optional(),
    }),
    transport_routes: z.array(
      z.enum([
        "major_highways",
        "regional_roads",
        "private_site_access",
        "temporary_roads",
        "rail_transport",
        "water_transport",
      ])
    ),
    traffic_flow_rating: z.number().min(1).max(5),
    traffic_flow_description: z
      .string()
      .min(1, "Traffic flow description is required"),
    waste_management: z.object({
      waste_types: z
        .array(
          z.enum([
            "construction_debris",
            "demolition_materials",
            "excavation_materials",
            "hazardous_materials",
            "packaging_materials",
            "site_clearance",
            "temporary_works",
            "maintenance_waste",
            "surplus_materials",
            "other",
          ])
        )
        .optional(),
      waste_types_other: z.string().optional(),
      disposal_methods: z
        .array(
          z.enum([
            "immediate_removal",
            "storage_before_removal",
            "recycling",
            "reuse_onsite",
            "segregated_disposal",
            "licensed_facility",
            "other",
          ])
        )
        .optional(),
      disposal_method_other: z.string().optional(),
      recycling_percentage: z.number().min(0).max(100).optional(),
      removal_frequency: z.enum(["daily", "weekly", "monthly"]).optional(),
    }),
  }),
  site_details: z.object({
    access_points: z
      .array(z.string())
      .min(1, "At least one access point is required"),
    storage_areas: z.string().min(1, "Storage areas description is required"),
    space_constraints: z.string().optional(),
  }),
  attachments: z.object({
    current_site_layout: z
      .array(fileSchema)
      .min(1, "Current site layout is required"),
    traffic_management_plans: z.array(fileSchema).optional(),
    site_photos: z.array(fileSchema).optional(),
  }),
  contact: contactPersonSchema,
});

// 5. Specialized Consulting Schema
export const specializedConsultingSchema = z.object({
  project_info: projectInfoSchema,
  key_details: z.object({
    challenge_description: z
      .string()
      .min(1, "Challenge description is required"),
    consultation_objective: z
      .array(
        z.enum([
          "logistics_optimization",
          "space_conflicts",
          "waste_management",
          "traffic_flow",
          "resource_allocation",
          "safety_compliance",
          "cost_reduction",
          "process_improvement",
          "other",
        ])
      )
      .min(1, "At least one consultation objective is required"),
    consultation_objective_other: z.string().optional(),
    constraints: z
      .array(
        z.enum([
          "regulatory",
          "environmental",
          "operational",
          "budget",
          "timeline",
          "space",
          "safety",
          "other",
        ])
      )
      .optional(),
    constraints_other: z.string().optional(),
  }),
  current_context: z.object({
    has_existing_plans: z.boolean().default(false),
    plan_types: z
      .array(z.enum(["cad_files", "pdf_plans", "sketches", "other"]))
      .optional(),
    key_resources: z.array(z.string()).optional(),
  }),
  attachments: z.object({
    relevant_documents: z.array(fileSchema).optional(),
    supporting_data: z.array(fileSchema).optional(),
  }),
  contact: contactPersonSchema,
});

// 6. Routine and Documentation Development Schema
export const routineDocumentationSchema = z.object({
  project_info: projectInfoSchema,
  process_requirements: z.object({
    logistics_processes: z
      .array(z.string())
      .min(1, "At least one process is required"),
    has_existing_routines: z.boolean(),
    existing_routines_description: z.string().optional(),
    current_challenges: z.string().optional(),
  }),
  contract_integration: z.object({
    has_existing_logistics_routines: z.boolean(),
    clauses: z.array(
      z.enum([
        "delivery_timelines",
        "material_handling",
        "waste_disposal",
        "site_access",
        "equipment_scheduling",
        "reporting",
        "force_majeure",
        "insurance",
        "health_safety",
        "other",
      ])
    ),
    other_clauses: z.string().optional(),
  }),
  attachments: z.object({
    process_documentation: z.array(fileSchema).optional(),
    contract_templates: z.array(fileSchema).optional(),
    supporting_files: z.array(fileSchema).optional(),
  }),
  contact: contactPersonSchema,
});

// 7. Swept Path Analysis Schema
export const sweptPathAnalysisSchema = z.object({
  project_info: projectInfoSchema,
  vehicle_details: z.object({
    vehicle_types: z
      .array(
        z.enum([
          "trucks_rigid",
          "trucks_articulated",
          "mobile_cranes",
          "tower_cranes",
          "bulldozers",
          "loaders",
          "forklifts",
          "excavators",
          "other",
        ])
      )
      .min(1, "At least one vehicle type is required"),
    vehicle_type_other: z.string().optional(),
    vehicle_mode: z.enum(["standard", "custom"]),
    custom_dimensions: z
      .object({
        length: z.number().optional(),
        width: z.number().optional(),
        turning_radius: z.number().optional(),
        height: z.number().optional(),
      })
      .optional(),
    route_description: z.string().min(1, "Route description is required"),
    movements: z
      .array(
        z.enum([
          "entry_exit",
          "turning_maneuvering",
          "reversing",
          "loading_unloading",
        ])
      )
      .min(1, "At least one movement type is required"),
  }),
  site_overview: z.object({
    access_points: z
      .array(z.string())
      .min(1, "At least one access point is required"),
    constraints: z.string().optional(),
  }),
  attachments: z.object({
    site_layout: z.array(fileSchema).min(1, "Site layout is required"),
    vehicle_specs: z.array(fileSchema).optional(),
    site_photos: z.array(fileSchema).optional(),
  }),
  contact: contactPersonSchema,
});

// 8. 3D Model Request Schema
export const threeDModelRequestSchema = z.object({
  project_info: projectInfoSchema,
  modeling_requirements: z.object({
    purpose: z.array(z.string()).min(1, "At least one purpose is required"),
    purpose_other: z.string().optional(),
    areas_to_model: z.array(z.string()).min(1, "At least one area is required"),
    areas_other: z.string().optional(),
    detail_level: z.enum([
      "basic_layout",
      "detailed_structures",
      "fully_rendered",
    ]),
  }),
  site_data: z.object({
    has_existing_plans: z.boolean(),
    key_features: z
      .array(
        z.enum([
          "transport_routes",
          "storage_areas",
          "temporary_facilities",
          "crane_locations",
          "utility_connections",
          "other",
        ])
      )
      .min(1, "At least one key feature is required"),
    key_features_other: z.string().optional(),
  }),
  attachments: z.object({
    cad_files: z.array(fileSchema).optional(),
    site_layouts: z.array(fileSchema).min(1, "Site layouts are required"),
    reference_photos: z.array(fileSchema).optional(),
  }),
  contact: contactPersonSchema,
});

// Risk Assessment Schema
export const riskAssessmentSchema = z.object({
  project_info: projectInfoSchema,
  risk_assessment_scope: z.object({
    transportation_delivery_risks: z.array(
      z.enum([
        "delivery_delays",
        "vehicle_breakdowns",
        "traffic_congestion",
        "limited_access_routes",
        "weather_disruptions",
        "accidents_collisions",
        "other",
      ])
    ),
    transportation_delivery_risks_other: z.string().optional(),
    equipment_material_risks: z.array(
      z.enum([
        "equipment_damage",
        "storage_issues",
        "incorrect_handling",
        "supplier_shortages",
        "other",
      ])
    ),
    equipment_material_risks_other: z.string().optional(),
    operational_compliance_risks: z.array(
      z.enum([
        "workforce_availability",
        "regulatory_delays",
        "safety_noncompliance",
        "communication_failures",
        "other",
      ])
    ),
    operational_compliance_risks_other: z.string().optional(),
    environmental_site_risks: z.array(
      z.enum([
        "site_congestion",
        "utility_disruptions",
        "hazardous_incidents",
        "other",
      ])
    ),
    environmental_site_risks_other: z.string().optional(),
    previous_incidents: z.string().optional(),
  }),
  attachments: z.object({
    risk_reports: z.array(fileSchema).optional(),
    site_layout: z.array(fileSchema).min(1, "Site layout is required"),
  }),
  contact: contactPersonSchema,
});

// Service Type Enum
export const serviceTypeSchema = z.enum([
  "phasing_plan",
  "draft_site_plans",
  "site_plan_updates",
  "construction_logistics_plan",
  "specialized_consulting",
  "routine_documentation",
  "swept_path_analysis",
  "three_d_model_request",
  "risk_assessment",
]);

// Types
export type ServiceType = z.infer<typeof serviceTypeSchema>;
export type PhasingPlan = z.infer<typeof phasingPlanSchema>;
export type DraftSitePlans = z.infer<typeof draftSitePlansSchema>;
export type SitePlanUpdates = z.infer<typeof sitePlanUpdatesSchema>;
export type ConstructionLogisticsPlan = z.infer<
  typeof constructionLogisticsPlanSchema
>;
export type SpecializedConsulting = z.infer<typeof specializedConsultingSchema>;
export type RoutineDocumentation = z.infer<typeof routineDocumentationSchema>;
export type SweptPathAnalysis = z.infer<typeof sweptPathAnalysisSchema>;
export type ThreeDModelRequest = z.infer<typeof threeDModelRequestSchema>;
export type RiskAssessment = z.infer<typeof riskAssessmentSchema>;

// Update ServiceId type
export type ServiceId =
  | "phasing-plan"
  | "draft-site-plans"
  | "site-plan-updates"
  | "construction-logistics-plan"
  | "specialized-consulting"
  | "routine-documentation"
  | "swept-path-analysis"
  | "3d-model-request"
  | "risk-assessment";
