"use strict";

window.WisePoint = window.WisePoint || {};
WisePoint.Utils = WisePoint.Utils || {};
WisePoint.PeopleSearch = WisePoint.PeopleSearch || {};
WisePoint.PeopleSearch.Resources = WisePoint.PeopleSearch.Resources || {};
WisePoint.PeopleSearch.Models = WisePoint.PeopleSearch.Models || {};
WisePoint.PeopleSearch.ViewModels = WisePoint.PeopleSearch.ViewModels || {};

WisePoint.PeopleSearch.Resources.EN = {

    //Main screen
    DefaultMainPageTitle: "Search People",
    AppSettings :"Settings",
    SearchBoxPlaceholder : "Search...",
    SearchBoxButtonTitle: "Search",
    RefinerJobTitle : "Job Title",
    RefinerPeopleKeywords: "Keywords",
    RefinerOfficeLocation : "Location",
    RefinerDepartment :"Department",
    NoResult :"This query returned no results.",
    NoRefiners : "We don't have any refiners to show you",
    ResultsCount :"There are {0} people matching your search :",
    ResultsCount1 : "There is 1 people matching your search :",
    ShowMoreRefiners: "Show more",
    ShowLessRefiners: "Show less",
    ResetRefiner : "All",
    Loading : "Loading...",
    ViewProfile: "Browse the profile",

    //Settings screen
    SettingsSectionLabels: "Customize labels",
    SettingsSectionLabelsDescription: "You may customize the site title and the page titles that appear in the add-in's main page.",
    SettingsSectionLabelsAppTitle: "Add-in title :",
    SettingsSectionLabelsAppTitleValidationError: "This add-in title is invalid.",
    SettingsSectionLabelsPageTitle : "Page title :",

    ErrorLoadingProperties: "Failed to load properties. Please contact the owner of this add-in.",
    ErrorUpdatingProperties: "Failed to update properties. Please contact the owner of this add-in.",
    SettingsSectionSortResults: "Sort Results",
    SettingsSectionSortResultsDescription: '<p>This add-in has been designed to sort search results on FirstName and LastName fields (managed properties). <br />However, by default on a SharePoint environment <a href="http://technet.microsoft.com/en-us/library/jj219630.aspx">these managed properties aren\'t sortable</a>, this is why sorting in this add-in is turned off by default.</p><p>Please ask your local farm administrator to set these 2 managed properties as sortable, wait for a full crawl to occur, then turn this setting on.</p><p><span style="font-weight: bold">Warning : </span>if you check the checkbox without the 2 managed properties being sortable, all search queries will fail, and no results will be shown.</p>',
    SettingsSectionSortResultsCheckboxLabel: "Sort Results",

    SettingsSectionSearchQuery: "Search Query",
    SettingsSectionSearchQueryDescription: '<p>Indicate how many results are retrieved by each search query.</p><p>Indicate wether a wildcard should be appended to each search query. For example, if this setting is active, a search with keyword "ob" will be automatically replaced by "ob*" which will match both "Obama" and "Obiwan".</p><p>You may also define a query that will be appended to each search queries. For example, you may use "+BaseOfficeLocation:Paris" if you want to force results to be only people working in Paris.</p><p>Use the refiners setting to define which refiners are available, and their label.<br />Format : RefinerName1,RefinerLabel1;RefinerName2;RefinerLabel2</p><p>By default, the add-in uses the People result source, but you can change this by typing it\'s ID.<br />Default value : B09A7990-05EA-4AF9-81EF-EDFAB16C4E31</p>',
    SettingsSectionSearchQueryResultsPerQueryHeader: "Results per query : ",
    SettingsSectionSearchQueryResultsPerQueryTitle: "Results per query",
    SettingsSectionSearchQueryResultsPerQueryValidationError: "Value must be between 5 and 100",
    SettingsSectionSearchQueryAppendWildcardHeader: "Append wildcard :",
    SettingsSectionSearchQueryAppendWildcardTitle : "Append wildcard",
    SettingsSectionSearchQueryHiddenConstraintHeader: "Appended query :",
    SettingsSectionSearchQueryHiddenConstraintTitle: "Appended search query",

    SettingsSectionPhotos: "High definition photos",
    SettingsSectionPhotosDescription: '<p>For increased image quality in search results, turn on the high definition photos setting.<br />The search results photos will then be downloaded in large size.<br />Please note that this setting will affect rendering performance as images will load more slowly, depending on availble bandwidth.</p>',
    SettingsSectionPhotosHighDefPhotosHeader: "High definition photos : ",
    SettingsSectionPhotosHighDefPhotosTitle: "Display high definition photos",
    SettingsSectionSearchQueryRefinersHeader: "Refiners : ",
    SettingsSectionSearchQueryRefinersTitle: "Refiners",
    SettingsSectionSearchQueryRefinersDefaultValue: "Department,Department;JobTitle,Job Title;PeopleKeywords,Keywords;BaseOfficeLocation,Location",
    SettingsSectionSearchQueryResultSourceHeader: "Result source :",
    SettingsSectionSearchQueryResultSourceTitle : "Result source",

    SettingsButtonOk: "OK",
    SettingsButtonCancel: "Cancel",
    
    //Generic
    StatusBarError:"Error : "
}

