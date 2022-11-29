export const dateFormatter = (inputDate) => {
    let convertedDate = new Date(inputDate);
    let date, month, year;
  
    date = convertedDate.getDate();
    month = convertedDate.getMonth() + 1;
    year = convertedDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${date}/${month}/${year}`;
}