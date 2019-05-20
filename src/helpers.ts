function stripLeadingSlash(pathname: string): string {
  return pathname.replace(/^\/+/g, '');
}

function convertToHumanDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function appendToPage(target: string, html: Node): void {
  const targetNode = document.querySelector(target);
  targetNode!.appendChild(html);
}

function appendToPageAfterElement(target: string, html: Node): void {
  const targetNode = document.getElementsByClassName(target);
  targetNode[0]!.parentNode!.insertBefore(
    html,
    targetNode[0]!.nextSibling,
  );
}

export { appendToPage, appendToPageAfterElement, stripLeadingSlash, convertToHumanDate };
