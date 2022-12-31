// Display the current day at the top of the calendar
const currentDayElement = document.querySelector('#currentDay');
const currentDay = moment().format('MMMM Do YYYY, h:mm a');
currentDayElement.textContent = currentDay;


// Get all the time blocks
const timeBlocks = document.querySelectorAll('.time-block');

// Set the color of each time block based on whether it is in the past, present, or future
const currentHour = moment().hour();
timeBlocks.forEach(function(timeBlock) {
  const timeBlockHour = parseInt(timeBlock.querySelector('.hour').textContent.split(':')[0]);
  if (timeBlockHour < currentHour) {
    timeBlock.querySelector('.description').classList.add('past');
  } else if (timeBlockHour === currentHour) {
    timeBlock.querySelector('.description').classList.add('present');
  } else {
    timeBlock.querySelector('.description').classList.add('future');
  }
});

// Save events to local storage when the save button is clicked
const saveButtons = document.querySelectorAll('.saveBtn');
saveButtons.forEach(function(saveButton) {
  saveButton.addEventListener('click', function() {
    const timeBlock = saveButton.parentNode;
    const eventInput = timeBlock.querySelector('.description');
    const eventText = eventInput.value;
    const timeBlockHour = timeBlock.querySelector('.hour').textContent.split(':')[0];
    localStorage.setItem(timeBlockHour, eventText);
  });
});

// Load events from local storage when the page loads
timeBlocks.forEach(function(timeBlock) {
  const timeBlockHour = timeBlock.querySelector('.hour').textContent.split(':')[0];
  const eventText = localStorage.getItem(timeBlockHour);
  if (eventText) {
    timeBlock.querySelector('.description').value = eventText;
  }
});