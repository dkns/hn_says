function stripLeadingSlash(pathname: string): string {
  return pathname.replace(/^\/+/g, '');
}

export { stripLeadingSlash };
