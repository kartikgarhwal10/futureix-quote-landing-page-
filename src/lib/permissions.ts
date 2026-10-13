import { UserRole } from './types';

export interface PermissionCheck {
  canViewCatalogue: boolean;
  canEditCatalogue: boolean;
  canCreateQuote: boolean;
  canExportQuote: boolean;
  canManageUsers: boolean;
  canManageSettings: boolean;
  maxDiscountAllowed: number; // percentage
}

export function getRolePermissions(role: UserRole): PermissionCheck {
  switch (role) {
    case 'admin':
      return {
        canViewCatalogue: true,
        canEditCatalogue: true,
        canCreateQuote: true,
        canExportQuote: true,
        canManageUsers: true,
        canManageSettings: true,
        maxDiscountAllowed: 50,
      };
    case 'sales':
      return {
        canViewCatalogue: true,
        canEditCatalogue: false, // Sales cannot modify master price catalogue
        canCreateQuote: true,
        canExportQuote: true,
        canManageUsers: false,
        canManageSettings: false,
        maxDiscountAllowed: 15, // Sales discount limit 15%
      };
    case 'viewer':
    default:
      return {
        canViewCatalogue: true,
        canEditCatalogue: false,
        canCreateQuote: false,
        canExportQuote: false,
        canManageUsers: false,
        canManageSettings: false,
        maxDiscountAllowed: 0,
      };
  }
}

export function validateDiscountAuthorization(role: UserRole, discountPercent: number): {
  authorized: boolean;
  messageEn: string;
  messageHi: string;
} {
  const perms = getRolePermissions(role);
  if (discountPercent <= 0) {
    return { authorized: true, messageEn: 'Standard pricing', messageHi: 'मानक मूल्य' };
  }
  if (discountPercent > perms.maxDiscountAllowed) {
    return {
      authorized: false,
      messageEn: `Discount of ${discountPercent}% exceeds maximum authorized limit of ${perms.maxDiscountAllowed}% for ${role} role. Admin approval required.`,
      messageHi: `${role} रोल के लिए अधिकतम मान्य डिस्काउंट सीमा ${perms.maxDiscountAllowed}% है। ${discountPercent}% डिस्काउंट हेतु एडमिन स्वीकृति आवश्यक है।`,
    };
  }
  return { authorized: true, messageEn: 'Authorized discount applied', messageHi: 'स्वीकृत डिस्काउंट लागू किया गया' };
}
