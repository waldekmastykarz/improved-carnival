import { getBuddyInfo, saveBuddyInfo } from '../graph/buddy.js';
import { getMyColleagues } from '../graph/colleagues.js';
import { getUserProfile } from '../graph/user.js';

export async function loadBuddy() {
  const buddyInfo = await getBuddyInfo();
  if (!buddyInfo) {
    const buddySection = document.getElementById('buddy');
    buddySection.querySelector('.loading').style = 'display: none';
    buddySection.querySelector('.noContent').style = 'display: block';
    buddySection.querySelector('button').addEventListener('click', findBuddy);
    return;
  }
}

export async function findBuddy() {
  const buddySection = document.getElementById('buddy');
  buddySection.querySelector('p').style = 'display: none';
  const loading = buddySection.querySelector('.loading');
  loading.innerHTML = 'Matching buddies...';
  loading.style = 'display: block';
  const button = buddySection.querySelector('button');
  button.disabled = true;

  const fans = await getMyColleagues();
  const me = await getUserProfile();
  const fansInMyLocation = fans.myColleagues.value.filter(c => c.country === me.country);

  const numFans = fansInMyLocation.length;
  if (numFans === 0) {
    loading.innerHTML = `Sorry, didn't find anyone near you. Call someone on Teams maybe?`;
    button.style = 'display: none';
    return false;
  }

  const buddy = fansInMyLocation[Math.floor(Math.random() * numFans)];
  await saveBuddyInfo(buddy);
  
  return false;
}