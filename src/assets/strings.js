const en = {
	Chatbot: {
		name: 'Chatbot',
	},
	CompareSchedule: {
		name: 'Compare Schedule',
	}, 
	Course: {
		name: 'Course',
		addTitle: 'Add Course',
		editTitle: 'Edit Course',
		description: 'Add all your courses from your school schedule',
		snackbarSuccess: 'Course successfully added',
		snackbarFailure: 'Invalid field(s), please review to add course',
		week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		courseCodePlaceholder: 'Course Code',
		courseCodeEmpty: 'Course Code cannot be empty.',
		timeEmpty: 'Please select a Start and End Time.',
		locationPlaceholder: 'Location',
		dayOfWeek: 'Day of Week',
		confirmButton: 'Confirm',
		cancelButton: 'Cancel',
		startTime: 'Start Time',
		endTime: 'End Time',
		cancel: 'Cancel',
	},
	Dashboard: {
		name: 'Dashboard',
		createSchedule: 'Create Schedule',
		fabSchool: 'Add School Schedule',
		fabFixedEvent: 'Add Fixed Event',
		fabNonFixedEvent: 'Add Non-Fixed Event',
		eventsDayTitle: 'Events of the Day',
		noEventsText: 'There\'s no events for the day.',
		create: 'Create'
	},
	FixedEvent: {
		name: 'Fixed Event',
		addTitle: 'Add Fixed Event',
		editTitle: 'Edit Fixed Event',
		description: 'Add your events, office hours, appointments, etc.',
		recurrence: ['None', 'Everyday', 'Weekly', 'Monthly'],
		cancel: 'Cancel',
		snackbarSuccess: 'Event successfully added',
		snackbarFailure: 'Invalid field(s), please review to add event',
		titleEmpty: 'Title cannot be empty.',
		datesTimesEmpty: 'Please select Dates and Times.',
		timesEmpty: 'Please select an End Date and Time.',
		alldayEmpty: 'Please select a Start and End Date.',
		allday: 'All-Day',
		start: 'Start',
		end: 'End',
		confirmButton: 'Confirm',
		cancelButton: 'Cancel',
		titlePlaceholder: 'Title',
		locationPlaceholder: 'Location',
		descriptionPlaceholder: 'Description',
	},
	Home: {
		name: 'Home',
		createdBy: 'Created by ',
		cdhStudio: 'CDH Studio',
	},
	NonFixedEvent: {
		name: 'Non-Fixed Event',
		addTitle: 'Add Non-Fixed Event',
		editTitle: 'Edit Non-Fixed Event',
		snackbarSuccess: 'Event successfully added',
		snackbarFailure: 'Invalid field(s), please review to add event',
		titleEmpty: 'Title cannot be empty.',
		durationEmpty: 'Please add a Duration.',
		specificDateEmpty: 'Please select a Start and End Date.',
		description: 'Add the events you would like Kalend to plan for you',
		titlePlaceholder: 'Title',
		availability: 'Availability',
		dates: 'Dates',
		week: 'This Week',
		specificDate: 'Specific Date Range',
		startDate: 'Start Date',
		confirmButton: 'Confirm',
		cancelButton: 'Cancel',
		low: 'Low',
		normal: 'Normal',
		high: 'High',
		duration: 'Duration',
		endDate: 'End Date',
		hours: 'hour(s)',
		minutes: 'minute(s)',
		splitDurationDate: 'Split duration over date range?',
		splitDurationWeek: 'Split duration over this week?',
		numberTimeDate: 'Number of times it will happen in date range',
		numberTimeWeek: 'Number of times it will happen this week',
		everyWeek: 'Every Week?',
		priorityLevel: 'Priority Level',
		details: 'Details',
		locationPlaceholder: 'Location',
		descriptionPlaceholder: 'Description',
	},
	ReviewEvent: {
		name: 'Review Events',
		title: 'Create a Schedule',
		allDay: 'All-Day',
		timeWeek: 'times/week',
		week: 'Week',
		error: 'Error',
		noEvent: 'You need to create events in order to generate a schedule',
		courseTitle: 'School Schedule',
		noCourse: 'No School Schedule or Courses added',
		fixedTitle: 'Fixed Events',
		noFixed: 'No Fixed Events added',
		nonFixedTitle: 'Non-Fixed Events',
		noNonFixed: 'No Non-Fixed Events added',
		ok: 'Ok',
		low: 'Low',
		normal: 'Normal',
		high: 'High',
	},
	ScheduleCreation: {
		name: 'Schedule Creation',
		error: 'Error',
		ok: 'Ok',
		cancel: 'Cancel',
		dialogTitle: 'Creating your Schedule',
		dialogDescription: 'Our AI is now perfecting multiple schedules for you',
		backAlertTitle: 'Stopping Creation',
		backAlertDescription: 'The schedules will stop being generated if you proceed. Where do you want to go?',
	},
	ScheduleSelection: {
		name: 'Schedule Selection',
		title: 'Schedule Selection',
		weekLetters: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
		cancel: 'Cancel',
		backAlertTitle: 'Discarding Selection',
		backAlertDescription: 'The created schedules will be deleted if you proceed. Where do you want to go?',
		description: 'Below you will find schedules of the current week created by the application. Please select the one you prefer.',
		courses: 'Courses',
		fixedEvents: 'Fixed Events',
		nonFixedEvents: 'Non-Fixed Events',
		schedule: 'schedule',
	},
	ScheduleSelectionDetails: {
		name: 'Schedule Selection Details',
		title: 'Schedule Selection Details',
		days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	},
	SchoolInformation: {
		name: 'School Information',
		title: 'Set School Information',
		description: 'Please enter the information about your current/next semester',
		institution: 'Post-Secondary Institution',
		carletonU: 'Carleton University',
		uOttawa: 'University of Ottawa',
		other: 'Other',
		noInstitution: 'Please select an institution',
		duration: 'Semester Duration',
		noDuration: 'Please select a Start and End Date',
		start: 'Start',
		end: 'End',
		confirmButton: 'Confirm',
		cancelButton: 'Cancel',
	},
	SchoolSchedule: {
		name: 'School Schedule',
		title: 'Add School Schedule',
		description: 'Import your school schedule by selecting or taking a picture',
		selectPicture: 'Select a Picture',
		takePicture: 'Take a Picture',
		manual: 'or import your school schedule ',
		manually: 'manually',
	},
	SchoolScheduleCreation: {
		name: 'School Schedule Creation',
		dialogTitle: 'Analyzing your Picture',
		dialogDescription: 'Extracting the information from your picture',
		error: 'Error',
		fileNoData: 'No data',
		backAlertTitle: 'Stopping Extraction',
		backAlertDescription: 'The schedule analyzing process will be stopped if you proceed. Where do you want to go?',
		cancel: 'Cancel',
	},
	SchoolScheduleSelectPicture: {
		name: 'School Schedule Select Picture',
		title: 'Select Picture',
	},
	SchoolScheduleTakePicture: {
		name: 'School Schedule Take Picture',
		title: 'Take a Picture',
	},
	Settings: {
		name: 'Settings',
		profile: 'Profile',
		unavailableHours: 'Set Unavailable Hours',
		schoolInformation: 'Set School Information',
		preferences: 'Preferences',
		changeLanguage: 'Switch to French?',
		cancel: 'Cancel',
		yes: 'Yes',
		notifications: 'Notifications',
		theme: 'Theme',
		general: 'General',
		help: 'Help',
		tutorial: 'Reload Tutorial',
		deleteCalendar: 'Reset/Delete Calendar',
		clearCache: 'Clear Cache/Data',
		privacyPolicy: 'Privacy Policy',
		cdhStudio: 'CDH Studio',
		logout: 'Log Out',
		version: 'Version 0.2.0',
	},
	UnavailableHours: {
		name: 'Unavailable Hours',
		title: 'Unavailable Hours',
		timesEmpty: 'Please select a Start and End Time.',
		description: 'Add the hours for which you\'re not available or you don\'t want anything to be booked.',
		manual: 'Want to add more specific unavailable hours? Add them as ',
		fixedEvents: 'Fixed Events',
		sleeping: 'Sleeping Hours',
		commuting: 'Commuting Hours',
		eating: 'Eating Hours',
		other: 'Other Unavailable Hours',
		week: 'Week',
		weekEnd: 'Week-End',
		confirmButton: 'Confirm',
		cancelButton: 'Cancel',
	},
	WelcomeScreen: {
		name: 'Welcome Screen',
		title: [
			'School Schedule Integration',
			'Schedule Generator',
			'Compare Schedule',
			'Start right now\nwith Kalend!',
		],
		description: [
			'Add your school schedule by importing a picture or a screenshot of your schedule',
			'Add your events and the activities you would like to do and let the application generate the best schedules for you',
			'Find availabilities by comparing schedules with your friends and colleagues',
		],
	},
	EventOverview: {
		location: 'Location: ',
		description: 'Description: ',
		recurrence: 'Recurrence: ',
		priority: 'Priority Level: ',
		dates: 'Date(s): ',
		time: 'Time: ',
		details: 'Details',
		deleteEvent: 'Delete this event?',
		cancel: 'Cancel',
		yes: 'Yes',
	},
	ServicesError: {
		formatDate: 'Something went wrong while formating data (Array length == 0)',
		analyzePictureServerReceive: 'Could not receive response from the server, please try again',
		analyzePictureServerConnect: 'Could not connect to the server, please try again later',
		analyzePictureData: 'The data from your schedule could not be extracted, please try again',
		findEmptySlots: 'Something went wrong while checking for events in Google Calendar',
		insertFixedCourse: 'There was a problem inserting Course',
		insertFixed: 'There was a problem inserting Fixed Event'
	},
	BottomButtons: {
		add: 'Add',
		next: 'Next',
		done: 'Done',
	},
};

