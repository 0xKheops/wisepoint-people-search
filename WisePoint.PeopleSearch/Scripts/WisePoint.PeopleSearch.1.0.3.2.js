///#source 1 1 /Scripts/Common/WisePoint.Utils.js
"use strict";

window.WisePoint = window.WisePoint || {};
WisePoint.Utils = WisePoint.Utils || {};
WisePoint.PeopleSearch = WisePoint.PeopleSearch || {};
WisePoint.PeopleSearch.Resources = WisePoint.PeopleSearch.Resources || {};
WisePoint.PeopleSearch.Models = WisePoint.PeopleSearch.Models || {};
WisePoint.PeopleSearch.ViewModels = WisePoint.PeopleSearch.ViewModels || {};

WisePoint.Utils.GetQueryString = function () {
    var loc = window.location.toString();
    var qsStart = loc.indexOf('?');
    if (loc != -1)
        return decodeURIComponent(loc.substring(qsStart));
    else
        return '';
};

WisePoint.Utils.GetQueryStringParameter = function (param) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == param)
            return decodeURIComponent(singleParam[1]);
    }
    return "";
};
WisePoint.Utils.GetReworkedAppWebUrl = function (s) {
    s = s.substring(s.indexOf("//") + 2);
    return s.substring(s.indexOf("/"));
};

WisePoint.Utils.DisplayErrorMessage = function (error) {
    alert(error);
}

WisePoint.Utils.Log = function (message) {
    if (typeof console != "undefined") 
        console.log(message);
};
WisePoint.Utils.GetSearchResultField = function (result, fieldName) {
    return Enumerable.From(result.Cells.results)
           .Where(function (field) { return field.Key === fieldName })
           .Select(function (field) { return field.Value })
           .FirstOrDefault();
}

//utilities
WisePoint.Utils.InitializeTiles = function() {
    jQuery(".wp-main-container").on("mouseenter", ".sptiles-inner", function () {
        jQuery(this).find(".sptiles-details").stop().animate({ top: "0" }, 400);
    }).on("mouseleave", ".sptiles-inner", function () {
        jQuery(this).find(".sptiles-details").stop().animate({ top: "100px" }, 400);
    });
}


//utility method used to resize the main app div
WisePoint.Utils.SetMainContainerMaxWidth = function (mainDivSelector) {

    function EnsureMaxWidth() {
        var maxWidth = $(window).innerWidth() - ($("#sideNavBox").css("display") == "block" ? $("#sideNavBox").width() : 0) - 100;
        $(mainDivSelector).css("maxWidth", maxWidth + "px");
    }

    //apply maxWidth now
    EnsureMaxWidth();

    //apply maxWidth each time main area is resized
    $(window, "#fullscreenmode", "#exitfullscreenmode").resize(function () {
        EnsureMaxWidth();
    });

}

///#source 1 1 /Scripts/Common/Resources.js
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
///#source 1 1 /Scripts/Models/ActiveRefiner.js
"use strict";

window.WisePoint = window.WisePoint || {};
WisePoint.Utils = WisePoint.Utils || {};
WisePoint.PeopleSearch = WisePoint.PeopleSearch || {};
WisePoint.PeopleSearch.Resources = WisePoint.PeopleSearch.Resources || {};
WisePoint.PeopleSearch.Models = WisePoint.PeopleSearch.Models || {};
WisePoint.PeopleSearch.ViewModels = WisePoint.PeopleSearch.ViewModels || {};

//Active Refiner Model
WisePoint.PeopleSearch.Models.ActiveRefiner = function (viewModel, groupName, value, token) {

    var activeRefiner = this;

    this.GroupName = groupName;
    this.Value = value;
    this.Token = token;

}
///#source 1 1 /Scripts/Models/RefinerEntry.js
"use strict";

window.WisePoint = window.WisePoint || {};
WisePoint.Utils = WisePoint.Utils || {};
WisePoint.PeopleSearch = WisePoint.PeopleSearch || {};
WisePoint.PeopleSearch.Resources = WisePoint.PeopleSearch.Resources || {};
WisePoint.PeopleSearch.Models = WisePoint.PeopleSearch.Models || {};
WisePoint.PeopleSearch.ViewModels = WisePoint.PeopleSearch.ViewModels || {};

