
import { refresh } from '../ui/newWatchParty.js';
import graphClient from './graphClient.js';

export async function createNewEvent() {
    const user = JSON.parse(sessionStorage.getItem('graphUser'));
  
    // Get the user's input
    const subject = document.getElementById('ev-subject').value;
    const attendees = document.getElementById('ev-attendees').value;
    const start = document.getElementById('ev-start').value;
    const end = document.getElementById('ev-end').value;
    const body = document.getElementById('ev-body').value;
    // const attendees = document.querySelector('mgt-people-picker').selectedPeople.push(personObject);
    
    // Require at least subject, start, and end
    // if (!subject || !start || !end) {
    //   updatePage(Views.error, {
    //     message: 'Please provide a subject, start, and end.'
    //   });
    //   return;
    // }
  
    // Build the JSON payload of the event
    let newEvent = {
      subject: subject,
      start: {
        dateTime: start,
        timeZone: 'UTC'
      },
      end: {
        dateTime: end,
        timeZone: 'UTC'
      },
      isOnlineMeeting: true,
      onlineMeetingProvider: "teamsForBusiness",
      categories:["Red category"]
    };
  
    if (attendees)
    {
      const attendeeArray = attendees.split(';');
      newEvent.attendees = [];
  
      for (const attendee of attendeeArray) {
        if (attendee.length > 0) {
          newEvent.attendees.push({
            type: 'required',
            emailAddress: {
              address: attendee
            }
          });
        }
      }
    }
  
    if (body)
    {
      newEvent.body = {
        contentType: 'text',
        content: body
      };
    }
  
    
      // POST the JSON to the /me/events endpoint
      await graphClient
        .api('groups/15e4817c-1662-426f-a1c3-0a275424b851/events')
        .post(newEvent);
  
      
      refresh();
  }
