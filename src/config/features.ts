import { commonConfig } from "@/config/common"

// Basic feature flags for now
// But likely to stay as a separate global variable like this
export const featureFlags = {
  veridaAuth: {
    enabled: commonConfig.FEATURE_FLAG_VERIDA_AUTH_ENABLED,
    authorizedAppsUi: {
      enabled: commonConfig.FEATURE_FLAG_AUTHORIZED_APPS_ENABLED,
    },
  },
  inbox: {
    enabled: commonConfig.FEATURE_FLAG_INBOX_ENABLED,
  },
  data: {
    enabled: commonConfig.FEATURE_FLAG_DATA_ENABLED,
    db: {
      destroy: commonConfig.FEATURE_FLAG_DATA_DESTROY_DB_ENABLED,
    },
    record: {
      delete: commonConfig.FEATURE_FLAG_DATA_DELETE_RECORD_ENABLED,
    },
    displayTechnicalDatabases:
      commonConfig.FEATURE_FLAG_DATA_DISPLAY_TECHNICAL_DATABASES,
  },
  commandDialog: {
    enabled: commonConfig.FEATURE_FLAG_COMMAND_DIALOG_ENABLED,
  },
  assistant: {
    enabled: commonConfig.FEATURE_FLAG_AI_ASSISTANT_ENABLED,
    userPrompts: {
      enabled: commonConfig.FEATURE_FLAG_AI_ASSISTANT_USER_PROMPTS_ENABLED,
    },
    config: {
      // Temporaily deprecated for the new agent but may come back later
      enabled: false,
      // enabled: commonConfig.FEATURE_FLAG_AI_ASSISTANT_PROMPT_CONFIG_ENABLED,
    },
  },
  dataConnections: {
    enabled: commonConfig.FEATURE_FLAG_DATA_CONNECTIONS_ENABLED,
    logs: {
      enabled: commonConfig.FEATURE_FLAG_DATA_CONNECTIONS_LOGS_ENABLED,
      destroy: commonConfig.FEATURE_FLAG_DATA_CONNECTIONS_LOGS_DESTROY_ENABLED,
    },
  },
  requests: {
    enabled: commonConfig.FEATURE_FLAG_REQUESTS_ENABLED,
  },
}