//Refiner Entry Model
WisePoint.PeopleSearch.Models.RefinerEntry = function (viewModel, groupName, name, token, count, value, active) {

    var entry = this;

    this.GroupName = groupName;
    this.Name = name;
    this.Token = token;
    this.Count = count;
    this.Value = value;
    this.Active = active;

    this.Label = name + " (" + count + ")";

    this.SetActive = function () {
        entry.Active = true;
        viewModel.ActiveRefiners.push(new WisePoint.PeopleSearch.Models.ActiveRefiner(viewModel, entry.GroupName, entry.Value, entry.Token));
        viewModel.Search(true, false);
    };

}
///#source 1 1 /Scripts/Models/RefinerGroup.js
"use strict";

window.WisePoint = window.WisePoint || {};
WisePoint.Utils = WisePoint.Utils || {};
WisePoint.PeopleSearch = WisePoint.PeopleSearch || {};
WisePoint.PeopleSearch.Resources = WisePoint.PeopleSearch.Resources || {};
WisePoint.PeopleSearch.Models = WisePoint.PeopleSearch.Models || {};
WisePoint.PeopleSearch.ViewModels = WisePoint.PeopleSearch.ViewModels || {};

//Refiner Group Model
WisePoint.PeopleSearch.Models.RefinerGroup = function (viewModel, name, entries) {

    var group = this;

    this.Name = name;

    this.DisplayName = ko.pureComputed(function () {
        var refinerDef = Enumerable.From(viewModel.RefinerDefinitions())
                                   .Where(function (rd) { return rd.Name == group.Name })
                                   .SingleOrDefault();
                  
        return refinerDef == null ? group.Name : refinerDef.Label;

        switch (group.Name) {
            case "JobTitle":
                return WisePoint.PeopleSearch.Resources.Current.RefinerJobTitle;
            case "Department":
                return WisePoint.PeopleSearch.Resources.Current.RefinerDepartment;
            case "BaseOfficeLocation":
                return WisePoint.PeopleSearch.Resources.Current.RefinerOfficeLocation;
            case "PeopleKeywords":
                return WisePoint.PeopleSearch.Resources.Current.RefinerPeopleKeywords;
            default:
                return group.Name;
        }
    });

    this.Entries = entries;

    this.ShowAll = ko.observable(false);

    this.Expanded = ko.observable(true);

    //"private" method used by ShowMore and ShowLess
    this.ShowMoreOrLess = ko.pureComputed(function () {
        return typeof (group.Entries) != "undefined" && group.Entries.length > 5 && group.Expanded();
    });

    this.ShowMore = ko.pureComputed(function () {
        return group.ShowMoreOrLess() && !group.ShowAll();
    });

    this.ShowLess = ko.pureComputed(function () {
        return group.ShowMoreOrLess() && group.ShowAll();
    });

    this.ShowMoreClick = function () {
        group.ShowAll(true);
    }

    this.ShowLessClick = function () {
        group.ShowAll(false);
    }

    //hides or shows the whole group
    this.ToggleVisibility = function () {
        group.Expanded(!group.Expanded());
    }

    this.IsActive = ko.pureComputed(function () {
        return Enumerable.From(group.Entries).Any(function (entry) { return entry.Active; });
    }, group);

    this.IsInactive = ko.pureComputed(function () {
        return !(Enumerable.From(group.Entries).Any(function (entry) { return entry.Active; }));
    }, group);

    this.SelectedEntry = ko.pureComputed(function () {
        return Enumerable.From(group.Entries).FirstOrDefault(function (entry) { return entry.Active; });
    }, group);

    this.UnselectedEntries = ko.pureComputed(function () {
        return Enumerable.From(group.Entries).Where(function (entry) { return !entry.Active; }).ToArray();
    }, group);

    this.DisplayedEntries = ko.pureComputed(function () {
        if (typeof (group.Entries) == "undefined" || group.ShowAll() || group.Entries.length <= 5)
            return group.Entries;
        else
            return Enumerable.From(group.Entries).Take(5).ToArray();
    });

    this.Clear = function () {
        viewModel.ActiveRefiners.remove(function (ref) {
            return ref.GroupName === group.Name;
        });
        viewModel.Search(true, false);
    }

    this.ShowReset = ko.pureComputed(function () { return group.IsActive() && group.Expanded(); });
    this.ShowSelection = ko.pureComputed(function () { return group.IsActive() });
    this.ShowRefiners = ko.pureComputed(function () { return group.IsInactive() && group.Expanded(); });
    this.ArrowClass = ko.pureComputed(function () { return group.Expanded() ? "ms-ref-uparrow" : "ms-ref-downarrow" });

}

