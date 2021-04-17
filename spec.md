# pet_services
Application to view employee calendars, and book appointments for various pet services including grooming.

## User Story

```md
AS A pet owner
I WANT to view employee calendars with available timeslots
SO THAT I can schedule groomings, dog walks, and appointments
```

## Acceptance Criteria

```md
GIVEN an online application
WHEN I visit the site for the first time
THEN I am presented with the homepage, which prompts login explaining why login is necessary, and an explanation about the company and services
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see my calendar, and links to my calendar, the services, and employee calendars
WHEN I click on the services option
THEN I am taken to the homepage and presented with a list of services
WHEN I click on a service
THEN I am presented with the employee's calendar for that service, displaying available timeslots
WHEN I select a timeslot, i am presented with a form containing pet name, afraid of anything, and misc info
THEN the appointment is saved and the employee calendar is updated to display the appointment, the pet’s name, and the date created
WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with my calendar showing appointments I have already created and the option to add a new reservation
WHEN I click on the button to add a new reservation
THEN I am prompted to select the service
WHEN I click on the service to make a new appointment
THEN the calendar for the corresponding employee displays available timeslots
WHEN I click on one of my exhisting appointments
THEN I am able to delete or update my pets appointment and taken back to an updated dashboard
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the page for more than a set time
THEN I am automatically signed out of the site
