export type ProductPlanId = 'monthly' | 'lifetime' | 'xray' | 'private' | 'pro';

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

/** Valo Cheats — Zadeyo checkout tier names (xray, private, pro, Lifetime). */
const valoCheatsPlans: ProductPlan[] = [
  { id: 'xray', label: 'xray', priceUsd: 35, priceNote: 'USD' },
  { id: 'private', label: 'private', priceUsd: 35, priceNote: 'USD' },
  { id: 'pro', label: 'pro', priceUsd: 35, priceNote: 'USD' },
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