///#source 1 1 /Scripts/Models/SearchResult.js
"use strict";

window.WisePoint = window.WisePoint || {};
WisePoint.Utils = WisePoint.Utils || {};
WisePoint.PeopleSearch = WisePoint.PeopleSearch || {};
WisePoint.PeopleSearch.Resources = WisePoint.PeopleSearch.Resources || {};
WisePoint.PeopleSearch.Models = WisePoint.PeopleSearch.Models || {};
WisePoint.PeopleSearch.ViewModels = WisePoint.PeopleSearch.ViewModels || {};

//Search Result Model
WisePoint.PeopleSearch.Models.SearchResult = function (ln, fn, pn, ti, pa, em, dept, pic) {

    this.lastName = ln;
    this.firstName = fn;
    this.preferredName = pn;
    this.title = ti;
    this.path = pa;
    this.email = em;
    this.department = dept;
    this.picture = pic;

    this.displayName = null;
    try {
        this.displayName = ln ? (ln.toUpperCase() + " " + fn) : pn;
    } catch (ex) {
        this.displayName = pn;
    }
    // this.lastNameUpper = ln.toUpperCase();
}
///#source 1 1 /Scripts/ViewModels/MainPage.js
"use strict";

window.WisePoint = window.WisePoint || {};
WisePoint.Utils = WisePoint.Utils || {};
WisePoint.PeopleSearch = WisePoint.PeopleSearch || {};
WisePoint.PeopleSearch.Resources = WisePoint.PeopleSearch.Resources || {};
WisePoint.PeopleSearch.Models = WisePoint.PeopleSearch.Models || {};
WisePoint.PeopleSearch.ViewModels = WisePoint.PeopleSearch.ViewModels || {};

