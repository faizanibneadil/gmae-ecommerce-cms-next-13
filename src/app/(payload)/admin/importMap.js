import { TenantField as TenantField_1d0591e3cf4f332c83a86da13a0de59a } from '@payloadcms/plugin-multi-tenant/client'
import { AssignTenantFieldTrigger as AssignTenantFieldTrigger_1d0591e3cf4f332c83a86da13a0de59a } from '@payloadcms/plugin-multi-tenant/client'
import { WatchTenantCollection as WatchTenantCollection_1d0591e3cf4f332c83a86da13a0de59a } from '@payloadcms/plugin-multi-tenant/client'
import { SlugField as SlugField_2b8867833a34864a02ddf429b0728a40 } from '@payloadcms/next/client'
import { SyncBillingItems as SyncBillingItems_d530617488782a14e722693740dffa85 } from '@/collections/Billing/components/SyncBillingItems.tsx'
import { RscEntryLexicalCell as RscEntryLexicalCell_44fe37237e0ebf4470c9990d8cb7b07e } from '@payloadcms/richtext-lexical/rsc'
import { RscEntryLexicalField as RscEntryLexicalField_44fe37237e0ebf4470c9990d8cb7b07e } from '@payloadcms/richtext-lexical/rsc'
import { LexicalDiffComponent as LexicalDiffComponent_44fe37237e0ebf4470c9990d8cb7b07e } from '@payloadcms/richtext-lexical/rsc'
import { HorizontalRuleFeatureClient as HorizontalRuleFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { InlineToolbarFeatureClient as InlineToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { FixedToolbarFeatureClient as FixedToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { HeadingFeatureClient as HeadingFeatureClient_e70f5e05f09f93e00b997edb1ef0c864 } from '@payloadcms/richtext-lexical/client'
import { VariantOptionsSelector as VariantOptionsSelector_572cb5d65f4780487101f065ca8b9c9d } from '@/collections/Variants/components/VariantOptionsSelector/index.tsx'
import { Qty as Qty_620587a6d4cf03e140f24df11a13ead5 } from '@/collections/BillingItems/Qty.tsx'
import { QueryPresetsAccessCell as QueryPresetsAccessCell_2b8867833a34864a02ddf429b0728a40 } from '@payloadcms/next/client'
import { QueryPresetsWhereCell as QueryPresetsWhereCell_2b8867833a34864a02ddf429b0728a40 } from '@payloadcms/next/client'
import { QueryPresetsWhereField as QueryPresetsWhereField_2b8867833a34864a02ddf429b0728a40 } from '@payloadcms/next/client'
import { QueryPresetsColumnsCell as QueryPresetsColumnsCell_2b8867833a34864a02ddf429b0728a40 } from '@payloadcms/next/client'
import { QueryPresetsColumnField as QueryPresetsColumnField_2b8867833a34864a02ddf429b0728a40 } from '@payloadcms/next/client'
import { QueryPresetsGroupByCell as QueryPresetsGroupByCell_2b8867833a34864a02ddf429b0728a40 } from '@payloadcms/next/client'
import { QueryPresetsGroupByField as QueryPresetsGroupByField_2b8867833a34864a02ddf429b0728a40 } from '@payloadcms/next/client'
import { TenantSelector as TenantSelector_d6d5f193a167989e2ee7d14202901e62 } from '@payloadcms/plugin-multi-tenant/rsc'
import { TenantSelectionProvider as TenantSelectionProvider_d6d5f193a167989e2ee7d14202901e62 } from '@payloadcms/plugin-multi-tenant/rsc'
import { CollectionCards as CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1 } from '@payloadcms/next/rsc'

export const importMap = {
  "@payloadcms/plugin-multi-tenant/client#TenantField": TenantField_1d0591e3cf4f332c83a86da13a0de59a,
  "@payloadcms/plugin-multi-tenant/client#AssignTenantFieldTrigger": AssignTenantFieldTrigger_1d0591e3cf4f332c83a86da13a0de59a,
  "@payloadcms/plugin-multi-tenant/client#WatchTenantCollection": WatchTenantCollection_1d0591e3cf4f332c83a86da13a0de59a,
  "@payloadcms/next/client#SlugField": SlugField_2b8867833a34864a02ddf429b0728a40,
  "@/collections/Billing/components/SyncBillingItems.tsx#SyncBillingItems": SyncBillingItems_d530617488782a14e722693740dffa85,
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalCell": RscEntryLexicalCell_44fe37237e0ebf4470c9990d8cb7b07e,
  "@payloadcms/richtext-lexical/rsc#RscEntryLexicalField": RscEntryLexicalField_44fe37237e0ebf4470c9990d8cb7b07e,
  "@payloadcms/richtext-lexical/rsc#LexicalDiffComponent": LexicalDiffComponent_44fe37237e0ebf4470c9990d8cb7b07e,
  "@payloadcms/richtext-lexical/client#HorizontalRuleFeatureClient": HorizontalRuleFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#InlineToolbarFeatureClient": InlineToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#FixedToolbarFeatureClient": FixedToolbarFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@payloadcms/richtext-lexical/client#HeadingFeatureClient": HeadingFeatureClient_e70f5e05f09f93e00b997edb1ef0c864,
  "@/collections/Variants/components/VariantOptionsSelector/index.tsx#VariantOptionsSelector": VariantOptionsSelector_572cb5d65f4780487101f065ca8b9c9d,
  "@/collections/BillingItems/Qty.tsx#Qty": Qty_620587a6d4cf03e140f24df11a13ead5,
  "@payloadcms/next/client#QueryPresetsAccessCell": QueryPresetsAccessCell_2b8867833a34864a02ddf429b0728a40,
  "@payloadcms/next/client#QueryPresetsWhereCell": QueryPresetsWhereCell_2b8867833a34864a02ddf429b0728a40,
  "@payloadcms/next/client#QueryPresetsWhereField": QueryPresetsWhereField_2b8867833a34864a02ddf429b0728a40,
  "@payloadcms/next/client#QueryPresetsColumnsCell": QueryPresetsColumnsCell_2b8867833a34864a02ddf429b0728a40,
  "@payloadcms/next/client#QueryPresetsColumnField": QueryPresetsColumnField_2b8867833a34864a02ddf429b0728a40,
  "@payloadcms/next/client#QueryPresetsGroupByCell": QueryPresetsGroupByCell_2b8867833a34864a02ddf429b0728a40,
  "@payloadcms/next/client#QueryPresetsGroupByField": QueryPresetsGroupByField_2b8867833a34864a02ddf429b0728a40,
  "@payloadcms/plugin-multi-tenant/rsc#TenantSelector": TenantSelector_d6d5f193a167989e2ee7d14202901e62,
  "@payloadcms/plugin-multi-tenant/rsc#TenantSelectionProvider": TenantSelectionProvider_d6d5f193a167989e2ee7d14202901e62,
  "@payloadcms/next/rsc#CollectionCards": CollectionCards_f9c02e79a4aed9a3924487c0cd4cafb1
}
