type IconProps = {
  size?: number
}

export function InstagramIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

export function FacebookIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 21v-7.2h2.5l.4-2.9h-2.9V9.1c0-.84.24-1.41 1.45-1.41H17.5V5.1c-.28-.04-1.24-.12-2.35-.12-2.33 0-3.92 1.41-3.92 4v2.23H8.7v2.9h2.53V21h3.27Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function YoutubeIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="m10.3 9.2 4.6 2.8-4.6 2.8V9.2Z" fill="currentColor" />
    </svg>
  )
}

export function GoogleIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.74 2.98-4.31 2.98-7.36Z" fill="#4285F4" />
      <path d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.59A10 10 0 0 0 12 22Z" fill="#34A853" />
      <path d="M6.41 13.92a6 6 0 0 1 0-3.84V7.5H3.06a10 10 0 0 0 0 9l3.35-2.58Z" fill="#FBBC05" />
      <path d="M12 6.06c1.47 0 2.78.5 3.82 1.49l2.86-2.86A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.94 5.5l3.35 2.58C7.2 7.82 9.4 6.06 12 6.06Z" fill="#EA4335" />
    </svg>
  )
}

export function AppleIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.7 12.8c0-2.1 1.7-3.1 1.8-3.2-1-1.5-2.6-1.7-3.2-1.7-1.36-.14-2.66.8-3.35.8-.7 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.18-1.54 2.68-.39 6.64 1.1 8.81.73 1.06 1.6 2.25 2.74 2.21 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.14.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.32-3.5ZM14.5 6.3c.6-.73 1.01-1.74.9-2.75-.87.04-1.93.58-2.56 1.31-.56.64-1.05 1.67-.92 2.65.97.08 1.96-.49 2.58-1.21Z" />
    </svg>
  )
}
