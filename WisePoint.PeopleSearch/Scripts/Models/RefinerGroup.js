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
