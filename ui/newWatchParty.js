import { createNewEvent } from '../graph/newWatchParty.js';
import { getUserProfile } from '../graph/user.js';

export async function loadWatchPartyForm() {
 
    document.querySelector('#newWatchParty .ms-Grid').style = 'display: none';
    document.querySelector('#newWatchParty .createButton').style = 'display: none';
    document.querySelector('#newWatchParty .cancelButton').style = 'display: none';
    document.querySelector('#newWatchParty .button').addEventListener('click', GetWatchPartyForm);
    return;
    
    }
export async function GetWatchPartyForm() {
    
    document.querySelector('#newWatchParty .button').style = 'display: none';
    document.querySelector('#newWatchParty .ms-Grid').style = 'display: block';
    document.querySelector('#newWatchParty .createButton').style = 'display: block';
    document.querySelector('#newWatchParty .cancelButton').style = 'display: block';
    document.querySelector('#newWatchParty .createButton').addEventListener('click', createNewEvent);
    document.querySelector('#newWatchParty .cancelButton').addEventListener('click', refresh);

    return;
    
  }

export async function refresh(){
    document.querySelector('#newWatchParty .ms-Grid').style = 'display: none';
    document.querySelector('#newWatchParty .createButton').style = 'display: none';
    document.querySelector('#newWatchParty .cancelButton').style = 'display: none';
    document.querySelector('#newWatchParty .button').style = 'display: block';
    return;
}
