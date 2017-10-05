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