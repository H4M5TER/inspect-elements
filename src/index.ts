import { Context, Schema } from 'koishi'
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
      return inspect(elements, { depth: Infinity })
    })
}
