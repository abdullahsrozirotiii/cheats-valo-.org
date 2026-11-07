export type ProductPlanId = 'monthly' | 'lifetime' | 'lite' | 'pro' | 'elite';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd: number;
  priceNote: string;
  /** Shown under the plan label in checkout (e.g. “31 days of access”). */
  detail?: string;
}

const access31Days = '31 days of access';
const unlimitedAccess = 'Unlimited access';

/** Monthly + lifetime (UGC, utilities, etc.). */
const subscriptionPlans: ProductPlan[] = [
  {
    id: 'monthly',
    label: 'Monthly',
    priceUsd: 35,
    priceNote: 'USD',
    detail: access31Days,
  },
  {
    id: 'lifetime',
    label: 'Lifetime',
    priceUsd: 150,
    priceNote: 'USD · one-time',
    detail: unlimitedAccess,
  },
];

/** Valo Cheats: Lite, Pro, Elite monthly + lifetime (Zadeyo tier picker). */
const valoCheatsPlans: ProductPlan[] = [
  { id: 'lite', label: 'Lite', priceUsd: 35, priceNote: 'USD', detail: access31Days },
  { id: 'pro', label: 'Pro', priceUsd: 35, priceNote: 'USD', detail: access31Days },
  { id: 'elite', label: 'Elite', priceUsd: 35, priceNote: 'USD', detail: access31Days },
  {
    id: 'lifetime',
    label: 'Lifetime',
    priceUsd: 150,
    priceNote: 'USD · one-time',
    detail: unlimitedAccess,
  },
];

export function getProductPlans(productSlug: string): ProductPlan[] {
  if (productSlug === 'valo-cheats') return valoCheatsPlans;
  return subscriptionPlans;
}

export function formatPlanPrice(usd: number): string {
  return `$${usd}`;
}

export function checkoutUrlWithPlan(baseUrl: string, planId: ProductPlanId): string {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}plan=${planId}`;
}
