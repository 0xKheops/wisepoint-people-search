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
