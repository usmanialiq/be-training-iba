export function emailAddressSanitizer(
  email: string | string[],
): string | string[] {
  if (typeof email === 'string') {
    if (email.includes('test')) {
      return 'hello@workhall.co';
    }
    return email
      .trim()
      .replace(/[^a-zA-Z0-9@.\-_]/g, '')
      .toLowerCase();
  }
  if (Array.isArray(email)) {
    return email
      .filter((each: string) => !each.includes('test'))
      .map((each: string) =>
        each
          .trim()
          .replace(/[^a-zA-Z0-9@.\-_]/g, '')
          .toLowerCase(),
      );
  }
}
