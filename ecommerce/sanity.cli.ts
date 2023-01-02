import { defineCliConfig } from 'sanity/cli'

/* There may be problem reading the env variables here */
export default defineCliConfig({
  api: {
    projectId: import.meta.env.SANITY_STUDIO_API_PROJECT_ID,
    dataset:import.meta.env.SANITY_STUDIO_API_DATASET
  }
})