WisePoint.PeopleSearch.Resources.FR = {

    //Main screen
    DefaultMainPageTitle : "Recherche de personnes",
    AppSettings : "Paramètres",
    SearchBoxPlaceholder : "Rechercher...",
    SearchBoxButtonTitle: "Rechercher",
    RefinerJobTitle : "Fonction",
    RefinerPeopleKeywords : "Mots clés",
    RefinerOfficeLocation : "Localisation",
    RefinerDepartment : "Service",
    NoResult : "Personne ne correspond à votre recherche.",
    NoRefiners :"Désolé... Nous n’avons aucun affinement à vous proposer",
    ResultsCount :"Il y a {0} personnes qui correspondent à votre recherche :",
    ResultsCount1 : "Il y a une personne qui correspond à votre recherche :",
    ShowMoreRefiners: "Afficher plus",
    ShowLessRefiners: "Afficher moins",
    ResetRefiner:"Tout",
    Loading : "Chargement...",
    ViewProfile: "Voir le profil",

    //Settings screen
    SettingsSectionLabels: "Personnalisation des libellés",
    SettingsSectionLabelsDescription: "Vous pouvez ici personnaliser le nom de l'add-in ainsi que le titre de la page principale.",
    SettingsSectionLabelsAppTitle: "Nom de l'add-in :",
    SettingsSectionLabelsAppTitleValidationError: "Ce nom est invalide.",
    SettingsSectionLabelsPageTitle: "Titre de la page principale :",

    ErrorLoadingProperties: "Une erreur est survenue pendant le chargement des paramètres. Vous n'avez peut-être pas les permissions nécessaires. Veuillez contacter le propriétaire de cet add-in.",
    ErrorUpdatingProperties: "Une erreur est survenue pendant l'enregistrement des paramètres. Vous n'avez peut-être pas les permissions nécessaires. Veuillez contacter le propriétaire de cet add-in.",
    SettingsSectionSortResults: "Tri des résultats",
    SettingsSectionSortResultsDescription: '<p>Cet add-in est conçue pour trier les résultats avec les propriétés gérées FirstName et LastName.<br />Cependant, par défaut sur un environnement SharePoint, <a href="http://technet.microsoft.com/fr-fr/library/jj219630.aspx">ces propriétés gérées ne sont pas triables</a>, c\'est pourquoi ce paramètre est ici désactivé par défaut.</p><p>Veuillez demander à l\'administrateur de votre environnement SharePoint de définir ces 2 propriétés gérées comme triables, attendez qu\'une indexation complète soit effectuée, et activez ce paramètre.</p><p><span style="font-weight: bold">Attention : </span>si vous activez ce paramètre avant que ces 2 propriétés soient triables, toutes les requêtes de recherche échoueront et plus aucun résultat ne sera affiché.</p>',
    SettingsSectionSortResultsCheckboxLabel: "Trier les résultats",

    SettingsSectionSearchQuery: "Requêtes de recherche",
    SettingsSectionSearchQueryDescription: '<p>Indiquez combien de résultats doivent être récupérés par chaque requête de recherche.</p><p>Indiquez si un wildcard doit être ajouté à chaque requête de recherche. Par exemple, si ce paramètre est activé, une requête portant sur le mot clé "ob*" retournera toutes les personnes dont le nom comporte "Obama" et "Obiwan".</p><p>Vous pouvez aussi définir une portion de requête qui sera ajoutée à chaque recherche. Par exemple, vous pouvez utiliser "+BaseOfficeLocation:Paris" si vous souhaitez n\'afficher que des personnes basées à Paris.</p><p>Utilisez le paramètre Affinements pour choisir les affinements proposés sur la gauche de l\'écran, ainsi que leurs libellés respectifs. <br />Format : RefinerName1,RefinerLabel1;RefinerName2;RefinerLabel2</p><p>Par défaut, l\'add-in utilise l\'origine de résultats People. Vous pouvez choisir une autre origine de résultat en spécifiant son identifiant. <br />Identifiant par défaut : B09A7990-05EA-4AF9-81EF-EDFAB16C4E31</p>',
    SettingsSectionSearchQueryResultsPerQueryHeader: "Nombre de résultats par requête : ",
    SettingsSectionSearchQueryResultsPerQueryTitle: "Nombre de résultats par requête",
    SettingsSectionSearchQueryResultsPerQueryValidationError: "La valeur doit être comprise entre 5 et 100",
    SettingsSectionSearchQueryAppendWildcardHeader: "Ajouter le wildcard :",
    SettingsSectionSearchQueryAppendWildcardTitle: "Ajouter le wildcard",
    SettingsSectionSearchQueryHiddenConstraintHeader: "Requête complémentaire :",
    SettingsSectionSearchQueryHiddenConstraintTitle: "Requête complémentaire",

    SettingsSectionPhotos: "Photos haute résolution",
    SettingsSectionPhotosDescription: '<p>Pour améliorer la qualité des photos, activez ce paramètre.<br />Les photos seront alors affichées en taille réelle.<br />Veuillez noter que ce paramètre affecte les performances d\'affichage puisque les images plus volumineuses seront chargées plus lentement, en fonction de la bande passante disponible.</p>',
    SettingsSectionPhotosHighDefPhotosHeader: "Photos haute définition : ",
    SettingsSectionPhotosHighDefPhotosTitle: "Afficher les photos en haute résolution",
    SettingsSectionSearchQueryRefinersHeader: "Affinements : ",
    SettingsSectionSearchQueryRefinersTitle: "Affinements",
    SettingsSectionSearchQueryRefinersDefaultValue: "Department,Service;JobTitle,Fonction;PeopleKeywords,Mots clés;BaseOfficeLocation,Localisation",
    SettingsSectionSearchQueryResultSourceHeader: "Origine de résultats :",
    SettingsSectionSearchQueryResultSourceTitle: "Origine de résultats",

    SettingsButtonOk: "OK",
    SettingsButtonCancel: "Annuler",

    //Generic
    StatusBarError:"Erreur : "
    
}

//set current language
if (WisePoint.Utils.GetQueryStringParameter("SPLanguage").startsWith("fr-"))
    WisePoint.PeopleSearch.Resources.Current = WisePoint.PeopleSearch.Resources.FR;
else
    WisePoint.PeopleSearch.Resources.Current = WisePoint.PeopleSearch.Resources.EN;