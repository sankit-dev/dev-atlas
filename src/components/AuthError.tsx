import { Wrap } from './PageShell'

const errorMessages: Record<string, string> = {
  access_denied: 'The sign-in request was cancelled before it finished.',
  email_not_found:
    'That account did not share an email address, so we could not create your profile.',
  email_does_not_match:
    'That email address does not match the account you are already signed in with.',
  unable_to_create_user: 'We could not create your account. Please try again.',
  unable_to_create_session: 'We could not start your session. Please try again.',
  unable_to_get_user_info:
    'We could not read your profile from the sign-in provider.',
  account_already_linked_to_different_user:
    'That account is already linked to a different user.',
  account_not_linked: 'That account is not linked to your profile yet.',
  invalid_code: 'The sign-in link is invalid or has expired.',
  state_mismatch: 'Your sign-in session expired. Please start again.',
  state_not_found: 'We could not find your sign-in session. Please start again.',
  no_code: 'The provider did not return a sign-in code. Please try again.',
  invalid_callback_request: 'The sign-in request was invalid. Please start again.',
  internal_server_error: 'Something went wrong on our side. Please try again.',
}

function getErrorCode() {
  if (typeof window === 'undefined') return null
  return new URLSearchParams(window.location.search).get('error')
}

export function AuthError() {
  const code = getErrorCode()
  const message =
    (code ? errorMessages[code] : undefined) ??
    'We could not complete your sign-in. Please try again.'

  return (
    <Wrap>
      <section className="auth-error">
        <p className="kicker">Sign-in problem</p>
        <h1 className="auth-error__title">We couldn’t sign you in</h1>
        <p className="auth-error__message">{message}</p>
        {code ? (
          <p className="auth-error__code">
            Error code: <code>{code}</code>
          </p>
        ) : null}
        <div className="auth-error__actions">
          <a className="auth-error__primary" href="/">
            Back to home
          </a>
          <a className="auth-error__secondary" href="/library">
            Browse the library
          </a>
        </div>
      </section>
    </Wrap>
  )
}
