import type { CollectionConfig } from 'payload'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'
import { setCookieBasedOnDomain } from './hooks/setCookieBasedOnDomain'
import { ensureUniqueUsername } from './hooks/ensureUniqueUsername'



const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  tenantsCollectionSlug: 'tenants',
  arrayFieldAccess: {},
  tenantFieldAccess: {},
  rowFields: [
    {
      name: 'roles',
      type: 'select',
      defaultValue: ['tenant-viewer'],
      hasMany: true,
      options: ['tenant-admin', 'tenant-viewer'],
      required: true,
    },
  ],
})


export const Users: CollectionConfig<'users'> = {
  slug: 'users',
  trash: true,
  access: {
    create: () => true,
    delete: () => true,
    read: () => true,
    update: () => true,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  endpoints: [],
  fields: [
    {
      saveToJWT: true,
      name: 'roles',
      type: 'select',
      interfaceName: 'TUserRole',
      defaultValue: 'USER',
      hasMany: true,
      options: [
        { label: "Customer", value: "CUSTOMER" },
        { label: "Sales Man", value: "SALES_MAN" },
        { label: "Booker", value: "BOOKER" },
        { label: "KPO", value: "KPO" },
        { label: "Admin", value: "ADMIN" },
        { label: "Super Admin", value: "SUPER_ADMIN" },
        { label: "User", value: "USER" },
      ],
      // access: {
      //   update: ({ req }) => {
      //     return isSuperAdmin(req.user)
      //   },
      // },
    },
    {
      name: 'username',
      type: 'text',
      hooks: {
        beforeValidate: [ensureUniqueUsername],
      },
      index: true,
      // unique: true
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        initCollapsed: true,
      },
      interfaceName: 'TUserTenants',
      saveToJWT: true,
    },
    {
      type: 'upload',
      name: 'profile',
      relationTo: 'media',
      label: 'Profile Avatar',
    },
  ],
  // The following hook sets a cookie based on the domain a user logs in from.
  // It checks the domain and matches it to a tenant in the system, then sets
  // a 'payload-tenant' cookie for that tenant.

  hooks: {
    afterLogin: [setCookieBasedOnDomain],
    afterError: [console.log]
  },
}