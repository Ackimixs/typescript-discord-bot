export const validDate = (date: string) => {

    let day = date.split('/')[0] || date
    let year = date.split('/')[2] || new Date().getFullYear().toString()

    let month = date.split('/')[1] ||
        parseInt(day,10) > new Date().getDate() ? (new Date().getMonth()+1).toString() : (new Date().getMonth()+2).toString()
    //TODO detect if it's new year


    if (day.length >= 2 && month.length >= 2 && year.length !== 4) return null
    if ( parseInt(day, 10) < 0 && parseInt(day, 10) >= 31 && parseInt(month, 10) < 0 && parseInt(month, 10) >= 12) return null


    if (day.length === 1) {
        day = "0" + day;
    }
    if (month.length === 1) {
        month = "0" + month;
    }

    return new Date(parseInt(year, 10), parseInt(month, 10)-1, parseInt(day, 10))
};
