// Purpose:
// Add event listeners to the user and event pages to handle user status updates, user deletions, event deletions, and event updates
// Dropdown behavior for user status selection
// Set minimum date and time for event creation
// Display success message after user deletion

// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Call functions to add event listeners
  addDropDownItemsBehavior();
  addActiveEffectToLinks();
  userSubmitButton();
  userCancelButton();
  userDeleteButton();
  displayUserDeletionSuccessMessage();
  displayEventDeletionSuccessMessage();
  eventDeleteButton();
  eventCancelButton();
  eventSubmitButton();
  setMinTimeAndDate();
  eventCreationButton();
  displayEventCreationSuccessMessage();

  // Initialize statusValue variable
  let statusValue = '';

  // User page dropdown behavior
  function addDropDownItemsBehavior() {
    // Get dropdown items and button
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const dropdownButton = document.getElementById('dropdownMenuButton');

    // Add event listener to each dropdown item
    dropdownItems.forEach(function (item) {
      item.addEventListener('click', function () {
        // Get the selected value
        const newValue = item.getAttribute('data-value');

        // Update dropdown button text and style
        dropdownButton.textContent = newValue;
        dropdownButton.style.color = 'black';

        // Update statusValue variable
        statusValue = newValue.toLowerCase();

        // Update button background color based on selected status
        if (newValue === 'PENDING') {
          dropdownButton.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
        } else if (newValue === 'ACTIVE') {
          dropdownButton.style.backgroundColor = 'rgba(0, 128, 0, 0.5)';
        } else {
          dropdownButton.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
        }
      });
    });
  }

  // Add active class to the current page link
  function addActiveEffectToLinks() {
    // Get the current page path
    const currentPath = window.location.pathname;
    // Get all nav links
    const links = document.querySelectorAll('.nav-link');

    // Add active class to the current page link
    links.forEach((link) => {
      // Check if the link href matches the current path
      if (link.getAttribute('href') === currentPath) {
        // Add active class to the link
        link.classList.add('active-link');
      }
    });
  }

  // User page submit button behavior
  function userSubmitButton() {
    // Get the submit button
    const userSubmitButton = document.getElementById('user-submit_btn');
    // If the submit button exists
    if (userSubmitButton) {
      // Get the user ID from the button
      const userId = userSubmitButton.getAttribute('data-user-id');
      // Add an event listener to the submit button
      userSubmitButton.addEventListener('click', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Update the user status in the database
        async function updateUserStatus(userId, statusValue) {
          try {
            // Send a PATCH request to update the user status
            await fetch(`/admin/users/${userId}/status`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ status: statusValue }),
            });
          } catch (error) {
            console.error('Error:', error);
          }
        }
        // Call the updateUserStatus function and reload the page after a short
        updateUserStatus(userId, statusValue);
        // Wait for the status to be updated before reloading the page
        setTimeout(() => {
          location.reload();
        }, 50);
      });
    }
  }

  // User page cancel button behavior
  function userCancelButton() {
    // Get the cancel button
    const userCancelButton = document.getElementById('user-cancel_btn');
    // If the cancel button exists add an event listener
    if (userCancelButton) {
      userCancelButton.addEventListener('click', function (event) {
        event.preventDefault();
        // Go back to the previous page
        window.history.back();
      });
    }
  }

  // User page delete button behavior
  function userDeleteButton() {
    // Get the delete button
    const userDeleteButton = document.getElementById('user-delete_btn');
    // If the delete button exists add an event listener
    if (userDeleteButton) {
      // Get the user ID from the button
      const userId = userDeleteButton.getAttribute('data-user-id');
      //  Add an event listener to the delete button
      userDeleteButton.addEventListener('click', function (event) {
        event.preventDefault();
        // Confirm the user deletion
        async function deleteUser(userId) {
          try {
            // Send a DELETE request to delete the user
            const response = await fetch(`/admin/users/${userId}/delete`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            // If the request is successful, display a success message and redirect to the users list
            if (response.ok) {
              localStorage.setItem(
                'userDeletionSuccessMessage',
                'Utilisateur supprimé avec succès'
              );
              window.location.href = '/admin/users';
            } else {
              // If the request fails, display an error message
              const data = await response.json();
              throw new Error(data.message || 'Failed to delete user');
            }
          } catch (error) {
            // Log and display the error message
            console.error('Error:', error);
            alert('Failed to delete user.');
          }
        }
        // Call the deleteUser function
        deleteUser(userId);
      });
    }
  }

  // Display success message after user deletion
  function displayUserDeletionSuccessMessage() {
    // Get the success message from localStorage
    const message = localStorage.getItem('userDeletionSuccessMessage');
    // If the message exists
    if (message) {
      // Get the message container
      const messageContainer = document.getElementById(
        'user-message-container'
      );
      // If the message container exists
      if (messageContainer) {
        // Display the message
        messageContainer.style.display = 'block';
        messageContainer.querySelector('p').textContent = message;
        // Remove the message from localStorage after displaying it
        localStorage.removeItem('userDeletionSuccessMessage');
      }
    }
  }

  // Event page creation button behavior
  function eventCreationButton() {
    const eventCreationButton = document.getElementById('event-creation_btn');
    if (eventCreationButton) {
      eventCreationButton.addEventListener('click', function () {
        localStorage.setItem(
          'eventCreationSuccessMessage',
          'Événement créé avec succès'
        );
      });
    }
  }

  // Display success message after event creation
  function displayEventCreationSuccessMessage() {
    // Get the success message from localStorage
    const message = localStorage.getItem('eventCreationSuccessMessage');
    // If the message exists
    if (message) {
      // Get the message container
      const messageContainer = document.getElementById(
        'eventCreation-message-container'
      );
      // If the message container exists
      if (messageContainer) {
        // Display the message
        messageContainer.style.display = 'block';
        messageContainer.querySelector('p').textContent = message;
        // Remove the message from localStorage after displaying it
        localStorage.removeItem('eventCreationSuccessMessage');
      }
    }
  }

  // Events page delete button behavior
  function eventDeleteButton() {
    // Get all event delete buttons
    const eventDeleteButtons = document.querySelectorAll('.event-delete_btn');
    const confirmDeleteButton = document.getElementById('confirmDeleteButton');
    // If the event delete buttons exist
    if (eventDeleteButtons) {
      eventDeleteButtons.forEach((eventButton) => {
        // Get the event ID from the button
        const eventId = eventButton.getAttribute('data-event-id');
        eventButton.addEventListener('click', function (event) {
          event.preventDefault();
          // Set the event ID for the confirm delete button
          confirmDeleteButton.setAttribute('data-event-id', eventId);
        });
      });
      // Add an event listener to the confirm delete button
      if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener('click', async function () {
          // Get the event ID from the button
          const eventId = this.getAttribute('data-event-id');
          // Confirm the event deletion via the deleteEvent function
          async function deleteEvent(eventId) {
            try {
              // Send a DELETE request to delete the event
              const response = await fetch(`/admin/events/${eventId}/delete`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              // If the request is successful, redirect to the events list
              if (response.ok) {
                localStorage.setItem(
                  'eventDeletionSuccessMessage',
                  'Événement supprimé avec succès'
                );
                window.location.href = '/admin/events'; // Redirect to events list
              } else {
                // If the request fails, display an error message
                const data = await response.json();
                throw new Error(data.message || 'Failed to delete event');
              }
            } catch (error) {
              // Log and display the error message
              console.error('Error:', error);
              alert('Failed to delete event.');
            }
          }
          // Call the deleteEvent function
          deleteEvent(eventId);
        });
      }
    }
  }

  // Display success message after event deletion
  function displayEventDeletionSuccessMessage() {
    // Get the success message from localStorage
    const message = localStorage.getItem('eventDeletionSuccessMessage');
    // If the message exists
    if (message) {
      // Get the message container
      const messageContainer = document.getElementById(
        'eventDeletion-message-container'
      );
      // If the message container exists
      if (messageContainer) {
        // Display the message
        messageContainer.style.display = 'block';
        messageContainer.querySelector('p').textContent = message;
        // Remove the message from localStorage after displaying it
        localStorage.removeItem('eventDeletionSuccessMessage');
      }
    }
  }

  // Event page cancel button behavior
  function eventCancelButton() {
    // Get the cancel button by ID
    const eventCancelButton = document.getElementById('createEvent-cancel_btn');
    if (eventCancelButton) {
      // Add an event listener to the cancel button
      eventCancelButton.addEventListener('click', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Go back to the previous page
        window.history.back();
      });
    }
  }

  // Event page update button behavior
  function eventSubmitButton() {
    // Get the event submit button and the form by ID
    const eventUpdateButton = document.getElementById('event-update_btn');
    const form = document.getElementById('event-form');
    // If the event submit button exists
    if (eventUpdateButton) {
      // Add an event listener to the submit button
      eventUpdateButton.addEventListener('click', async (event) => {
        event.preventDefault();
        // Create a new FormData object from the form
        const formData = new FormData(form);
        // Get the event ID from the button
        const eventId = eventUpdateButton.getAttribute('data-event-id');

        try {
          // Send a PATCH request to update the event
          const response = await fetch(`/admin/events/${eventId}/update`, {
            method: 'PATCH',
            body: formData,
          });
          // If the request is successful, redirect to the events list
          if (response.ok) {
            window.location.href = '/admin/events'; // Redirect to events list
          } else {
            // If the request fails, display an error message
            const responseData = await response.json();
            throw new Error(responseData.message || 'Failed to update event');
          }
        } catch (error) {
          // Log and display the error message
          console.error('Error:', error);
          alert('Failed to update event.');
        }
      });
    }
  }

  // Set minimum date and time for event creation
  function setMinTimeAndDate() {
    // Get today's date and time
    const today = new Date();
    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = today.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Ensure 24-hour format
    });

    // Set the minimum date and time for the event creation form
    const dateElement = document.getElementById('date');
    const timeInput = document.getElementById('time');

    // If the date input exists, set the minimum date and add an event listener
    if (dateElement) {
      // Set the minimum date to today
      dateElement.setAttribute('min', currentDate);
      // Add an event listener to the date input
      dateElement.addEventListener('change', function () {
        // Check if the selected date is today
        if (this.value === todayDate) {
          // If the selected date is today, restrict the time to the current time or later
          timeInput.setAttribute('min', currentTime);
        } else {
          // If the selected date is in the future, remove the time restriction
          timeInput.removeAttribute('min');
        }
      });
    }
  }
});
