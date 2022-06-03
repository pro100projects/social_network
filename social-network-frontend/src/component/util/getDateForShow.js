const getDateForShow = (date) => {
    return ('' + date).length === 1 ? `0${date}` : date;
}

export default getDateForShow;