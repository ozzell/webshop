import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'ecommerce',

  projectId: process.env.SANITY_PROJECT_ID ?? '',
  dataset: process.env.SANITY_DATA_SET ?? '',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes
  }
})
