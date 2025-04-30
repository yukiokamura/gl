import { config } from './config'
export class Loader {
  constructor() {}

  async load(name: string) {
    const script = config.scripts.find((script) => script.name === name)

    if (!script) {
      throw new Error(`Script ${name} not found`)
    }
    console.log(script.path, config, name)
    const module = await import(script.path)
    return module.default
  }
}
