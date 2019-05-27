function stripLeadingSlash(pathname: string): string {
  return pathname.replace(/^\/+/g, '');
}

function paddedDate(date: Date): string {
  return date
    .getDate()
    .toString()
    .padStart(2, '0');
}

function paddedMonth(date: Date): string {
  const month = date.getMonth() + 1;
  return month.toString().padStart(2, '0');
}

function convertToHumanDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  return `${date.getFullYear()}-${paddedMonth(date)}-${paddedDate(date)}`;
}

function appendToPage(target: string, html: Node): void {
  const targetNode = document.querySelector(target);
  targetNode!.appendChild(html);
}

function appendToPageAfterElement(target: string, html: Node): void {
  const targetNode = document.getElementsByClassName(target);
  targetNode[0]!.parentNode!.insertBefore(html, targetNode[0]!.nextSibling);
}

export {
  appendToPage,
  appendToPageAfterElement,
  paddedDate,
  paddedMonth,
  stripLeadingSlash,
  convertToHumanDate,
};
