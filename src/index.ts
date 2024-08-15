import { Context, h, Schema } from 'koishi'
import { inspect } from 'util'

export const name = 'inspect-elements'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.i18n.define('zh-CN', require('./locales/zh-CN'))
  ctx.command('inspect')
    .subcommand('elements', {})
    .action(({ session }) => {
      let { elements, quote } = session
      if (quote) elements = quote.elements
      const jsons = []
      elements = elements.map((element) => {
        if (element.type === 'json') {
          jsons.push(JSON.parse(element.attrs.data))
          element.attrs.data = `[JSON ${jsons.length}]`
        }
        return element
      })
      let result = inspect(elements, { depth: Infinity })
      if (jsons.length) {
        result += '\n\n' + jsons.map((data, index) => `[JSON ${index + 1}]: ${inspect(data, { depth: Infinity })}`).join('\n\n')
      }
      return h.text(result)
    })
}
