function IconBase({ children, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function WhatsappIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6.5 17.5 5 20l2.6-1.4a7.6 7.6 0 1 0-2.9-3Z" />
      <path d="M9 9.6c0 3 2.4 5.4 5.4 5.4.6 0 1-.5.9-1l-.3-1.2a.8.8 0 0 0-.9-.6l-1 .2a4.2 4.2 0 0 1-2.5-2.5l.2-1a.8.8 0 0 0-.6-.9L9 8c-.5-.1-1 .3-1 .9Z" />
    </IconBase>
  );
}

export function InstagramIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.3" cy="7.7" r="0.6" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function MailIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7 12 12.5 19.5 7" />
    </IconBase>
  );
}

export function SunIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
    </IconBase>
  );
}

export function MoonIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
    </IconBase>
  );
}
