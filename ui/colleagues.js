import { getMyColleagues } from '../graph/colleagues.js';

export async function loadColleagues() {
  const { myColleagues } = await getMyColleagues();
  document.querySelector('#colleagues .loading').style = 'display: none';

  const colleaguesList = document.querySelector('#colleagues ul');
  myColleagues.value.forEach(person => {
    const colleagueLi = document.createElement('li');

    const mgtPerson = document.createElement('mgt-person');
    mgtPerson.personDetails = person;
    // mgtPerson.line2Property = 'jobTitleAndDepartment';
    // mgtPerson.line3Property = 'localTime';
    mgtPerson.view = mgt.PersonViewType.threelines;

    colleagueLi.append(mgtPerson);
    colleaguesList.append(colleagueLi);
  });
}
