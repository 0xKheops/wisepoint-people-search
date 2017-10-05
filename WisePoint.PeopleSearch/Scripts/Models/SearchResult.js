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