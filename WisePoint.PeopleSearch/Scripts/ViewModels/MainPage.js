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