const fr = {
	Chatbot: {
		name: 'Chatbot',
	},
	CompareSchedule: {
		name: 'Comparaison',
	}, 
	Course: {
		name: 'Cours',
		addTitle: 'Ajouter un cours',
		editTitle: 'Modifier le cours',
		description: 'Ajoutez tous les cours de votre horaire scolaire',
		snackbarSuccess: 'Cours ajouté avec succès',
		snackbarFailure: 'Champs non valide(s), veuillez vérifier pour ajouter un cours',
		week: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
		courseCodePlaceholder: 'Cote de cours',
		locationPlaceholder: 'Localisation',
		dayOfWeek: 'Jour de la semaine',
		confirmButton: 'Confirmer',
		cancelButton: 'Annuler',
		startTime: 'Début',
		endTime: 'Fin',
		courseCodeEmpty: 'Cote de cours ne peux pas être vide.',
		timeEmpty: 'Veuillez sélectionner un début et une fin.',
		cancel: 'Annuler',
	},
	Dashboard: {
		name: 'Tableau de bord',
		createSchedule: 'Créer un horaire',
		fabSchool: 'Ajouter un horaire scolaire',
		fabFixedEvent: 'Ajouter un événement fixe',
		fabNonFixedEvent: 'Ajouter un événement non fixe',
		eventsDayTitle: 'Événements de la journée',
		noEventsText: 'Il n\'y a pas d\'événements pour la journée.',
		create: 'Créer'
	},
	FixedEvent: {
		name: 'Événement Fixe',
		addTitle: 'Ajouter un événement fixe',
		editTitle: 'Modifier un événement fixe',
		description: 'Ajouter vos événements, heures de travail, rendez-vous, etc.',
		recurrence: ['Aucune', 'Tous les jours', 'Hebdomadaire', 'Mensuel'],
		cancel: 'Annuler',
		snackbarSuccess: 'Événement ajouté avec succès',
		snackbarFailure: 'Champs non valide(s), veuillez vérifier pour ajouter un événement',
		titleEmpty: 'Titre ne peut pas être vide.',
		datesTimesEmpty: 'Veuillez sélectionnez les dates et heures.',
		timesEmpty: 'Veuillez séletionner une date et une heure de fin.',
		alldayEmpty: 'Veuillez sélectionner une date de début et de fin.',
		allday: 'Toute la journée',
		start: 'Début',
		end: 'Fin',
		confirmButton: 'Confirmer',
		cancelButton: 'Annuler',
		titlePlaceholder: 'Titre',
		locationPlaceholder: 'Localisation',
		descriptionPlaceholder: 'Description',
	},
	Home: {
		name: 'Accueil',
		createdBy: 'Créer par ',
		cdhStudio: 'Studio CDH',
	},
	NonFixedEvent: {
		name: 'Événement non fixe',
		addTitle: 'Ajouter un événement non fixe',
		editTitle: 'Modifier un événement non fixe',
		snackbarSuccess: 'Événement ajouté avec succès',
		snackbarFailure: 'Champs non valide(s), veuillez vérifier pour ajouter un événement',
		titleEmpty: 'Titre ne peut pas être vide.',
		durationEmpty: 'Veuillez ajouter une durée.',
		specificDateEmpty: 'Veuillez sélectionner un début et une fin.',
		description: 'Ajoutez les événements que vous aimeriez que Kalend planifie pour vous',
		titlePlaceholder: 'Titre',
		availability: 'Disponibilité',
		dates: 'Dates',
		week: 'Cette semaine',
		specificDate: 'Période de temps précise',
		startDate: 'Début',
		confirmButton: 'Confirmer',
		cancelButton: 'Annuler',
		low: 'Bas',
		normal: 'Normal',
		high: 'Haut',
		duration: 'Durée',
		endDate: 'Fin',
		hours: 'heure(s)',
		minutes: 'minute(s)',
		splitDurationDate: 'Répartir la durée au cours la période de temps?',
		splitDurationWeek: 'Répartir la durée au cours de la semaine?',
		numberTimeDate: 'Nombre de fois que cela aura lieu au cours de la période de temps',
		numberTimeWeek: 'Nombre de fois que cela aura lieu au cours de la semaine',
		everyWeek: 'À toute les semaines?',
		priorityLevel: 'Priority Level',
		details: 'Details',
		locationPlaceholder: 'Location',
		descriptionPlaceholder: 'Description',
	},
	ReviewEvent: {
		name: 'Création d\'horaire',
		title: 'Créer un horaire',
		allDay: 'Toute la journée',
		timeWeek: 'fois/semaine',
		week: 'Cette semaine',
		error: 'Erreur',
		noEvent: 'Vous devez créer des événements afin de générer un horaire',
		courseTitle: 'Horaire scolaire',
		noCourse: 'Aucun horaire scolaire ou cours ajouté',
		fixedTitle: 'Événements fixes',
		noFixed: 'Aucun événement fixe ajouté',
		nonFixedTitle: 'Événements non fixes',
		noNonFixed: 'Aucun événement non fixe ajouté',
		ok: 'Ok',
		low: 'Bas',
		normal: 'Normal',
		high: 'Haut',
		days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
		daysEn: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	},
	ScheduleCreation: {
		name: 'Création d\'horaire',
		error: 'Erreur',
		ok: 'Ok',
		cancel: 'Annuler',
		dialogTitle: 'Création de votre horaire',
		dialogDescription: 'Notre IA perfectionne présentement plusieurs horaires pour vous',
		backAlertTitle: 'Arrêt de la création',
		backAlertDescription: 'Les horaires vont cesser d\'être générés si vous poursuivez. Où désirez-vous aller?',
	},
	ScheduleSelection: {
		name: 'Sélection d\'horaire',
		title: 'Sélection d\'horaire',
		weekLetters: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
		cancel: 'Annuler',
		backAlertTitle: 'Abandonner la sélection',
		backAlertDescription: 'Les horaires créés seront supprimer si vous poursuivez. Où désirez-vous aller?',
		description: 'Ci-dessous vous allez trouver des horaires de la semaine courante créés par l\'application. Veuillez sélectionner celui que vous préférez.',
		courses: 'Cours',
		fixedEvents: 'Événements fixes',
		nonFixedEvents: 'Événements non fixes',
		schedule: 'horaire',
		ordinal: ['Premier', 'Deuxième', 'Troisième', 'Quatrième', 'Cinquième', 'Sixième', 'Septième', 'Huitième', 'Neuvième', 'Dixième']
	},
	ScheduleSelectionDetails: {
		name: 'Détails sélection d\'horaire',
		title: 'Détails sélection d\'horaire',
		days: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
		daysEn: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	},
	SchoolInformation: {
		name: 'Information scolaire',
		title: 'Préciser l\'information scolaire',
		description: 'Veuillez entrer l\'information à propos de votre session présente',
		institution: 'Établissement post-secondaire',
		carletonU: 'Carleton University',
		uOttawa: 'Université d\'Ottawa',
		other: 'Autre',
		noInstitution: 'Veuillez sélectionner un établissement',
		duration: 'Durée de la session',
		noDuration: 'Veuillez sélectionner un début et une fin',
		start: 'Début',
		end: 'Fin',
		confirmButton: 'Confirmer',
		cancelButton: 'Annuler',
	},
	SchoolSchedule: {
		name: 'Horaire scolaire',
		title: 'Ajouter un horaire scolaire',
		description: 'Ajoutez votre horaire scolaire en ajoutant ou en prenant une photo',
		selectPicture: 'Sélectionnez une photo',
		takePicture: 'Prendre une photo',
		manual: 'ou ajoutez votre horaire scolaire ',
		manually: 'manuellement',
	},
	SchoolScheduleCreation: {
		name: 'Création de l\'horaire scolaire',
		dialogTitle: 'Analyse de votre photo',
		dialogDescription: 'Extraction de l\'information de votre photo',
		error: 'Erreur',
		fileNoData: 'Aucune donnée',
		backAlertTitle: 'Arrêt de l\'extraction',
		backAlertDescription: 'L\'analyse de votre horaire sera interrompue si vous poursuivez. Où désirez-vous aller?',
		cancel: 'Annuler',
	},
	SchoolScheduleSelectPicture: {
		name: 'Sélection photo horaire scolaire',
		title: 'Sélectionner une photo',
	},
	SchoolScheduleTakePicture: {
		name: 'Prendre photo horaire scolaire',
		title: 'Prendre une photo',
	},
	Settings: {
		name: 'Paramètres',
		profile: 'Profil',
		unavailableHours: 'Préciser les heures non disponibles',
		schoolInformation: 'Préciser l\'information scolaire',
		preferences: 'Préférences',
		changeLanguage: 'Passer en anglais?',
		cancel: 'Annuler',
		yes: 'Oui',
		notifications: 'Notifications',
		theme: 'Thème',
		general: 'Général',
		help: 'Aide',
		tutorial: 'Relancer le tutoriel',
		deleteCalendar: 'Réinitialiser/Supprimer le calendrier',
		clearCache: 'Effacer le cache/les données',
		privacyPolicy: 'Politique de confidentialité',
		cdhStudio: 'Studio CDH',
		logout: 'Déconnexion',
		version: 'Version 0.2.0',
	},
	UnavailableHours: {
		name: 'Heures non disponibles',
		title: 'Heures non disponibles',
		timesEmpty: 'Veuillez sélectionner un début et une fin.',
		description: 'Ajoutez les heures pour lesquelles vous n\'êtes pas disponible ou vous ne voulez rien de planifié.',
		manual: 'Vous voulez ajouter des heures non disponibles plus précises? Ajoutez les en tant qu\'',
		fixedEvents: 'événements fixes',
		sleeping: 'Heures de sommeil',
		commuting: 'Heures de transports',
		eating: 'Heures des repas',
		other: 'Autres heures non disponibles',
		week: 'Semaine',
		weekEnd: 'Fin de semaine',
		confirmButton: 'Confirmer',
		cancelButton: 'Annuler',
	},
	WelcomeScreen: {
		name: 'Écran de bienvenue',
		title: [
			'Intégration d\'horaire scolaire',
			'Génération d\'horaire',
			'Comparaison d\'horaire',
			'Commencez maintenant\navec Kalend!',
		],
		description: [
			'Ajoutez votre horaire scolaire en ajoutant une photo ou une capture d\'écran de votre horaire',
			'Ajoutez vos événements et les activités que vous aimeriez faire et laissez l\'application générer les meilleurs horaires pour vous',
			'Trouvez les disponibilités en comparant votre horaire avec ceux de vos amis et collègues',
		],
	},
	EventOverview: {
		location: 'Localisation : ',
		description: 'Description : ',
		recurrence: 'Récurrence : ',
		priority: 'Niveau de priorité : ',
		dates: 'Date(s) : ',
		time: 'Heures : ',
		details: 'Détails',
		deleteEvent: 'Supprimer cet\névénement?',
		cancel: 'Annuler',
		yes: 'Oui',
	},
	ServicesError: {
		formatDate: 'Une erreur s\'est produite lors de la création des données (longeur du tableau == 0)',
		analyzePictureServerReceive: 'Impossible de recevoir une réponse du serveur, veuillez réessayer',
		analyzePictureServerConnect: 'Impossible de se connecter au serveur, veuillez réessayer ultérieurement',
		analyzePictureData: 'Les données de votre horaire n\'ont pu être extraite, veuillez réessayer',
		findEmptySlots: 'Une erreur s\'est produite pendant la vérification des événements dans Google Calendar',
		insertFixedCourse: 'Une erreur d\'insertion s\'est produite pour un ou plusieurs cours',
		insertFixed: 'Une erreur d\'insertion s\'est produite pour un ou plusieurs événements fixes'
	},
	BottomButtons: {
		add: 'Ajout',
		next: 'Suivant',
		done: 'Terminé',
	},
};

export default {
	en,
	fr
};