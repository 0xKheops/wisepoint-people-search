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