const isCurrentDay = (year, month, day) => {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();
    return currentYear === year && currentMonth === month && currentDay === day;
};

const isCurrentYear = (year) => {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    return currentYear === year;
};

const getMonthName = (month) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[month-1];
}

const timeUtil = {
    toPrintDate: (year, month, day) => {
        if (isCurrentDay(year, month, day)) {
            return "Today";
        }
        if (isCurrentYear(year)) {
            return getMonthName(month) + " " + day;
        }
        return `${year}/${month}/${day}`;
    },

    toPrintDateTime: (year, month, day, hour, minute) => {
        if (isCurrentDay(year, month, day)) {
            return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        }
        if (isCurrentYear(year)) {
            return getMonthName(month) + " " + day;
        }
        return `${year}/${month}/${day}`;
    },

    toPrintFullDate: (year, month, day) => {
        return `${year}/${month}/${day}`;
    },
}

export default timeUtil;