import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Neues Investmentboard',
  description: 'Projekt-Dokumentation für das Investment-Board',
  base: '/',
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Übersicht', link: '/uebersicht' },
      { text: 'Datenmodell', link: '/datenmodell/' },
      { text: 'Testing', link: '/testing/' }
    ],

    sidebar: [
      {
        text: 'Projekt-Übersicht',
        items: [
          { text: '10-Stufen-Plan', link: '/uebersicht' },
          { text: 'Backend-Dokumentation', link: '/backend-doku' }
        ]
      },
      {
        text: 'Datenmodell',
        items: [
          { text: 'Datenmodell Design', link: '/datenmodell/' },
          { text: 'ER-Diagramm', link: '/datenmodell/er-diagramm' },
          { text: 'Status', link: '/datenmodell/status' }
        ]
      },
      {
        text: 'Testing & Qualität',
        items: [
          { text: 'Test-Status', link: '/testing/' },
          { text: 'Problemlösungen', link: '/testing/problem-loesungen' }
        ]
      },
      {
        text: 'Weitere Bereiche',
        items: [
          { text: 'Technologieauswahl', link: '/technologie' },
          { text: 'UI/UX Design', link: '/ui-ux' },
          { text: 'Architektur', link: '/architektur' }
        ]
      }
    ]
  }
})
