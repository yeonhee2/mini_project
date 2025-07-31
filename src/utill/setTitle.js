export const setPageTitle = (title) => {
  const titleElement = document.getElementsByTagName('title')[0];
  titleElement.innerHTML = title;
}