//App ViewModel
WisePoint.PeopleSearch.ViewModels.MainPage = function (scrollableAreaSelector) {

    //safe pointer to this view model, for use in async handlers
    var viewModel = this;

    //pointer to the scrollable area, necessary to detect scroll and perform infinite scrolling
    this.ScrollableArea = $(scrollableAreaSelector);

    //App Settings
    this.PageTitle = ko.observable("");
    this.SortResults = false;
    this.HighDefinitionPhotos = true;
    this.ResultsPerQuery = 50;
    this.AppendWildcard = false;
    this.AppendedQuery = "-AccountName:_spo* -AccountName:app@sharepoint -AccountName:#ext#";
    this.Refiners = ko.observable(WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryRefinersDefaultValue);
    this.ResultSourceId = ko.observable("B09A7990-05EA-4AF9-81EF-EDFAB16C4E31");
    this.AppWebUrl = WisePoint.Utils.GetQueryStringParameter("SPAppWebUrl");
    this.HostWebUrl = WisePoint.Utils.GetQueryStringParameter("SPHostUrl");
    this.SettingsPageUrl = "Settings.aspx" + WisePoint.Utils.GetQueryString();
    
    //observables
    this.Initialized = ko.observable(false); //displays app content
    this.SearchResults = ko.observableArray();
    this.RefinerGroups = ko.observableArray();
    this.ActiveRefiners = ko.observableArray(); //use observablearray because of the remove method, but it won't be databound
    this.RowCount = ko.observable(0);
    this.TotalRows = ko.observable(0);
    this.QueryInput = ko.observable(WisePoint.Utils.GetQueryStringParameter("k")); //user search query
    this.IsPerformingReset = ko.observable(false);
    this.SearchBoxFocused = ko.observable(false);
    this.IsLoading = ko.observable(true);
    this.IsAdminUser = ko.observable(false);
    
    //variables
    this.CurrentRequest = null; //Pointer to current http request, used to abord it if necessary
    this.ActiveQuery = null; //used to store a search until all results are pulled

    //indicates whether there are more results that could be retrieved for current search
    this.HasMoreResults = ko.pureComputed(function () {
        return viewModel.TotalRows() > viewModel.RowCount();
    });

    this.RefinerDefinitions = ko.pureComputed(function(){
        try{
            var arStrRefiners = viewModel.Refiners().split(";");
            return Enumerable.From(arStrRefiners).Select(function (r) {
                var ar = r.split(",");
                return {
                    Name: ar[0],
                    Label: ar[1]
                };
            }).ToArray();
        }catch(e){
            WisePoint.Utils.Log("Failed to parse refiners string");
            return [];
        }
    });

    this.RefinersPostString = ko.pureComputed(function () {
        try{
            var strRefiners = Enumerable.From(viewModel.RefinerDefinitions())
                                        .Select(function (rd) { return rd.Name; })
                                        .ToArray()
                                        .join(",");
            var result = ", 'Refiners': '" + strRefiners + "'";
            WisePoint.Utils.Log("RefinersPostString : " + result);
            return result;
        } catch (e) {
            WisePoint.Utils.Log("Failed to generate refiners post string");
            return ""; 
        }
    });

    //Performs a search
    this.Search = function (reset, hideRefiners) {

        if (typeof (hideRefiners) === 'undefined')
            hideRefiners = true;

        if (reset) {
            viewModel.IsPerformingReset(true);
            viewModel.ActiveQuery = viewModel.QueryInput();

            viewModel.SearchResults.removeAll();
            viewModel.RowCount(0);
            viewModel.TotalRows(0);
            if (hideRefiners)
                viewModel.RefinerGroups.removeAll();
        }

        //display spinner
        viewModel.IsLoading(true);

        var queryActive = viewModel.ActiveQuery === "" ? "*" : viewModel.ActiveQuery;

        //append wildcard as defined in settings
        if (viewModel.ActiveQuery != "" && viewModel.AppendWildcard)
            queryActive += "*";

        setTimeout(function () {

            //abort the current query if its still not finished
            if (viewModel.CurrentRequest != null) {
                try {
                    viewModel.CurrentRequest.abort();
                } catch (ex) {
                    WisePoint.Utils.Log(ex.message);
                }
            }

            //compute refiners string
            var refinersPostData = "";
            var activeRefiners = viewModel.ActiveRefiners();
            if (activeRefiners.length > 0) {
                refinersPostData = ", 'RefinementFilters': { 'results': [";

                for (var i = 0; i < activeRefiners.length; i++) {
                    var activeRefiner = activeRefiners[i];
                    if (i > 0) refinersPostData += ",";
                    refinersPostData += "'" + activeRefiner.GroupName + ":" + activeRefiner.Token + "'";
                }

                refinersPostData += "] }";
                //WisePoint.Utils.Log("refinersPostData : " + refinersPostData);
            }


            //compute the query
            var rowLimit = viewModel.ResultsPerQuery; 
            var startRow = reset ? 0 : viewModel.RowCount();
            var startRowPostData = ", 'StartRow' : '" + startRow + "'";
            var hiddenConstraints = viewModel.AppendedQuery == "" ? "" : (",'HiddenConstraints':'" + viewModel.AppendedQuery.replace(/\'/gi, "\'") + "'");
            var sortPostData = viewModel.SortResults ? ",'SortList': { 'results': [{'Property':'LastName','Direction': '0'}, {'Property':'FirstName','Direction': '0'}] }" : "";

            var postData = "{ 'request': { 'Querytext': '" + queryActive.replace(/\'/gi, "\'") + "'" + hiddenConstraints + ",'EnableNicknames':'True', 'TrimDuplicates':'False','GenerateBlockRankLog' : 'False', 'ProcessBestBets' : 'False', 'EnableQueryRules' : 'False', 'BypassResultTypes':'True', 'EnablePhonetic':'True', 'SelectProperties': { 'results': ['LastName', 'FirstName', 'JobTitle', 'Department', 'WorkEmail', 'PictureURL', 'AccountName', 'PreferredName', 'Path'] }" + sortPostData + viewModel.RefinersPostString() + ", 'SourceId': '" + viewModel.ResultSourceId() + "'" + refinersPostData + startRowPostData + ", 'RowLimit' : " + rowLimit + " } }";
            var postUrl = viewModel.AppWebUrl + "/_api/search/postquery";

            WisePoint.Utils.Log("PostQuery (" + startRow + ") : " + postData);

            //perform the query
            viewModel.CurrentRequest = $.ajax(
                    {
                        url: postUrl,
                        headers: { "accept": "application/json; odata=verbose", "x-requestdigest": $("#__REQUESTDIGEST").val(), "x-requestforceauthentication": true },
                        type: "POST",
                        data: postData,
                        contentType: 'application/json;odata=verbose',
                        success: viewModel.OnSuccess,
                        error: viewModel.OnError
                    }
                );
        }, 0);

    };

    this.OnSuccess = function (data) {

        if (viewModel.IsPerformingReset()) {
            //retrieve refiners
            var refiners = data.d.postquery.PrimaryQueryResult.RefinementResults === null ? [] : Enumerable.From(data.d.postquery.PrimaryQueryResult.RefinementResults.Refiners.results).Select(function (group) {

                var entries = Enumerable.From(group.Entries.results).Select(function (entry) {
                    var isActive = Enumerable.From(viewModel.ActiveRefiners()).Any(function (ref) { return ref.GroupName === group.Name && ref.Value === entry.RefinementValue });
                    return new WisePoint.PeopleSearch.Models.RefinerEntry(viewModel, group.Name, entry.RefinementName, entry.RefinementToken, entry.RefinementCount, entry.RefinementValue, isActive)
                }).ToArray();

                return new WisePoint.PeopleSearch.Models.RefinerGroup(viewModel, group.Name, entries);

            })

            var arRefiners = new Array();

            try {
                arRefiners = refiners.ToArray();
            } catch (e) { }

            try{
            //Databind refiners
                viewModel.RefinerGroups(arRefiners);
            } catch (e) {
                WisePoint.Utils.DisplayErrorMessage("error loading refiners");
            }
        }

        //retrieve search results
        if (data.d.postquery.PrimaryQueryResult.RelevantResults != null) {

            viewModel.RowCount(viewModel.RowCount() + data.d.postquery.PrimaryQueryResult.RelevantResults.Table.Rows.results.length);
            viewModel.TotalRows(data.d.postquery.PrimaryQueryResult.RelevantResults.TotalRows);
            viewModel.IsPerformingReset(false); //result count will display now

            var results = Enumerable.From(data.d.postquery.PrimaryQueryResult.RelevantResults.Table.Rows.results).Select(function (result) {

                var an = WisePoint.Utils.GetSearchResultField(result, "AccountName");
                var ln = WisePoint.Utils.GetSearchResultField(result, "LastName");
                var fn = WisePoint.Utils.GetSearchResultField(result, "FirstName");
                var ti = WisePoint.Utils.GetSearchResultField(result, "JobTitle");
                var pa = WisePoint.Utils.GetSearchResultField(result, "Path");
                var em = WisePoint.Utils.GetSearchResultField(result, "WorkEmail");
                var dept = WisePoint.Utils.GetSearchResultField(result, "Department");
                var pn = WisePoint.Utils.GetSearchResultField(result, "PreferredName");
                       
                var displayName = (ln == null || fn == null) ? pn : ln + " " + fn.toUpperCase();// WisePoint.Utils.GetSearchResultField(result, "PreferredName");
                var pic = viewModel.HostWebUrl + "/_layouts/15/userphoto.aspx?accountname=" + encodeURIComponent(an) + (viewModel.HighDefinitionPhotos ? "&size=L" : "&size=M");

                return new WisePoint.PeopleSearch.Models.SearchResult(ln, fn, displayName, ti, pa, em, dept, pic);

            }).ToArray();

            //display each result one after the other
            viewModel.RecDisplayResults(results, 0);

        }
        else {
            //empty result set
            //hide spinner
            viewModel.IsLoading(false);
            viewModel.IsPerformingReset(false);
        }

        viewModel.CurrentRequest = null;

    };

    //recursive function that will be called for each search result, ensuring they are displayed one by one
    this.RecDisplayResults = function (contacts, index) {

        if (viewModel.IsPerformingReset())
            return;

        //stop recursion
        if (contacts.length <= index) {
            //hide spinner
            viewModel.IsLoading(false);
            viewModel.ShowMoreResultsIfScrolledDown();
            return;
        }

        //Display one search result
        var contact = contacts[index];
        viewModel.SearchResults.push(contact);

        //Display next contact
        setTimeout(function () { viewModel.RecDisplayResults(contacts, index + 1); }, 50);

    };

    //handle a search query error
    this.OnError = function (err) {
        if (err.statusText === "abort") {
            viewModel.CurrentRequest = null;
            return;
        }

        WisePoint.Utils.Log("AJAX ERROR : " + err.status + " " + err.statusText);
        WisePoint.Utils.Log(err.responseText);
        viewModel.CurrentRequest = null;
        viewModel.IsLoading(false);
        viewModel.IsPerformingReset(false);
    };

    //called when a search result is bound, handles image resizing and positioning depending on its real size
    this.AfterAddContact = function (elem) {
        if (elem.nodeType === 1) {
            $(elem).find("img").one('load', function () {

                try{
                var img = $(this);
                              
                var imgWidth = (typeof (img[0].naturalWidth) != "undefined") ? img[0].naturalWidth : img[0].width;
                var imgHeight = (typeof (img[0].naturalHeight) != "undefined") ? img[0].naturalHeight : img[0].height;

                //initially all images have a margin-left 200, for images that do not need to be resized, simply reset the margin-left
                if (imgWidth === imgHeight && imgWidth === 150) {
                    img.attr("style", 'margin-left:0');
                    return;
                }

                img.attr("style", (imgWidth > imgHeight) ?
                              ("height:150px;margin-left:" + Math.floor(-(((150 * imgWidth / imgHeight) - 150) / 2)) + "px") :
                              ("margin-left:0;width:150px;margin-top:" + Math.floor(-(((150 * imgHeight / imgWidth) - 150) / 2)) + "px"));

                } catch (e) {
                    WisePoint.Utils.Log(e.toString());
                }
            });
        }
    };

    //called when a search result is removed from the view
    this.BeforeRemoveContact = function (elem) {
        if (elem.nodeType === 1) $(elem).stop().hide().remove();
    };

    //Search box management
    this.SearchBoxClass = ko.pureComputed(function () {
        return viewModel.SearchBoxFocused() ? "ms-srch-sbLarge ms-srch-sb-borderFocused" : "ms-srch-sbLarge ms-srch-sb-border";
    }, viewModel);

    //handles a keypress in the search box
    this.SearchBoxKeyPress = function (viewModel, e) {
        if (e.keyCode === 13) {
            viewModel.ResetSearch();
            return false;
        } else
            return true;
    }
    
    //indicates whether the app is performing the first search
    this.IsLoadingFirstResults = ko.pureComputed(function () {
        return viewModel.IsLoading() && viewModel.RowCount() === 0 && viewModel.IsPerformingReset();
    });
    this.IsNotLoadingFirstResults = ko.pureComputed(function () {
        return !viewModel.IsLoadingFirstResults();
    });

    //indicates whether the app is currently pulling more results for current search
    this.IsLoadingMoreResults = ko.pureComputed(function () {
        return viewModel.IsLoading() && !viewModel.IsPerformingReset();
    });

    //returns true if search has results
    this.HasResults = ko.pureComputed(function () {
        return viewModel.TotalRows() > 0;;
    });

    //returns true if search is complete and has no result
    this.NoResult = ko.pureComputed(function () {
        return !viewModel.IsLoading() && viewModel.TotalRows() === 0;
    });

    //used to say if the "no refiners available" text should be displayed
    this.NoRefinerAvailable = ko.pureComputed(function () {
        return !viewModel.IsLoading() && (viewModel.RefinerGroups().length === 0)
    });

    //called when it's needed to pull more results
    this.ShowMoreResults = function () {
        viewModel.Search(false);
    };

    //resets refiners and performs a search
    this.ResetSearch = function () {
        viewModel.RefinerGroups.removeAll();
        viewModel.ActiveRefiners.removeAll();
        viewModel.Search(true);
    };

    //infinite scroll
    this.ScrollableArea.scroll(function () {
        viewModel.ShowMoreResultsIfScrolledDown();
    });

    //returns true if it's necessary to pull next results page
    this.ShowMoreResultsIfScrolledDown = function () {
        if (!viewModel.IsLoading() && viewModel.HasMoreResults() && (viewModel.ScrollableArea.outerHeight() + 320 >= (viewModel.ScrollableArea.get(0).scrollHeight - viewModel.ScrollableArea.scrollTop())))
            viewModel.ShowMoreResults();
    }
    
    //displays search results count
    this.ResultsHeaderText = ko.computed(function () {
        switch (viewModel.TotalRows()) {
            case 0:
                return WisePoint.PeopleSearch.Resources.Current.NoResult;
                break;
            case 1:
                return WisePoint.PeopleSearch.Resources.Current.ResultsCount1;
                break;
            default:
                return WisePoint.PeopleSearch.Resources.Current.ResultsCount.replace(/\{0\}/gi, viewModel.TotalRows());
                break;
        }
    });

    //Initializes the app
    this.Initialize = function (onSuccess, onFail) {

        ExecuteOrDelayUntilScriptLoaded(function () {

            var clientContext = new SP.ClientContext.get_current();
            var oWeb = clientContext.get_web();

            //retrieve app settings
            var webProperties = oWeb.get_allProperties();
            clientContext.load(webProperties);

            //check if user is admin
            var oPerm = new SP.BasePermissions();
            oPerm.set(SP.PermissionKind.manageWeb);
            var bCanManageWeb = oWeb.doesUserHavePermissions(oPerm);

            //Call the executeQueryAsync again to execute any pending operations
            clientContext.executeQueryAsync(Function.createDelegate(this, function (sender, args) {
                    
                    var properties = webProperties.get_fieldValues();

                    if (typeof (properties.MainPageTitle) != 'undefined')
                        viewModel.PageTitle(properties.MainPageTitle);
                    else
                        viewModel.PageTitle(WisePoint.PeopleSearch.Resources.Current.DefaultMainPageTitle);
                    if (typeof (properties.SortResults) != 'undefined')
                        viewModel.SortResults = (properties.SortResults === "1");
                    if (typeof (properties.HighDefinitionPhotos) != 'undefined')
                        viewModel.HighDefinitionPhotos = (properties.HighDefinitionPhotos === "1");
                    if (typeof (properties.ResultsPerQuery) != 'undefined')
                        viewModel.ResultsPerQuery = properties.ResultsPerQuery;
                    if (typeof (properties.AppendWildcard) != 'undefined')
                        viewModel.AppendWildcard = (properties.AppendWildcard === "1");
                    if (typeof (properties.AppendedQuery) != 'undefined')
                        viewModel.AppendedQuery = properties.AppendedQuery;
                    if (typeof (properties.Refiners) != 'undefined')
                        viewModel.Refiners(properties.Refiners);
                    if (typeof (properties.ResultSourceId) != 'undefined')
                        viewModel.ResultSourceId(properties.ResultSourceId);

                    //check if user has manage web permission
                    viewModel.IsAdminUser(bCanManageWeb.get_value());

                    //display the app content
                    viewModel.Initialized(true);

                    //perform initial search
                    viewModel.ResetSearch();

                }),
                Function.createDelegate(this, function (sender, args) {

                    //display the app content
                    viewModel.Initialized(true);

                    //cannot determine if current user is admin
                    WisePoint.Utils.log("ERROR : Failed to load web properties : " + args);
                    viewModel.ResetSearch();
                }));

            

        }, "sp.js");

    };

    //Initialization  
    this.Initialize();

};

///#source 1 1 /Scripts/ViewModels/SettingsPage.js
"use strict";

window.WisePoint = window.WisePoint || {};
WisePoint.Utils = WisePoint.Utils || {};
WisePoint.PeopleSearch = WisePoint.PeopleSearch || {};
WisePoint.PeopleSearch.Resources = WisePoint.PeopleSearch.Resources || {};
WisePoint.PeopleSearch.Models = WisePoint.PeopleSearch.Models || {};
WisePoint.PeopleSearch.ViewModels = WisePoint.PeopleSearch.ViewModels || {};


WisePoint.PeopleSearch.ViewModels.SettingsPage = function () {

    var viewModel = this;

    //label settings
    this.AppTitle = ko.observable("WisePoint People Search");
    this.IsAppTitleInvalid = ko.observable(false);
    this.MainPageTitle = ko.observable(WisePoint.PeopleSearch.Resources.Current.DefaultMainPageTitle);

    //search settings
    this.SortResults = ko.observable(false);
    this.HighDefinitionPhotos = ko.observable(true);
    this.ResultsPerQuery = ko.observable(50);
    this.AppendWildcard = ko.observable(false);
    this.ResultSourceId = ko.observable("B09A7990-05EA-4AF9-81EF-EDFAB16C4E31");
    this.AppendedQuery = ko.observable("-AccountName:_spo* -AccountName:app@sharepoint -AccountName:#ext#");
    this.Refiners = ko.observable(WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryRefinersDefaultValue);
    this.Updating = ko.observable(false);
    this.Loaded = ko.observable(false); 

    this.ResultsPerQueryInt = ko.pureComputed(function () {
        try {
            return parseInt(viewModel.ResultsPerQuery());
        } catch (e) {
            return -1;
        }
    }, this);

    this.IsResultsPerQueryValid = ko.pureComputed(function () {
        try {
            var value = viewModel.ResultsPerQueryInt();
            return value >= 5 && value <= 100;
        } catch (e) {
            return false;
        }
    }, this);

    this.IsResultsPerQueryInvalid = ko.pureComputed(function () {
        return !viewModel.IsResultsPerQueryValid();
    }, this);

    this.IsValid = ko.pureComputed(function () {
        return viewModel.IsResultsPerQueryValid();
    }, this);

    this.Load = function () {

        var ctx = SP.ClientContext.get_current();
        var web = ctx.get_web();
        ctx.load(web);
        var webProperties = web.get_allProperties();
        ctx.load(webProperties);

        ctx.executeQueryAsync(
                Function.createDelegate(this, function (sender, args) {

                    viewModel.AppTitle(web.get_title());

                    var properties = webProperties.get_fieldValues();
                    if (typeof (properties.MainPageTitle) != 'undefined')
                        viewModel.MainPageTitle(properties.MainPageTitle);
                    if (typeof (properties.SortResults) != 'undefined')
                        viewModel.SortResults(properties.SortResults === "1");
                    if (typeof (properties.HighDefinitionPhotos) != 'undefined')
                        viewModel.HighDefinitionPhotos(properties.HighDefinitionPhotos === "1");
                    if (typeof (properties.ResultsPerQuery) != 'undefined')
                        viewModel.ResultsPerQuery(properties.ResultsPerQuery);
                    if (typeof (properties.AppendWildcard) != 'undefined')
                        viewModel.AppendWildcard(properties.AppendWildcard === "1");
                    if (typeof (properties.AppendedQuery) != 'undefined')
                        viewModel.AppendedQuery(properties.AppendedQuery);
                    if (typeof (properties.Refiners) != 'undefined')
                        viewModel.Refiners(properties.Refiners);
                    if (typeof (properties.ResultSourceId) != 'undefined')
                        viewModel.ResultSourceId(properties.ResultSourceId);

                    viewModel.Loaded(true);
                    

                }),
                Function.createDelegate(this, function (sender, args) {
                    //cannot determine if current user is admin
                    WisePoint.Utils.log("ERROR : Failed to load properties. " + args);
                    WisePoint.Utils.DisplayErrorMessage(WisePoint.PeopleSearch.Resources.Current.ErrorLoadingProperties);
                }));

    };

    this.Update = function () {

        if (!viewModel.IsValid()) {
            return;
        }

        viewModel.Updating(true);

        var clientContext = new SP.ClientContext.get_current();
        var web = clientContext.get_web();
        var webProperties = web.get_allProperties();

        web.set_title(viewModel.AppTitle());
        webProperties.set_item("MainPageTitle", viewModel.MainPageTitle());
        webProperties.set_item("SortResults", viewModel.SortResults() ? "1" : "0");
        webProperties.set_item("HighDefinitionPhotos", viewModel.HighDefinitionPhotos() ? "1" : "0");
        webProperties.set_item("ResultsPerQuery", viewModel.ResultsPerQueryInt());
        webProperties.set_item("AppendWildcard", viewModel.AppendWildcard() ? "1" : "0");
        webProperties.set_item("AppendedQuery", viewModel.AppendedQuery());
        webProperties.set_item("ResultSourceId", viewModel.ResultSourceId());
        webProperties.set_item("Refiners", viewModel.Refiners());
        web.update();

        clientContext.executeQueryAsync(Function.createDelegate(this, function () {
            window.location = "Default.aspx" + WisePoint.Utils.GetQueryString();
        }),
        Function.createDelegate(this, function () {
            viewModel.Updating(false);
            WisePoint.Utils.DisplayErrorMessage(WisePoint.PeopleSearch.Resources.Current.ErrorUpdatingProperties);
        }));

    };

    this.Cancel = function () {
        window.location = "Default.aspx" + WisePoint.Utils.GetQueryString();
    };

    //Initialization
    this.Load();

}

