export const truncateText = (title: string, maxLength: number) => {
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + "...";
  }
  return title;
};

export const formattedDate = (date: string) => new Date(date).toLocaleString();
