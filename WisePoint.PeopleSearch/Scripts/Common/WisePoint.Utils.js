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
