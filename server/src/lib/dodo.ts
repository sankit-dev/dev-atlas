import DodoPayments from 'dodopayments'
import { env } from '../config/env.js'

// `env.dodoApiKey` is an empty string when unset, which the SDK accepts (it only
// rejects `undefined`). This keeps the server bootable without Dodo configured
// while still verifying webhook signatures, which do not need the API key.
export const dodo = new DodoPayments({
  bearerToken: env.dodoApiKey,
  environment: env.dodoEnvironment,
  webhookKey: env.dodoWebhookKey || null,
})
