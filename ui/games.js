import { getUpcomingGames } from '../graph/games.js';
import { getSelectedUserId, getUser } from '../graph/user.js';

export async function loadGames() {

    document.querySelector('#games .loading').style = 'display: block';
    document.querySelector('#games .noContent').style = 'display: none';
    document.querySelector('#games mgt-agenda').events = [];

    const selectedUserId = getSelectedUserId();
    if (!selectedUserId) {
        document.querySelector('#games h2').innerHTML = 'Upcoming NBA games';
    } else {
        let selectedUser = await getUser(selectedUserId);
        document.querySelector('#games h2').innerHTML = `Upcoming NBA games`;
    }

    const myMeetings = await getUpcomingGames(selectedUserId);
    document.querySelector('#games mgt-agenda').events = myMeetings;
    document.querySelector('#games .loading').style = 'display: none';

    if (myMeetings.length === 0) {
        document.querySelector('#games .noContent').style = 'display: block';
        return;
    }
}

// Function to format the meeting time - needs to be global for access from
// the MGT template in index.html
window.timeRangeFromEvent = function (event) {

    if (event.isAllDay) {
        return 'ALL DAY';
    }

    let prettyPrintTimeFromDateTime = date => {
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutesStr + ' ' + ampm;
    };

    let start = prettyPrintTimeFromDateTime(new Date(event.start.dateTime));
    let end = prettyPrintTimeFromDateTime(new Date(event.end.dateTime));

    return start + ' - ' + end;
}

