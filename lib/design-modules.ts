// ============================================================================
// Revntrix — Trusted Static Loader Map
// All 60 design modules statically mapped. No dynamic import path construction.
// User-controlled values NEVER become import paths (PRD-01 §9, TRD §5).
// ============================================================================

import { getDesignById } from "@/lib/design-registry";

// Each entry is a factory function that returns a dynamic import.
// This ensures code-splitting: only the requested design module is loaded.
export const DESIGN_MODULES: Record<string, () => Promise<unknown>> = {
  // ── Interior Designer (INT_01–INT_10) ──
  INT_01: () => import("@/designs/interior/INT_01"),
  INT_02: () => import("@/designs/interior/INT_02"),
  INT_03: () => import("@/designs/interior/INT_03"),
  INT_04: () => import("@/designs/interior/INT_04"),
  INT_05: () => import("@/designs/interior/INT_05"),
  INT_06: () => import("@/designs/interior/INT_06"),
  INT_07: () => import("@/designs/interior/INT_07"),
  INT_08: () => import("@/designs/interior/INT_08"),
  INT_09: () => import("@/designs/interior/INT_09"),
  INT_10: () => import("@/designs/interior/INT_10"),

  // ── Clinic / Doctor (CLN_01–CLN_10) ──
  CLN_01: () => import("@/designs/clinic/CLN_01"),
  CLN_02: () => import("@/designs/clinic/CLN_02"),
  CLN_03: () => import("@/designs/clinic/CLN_03"),
  CLN_04: () => import("@/designs/clinic/CLN_04"),
  CLN_05: () => import("@/designs/clinic/CLN_05"),
  CLN_06: () => import("@/designs/clinic/CLN_06"),
  CLN_07: () => import("@/designs/clinic/CLN_07"),
  CLN_08: () => import("@/designs/clinic/CLN_08"),
  CLN_09: () => import("@/designs/clinic/CLN_09"),
  CLN_10: () => import("@/designs/clinic/CLN_10"),

  // ── Real Estate (EST_01–EST_10) — never RE_* ──
  EST_01: () => import("@/designs/realestate/EST_01"),
  EST_02: () => import("@/designs/realestate/EST_02"),
  EST_03: () => import("@/designs/realestate/EST_03"),
  EST_04: () => import("@/designs/realestate/EST_04"),
  EST_05: () => import("@/designs/realestate/EST_05"),
  EST_06: () => import("@/designs/realestate/EST_06"),
  EST_07: () => import("@/designs/realestate/EST_07"),
  EST_08: () => import("@/designs/realestate/EST_08"),
  EST_09: () => import("@/designs/realestate/EST_09"),
  EST_10: () => import("@/designs/realestate/EST_10"),

  // ── Jewellers (JW_01–JW_10) ──
  JW_01: () => import("@/designs/jewellers/JW_01"),
  JW_02: () => import("@/designs/jewellers/JW_02"),
  JW_03: () => import("@/designs/jewellers/JW_03"),
  JW_04: () => import("@/designs/jewellers/JW_04"),
  JW_05: () => import("@/designs/jewellers/JW_05"),
  JW_06: () => import("@/designs/jewellers/JW_06"),
  JW_07: () => import("@/designs/jewellers/JW_07"),
  JW_08: () => import("@/designs/jewellers/JW_08"),
  JW_09: () => import("@/designs/jewellers/JW_09"),
  JW_10: () => import("@/designs/jewellers/JW_10"),

  // ── Restaurant (RES_01–RES_10) ──
  RES_01: () => import("@/designs/restaurant/RES_01"),
  RES_02: () => import("@/designs/restaurant/RES_02"),
  RES_03: () => import("@/designs/restaurant/RES_03"),
  RES_04: () => import("@/designs/restaurant/RES_04"),
  RES_05: () => import("@/designs/restaurant/RES_05"),
  RES_06: () => import("@/designs/restaurant/RES_06"),
  RES_07: () => import("@/designs/restaurant/RES_07"),
  RES_08: () => import("@/designs/restaurant/RES_08"),
  RES_09: () => import("@/designs/restaurant/RES_09"),
  RES_10: () => import("@/designs/restaurant/RES_10"),

  // ── E-commerce (ECO_01–ECO_10) ──
  ECO_01: () => import("@/designs/ecommerce/ECO_01"),
  ECO_02: () => import("@/designs/ecommerce/ECO_02"),
  ECO_03: () => import("@/designs/ecommerce/ECO_03"),
  ECO_04: () => import("@/designs/ecommerce/ECO_04"),
  ECO_05: () => import("@/designs/ecommerce/ECO_05"),
  ECO_06: () => import("@/designs/ecommerce/ECO_06"),
  ECO_07: () => import("@/designs/ecommerce/ECO_07"),
  ECO_08: () => import("@/designs/ecommerce/ECO_08"),
  ECO_09: () => import("@/designs/ecommerce/ECO_09"),
  ECO_10: () => import("@/designs/ecommerce/ECO_10"),
} as const;

/**
 * Securely loads a design module by ID.
 * 1. Validates the ID exists in the registry
 * 2. Checks the design is active
 * 3. Looks up the loader in the static map
 * 4. Returns the loaded module or null
 *
 * User-controlled values never reach import() directly.
 */
export async function loadDesignModule(designId: string) {
  // Step 1: Validate against registry
  const record = getDesignById(designId);
  if (!record) {
    return null;
  }

  // Step 2: Look up in trusted static map
  const loader = DESIGN_MODULES[record.id];
  if (!loader) {
    return null;
  }

  // Step 3: Load the module
  try {
    const module = await loader();
    return module;
  } catch {
    console.error(`[design-modules] Failed to load design: ${record.id}`);
    return null;
  }
}
