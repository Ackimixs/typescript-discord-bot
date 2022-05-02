export const validDate = (date: string) => {

    let day = date.split('/')[0] || date
    let year = date.split('/')[2] || new Date().getFullYear().toString()
    let month = date.split('/')[1] || new Date().getMonth().toString()

    if (parseInt(day,10) < new Date().getDate()){
        month = (parseInt(month,10)+1).toString()
    }
    if (month === '12') {
        month = '0'
        year = (parseInt(year,10)+1).toString()
    }

    console.log(day, month, year);

    if (day.length > 2 || month.length > 2 || year.length !== 4) return null
    if ( parseInt(day, 10) < 0 && parseInt(day, 10) >= 31 && parseInt(month, 10) < 0 && parseInt(month, 10) >= 12) return null

    if (day.length === 1) {
        day = "0" + day;
    }
    if (month.length === 1) {
        month = "0" + month;
    }

    return new Date(parseInt(year, 10), parseInt(month, 10)-1, parseInt(day, 10))
};
