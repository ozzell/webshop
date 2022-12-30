import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export const SANITY_PROJECT_ID = 'omcgv00h'
export const SANITY_DATA_SET = 'production'

export default defineConfig({
  name: 'default',
  title: 'ecommerce',

  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATA_SET,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes
  }
})
