'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { ThemeProvider } from '@sanity/ui'
import { dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'

// A layman-friendly structure for the sidebar
const myStructure = (S) =>
  S.list()
    .title('My Portfolio Manager')
    .items([
      S.listItem()
        .title('Edit Author Profile')
        .child(S.documentTypeList('author').title('Author Profiles')),
      S.listItem()
        .title('Manage Books')
        .child(S.documentTypeList('book').title('Books')),
      S.listItem()
        .title('Manage Gallery')
        .child(S.documentTypeList('gallery').title('Gallery Photos')),
    ])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: myStructure
    }),
  ],
  studio: {
    components: {
      layout: (props) => (
        <ThemeProvider scheme="light">
          {props.renderDefault(props)}
        </ThemeProvider>
      )
    }
  }
})
