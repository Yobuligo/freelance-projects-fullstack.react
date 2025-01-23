export const copyHTMLToClipboard = async (text: string) => {
  const blob = new Blob([text], { type: "text/html" });
  const clipboardItem = new ClipboardItem({ "text/html": blob });
  await navigator.clipboard.write([clipboardItem]);
};
