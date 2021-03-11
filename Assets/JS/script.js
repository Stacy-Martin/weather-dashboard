
const dateDisplayEl = $('#date-display');

const todaysDate = moment().format('MMM DD, YYYY');
function displayDate() {
    dateDisplayEl.text(todaysDate);
}
displayDate()