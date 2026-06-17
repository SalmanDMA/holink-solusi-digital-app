import toolsData from '~/data/tools.json'
import type { Tool } from '~/types/tool'

export const useTools = () => {
 const tools = toolsData as Tool[]

 const getToolBySlug = (slug: string): Tool | undefined => {
  return tools.find((tool: Tool) => tool.slug === slug)
 }

 return {
  tools,
  getToolBySlug,
 }
}