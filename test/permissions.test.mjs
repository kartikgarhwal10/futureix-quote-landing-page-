import test from 'node:test';
import assert from 'node:assert/strict';
import { getRolePermissions, validateDiscountAuthorization } from '../src/lib/permissions.ts';

test('Admin has full rights including catalogue editing and high discounts', () => {
  const adminPerms = getRolePermissions('admin');
  assert.equal(adminPerms.canEditCatalogue, true);
  assert.equal(adminPerms.canCreateQuote, true);
  assert.equal(adminPerms.canManageSettings, true);
  assert.equal(adminPerms.maxDiscountAllowed, 50);

  const authCheck = validateDiscountAuthorization('admin', 25);
  assert.equal(authCheck.authorized, true);
});

test('Sales role cannot edit catalogue and cannot exceed 15% discount', () => {
  const salesPerms = getRolePermissions('sales');
  assert.equal(salesPerms.canEditCatalogue, false);
  assert.equal(salesPerms.canCreateQuote, true);
  assert.equal(salesPerms.maxDiscountAllowed, 15);

  // 10% discount is authorized
  const validCheck = validateDiscountAuthorization('sales', 10);
  assert.equal(validCheck.authorized, true);

  // 20% discount is rejected without admin approval
  const invalidCheck = validateDiscountAuthorization('sales', 20);
  assert.equal(invalidCheck.authorized, false);
  assert.ok(invalidCheck.messageEn.includes('exceeds maximum'));
});

test('Viewer role has read-only access and cannot create quotes or apply discounts', () => {
  const viewerPerms = getRolePermissions('viewer');
  assert.equal(viewerPerms.canViewCatalogue, true);
  assert.equal(viewerPerms.canEditCatalogue, false);
  assert.equal(viewerPerms.canCreateQuote, false);
  assert.equal(viewerPerms.maxDiscountAllowed, 0);

  const discountCheck = validateDiscountAuthorization('viewer', 5);
  assert.equal(discountCheck.authorized, false);
});
