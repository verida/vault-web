import { DataAction } from "./DataAction"

/**
 * @deprecated
 */
export class Message extends DataAction {
  async accept() {
    return {
      success: true,
      errors: {},
    }
  }

  decline() {
    return {
      success: true,
      errors: {},
    }
  }

  async metadata() {
    return {}
  }
}
