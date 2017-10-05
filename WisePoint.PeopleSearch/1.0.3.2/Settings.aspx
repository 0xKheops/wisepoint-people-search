<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:CssRegistration ID="CssRegistration1" runat="server" EnableCssTheming="true" name="themable/searchv15.css" After="corev15.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/App.1.0.3.2.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/font-awesome/css/font-awesome.min.css" />
    
    <!-- SharePoint Framework -->
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>

    <!-- External libraries -->
    <script type="text/javascript" src="../Scripts/External/linq.min.js"></script>
    <script type="text/javascript" src="../Scripts/External/jquery-3.1.1.min.js"></script>
    <script type="text/javascript" src="../Scripts/External/knockout-3.4.1.js"></script>

   <!-- WisePoint.PeopleSearch Framework for debug 
    <script type="text/javascript" src="../Scripts/Common/WisePoint.Utils.js"></script>
    <script type="text/javascript" src="../Scripts/Common/Resources.js"></script>
    <script type="text/javascript" src="../Scripts/Models/ActiveRefiner.js"></script>
    <script type="text/javascript" src="../Scripts/Models/RefinerEntry.js"></script>
    <script type="text/javascript" src="../Scripts/Models/RefinerGroup.js"></script>
    <script type="text/javascript" src="../Scripts/Models/SearchResult.js"></script>
    <script type="text/javascript" src="../Scripts/ViewModels/MainPage.js"></script>
    <script type="text/javascript" src="../Scripts/ViewModels/SettingsPage.js"></script>-->
      <!--WisePoint.PeopleSearch Framework Bundled -->
         <script type="text/javascript" src="../Scripts/WisePoint.PeopleSearch.1.0.3.2.min.js"></script> 

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server"><span data-bind="text:WisePoint.PeopleSearch.Resources.Current.AppSettings"></span></asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="PlaceHolderLeftNavBar" runat="server">
    <div>&nbsp;</div>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <div style="float: left">
        <table width="100%" class="ms-propertysheet" border="0" cellspacing="0" cellpadding="0" data-bind="visible:Loaded" style="display:none;">
            <tbody>

                <tr>
                    <td height="1" class="ms-sectionline" colspan="2"><img width="1" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                </tr>
                <tr>
                    <td class="ms-formdescriptioncolumn-wide" valign="top" style="width:600px">
                        <table width="100%" border="0" cellspacing="0" cellpadding="1" summary="">
                            <tbody>
                                <tr>
                                    <td height="22" class="ms-sectionheader" valign="top" style="padding-top: 4px;" colspan="2">
                                        <h3 class="ms-standardheader ms-inputformheader"><span data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionLabels"></span></h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="ms-descriptiontext ms-inputformdescription" data-bind="html: WisePoint.PeopleSearch.Resources.Current.SettingsSectionLabelsDescription">
						            </td>
                                    <td><img width="8" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                                <tr><td colspan="2"><img width="150" height="19" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td></tr>
                            </tbody>
                        </table>
                    </td>
                    <td align="left" class="ms-authoringcontrols ms-inputformcontrols" valign="top">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" summary="">
                            <tbody>
                                <tr>
                                    <td width="9"><img width="9" height="7" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                    <td><img width="150" height="7" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                    <td width="10"><img width="10" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td class="ms-authoringcontrols">
                                        <table width="100%" class="ms-authoringcontrols" border="0" cellspacing="0" cellpadding="0" summary="">
                                            <tbody>
                                                <tr>
                                                    <td class="ms-authoringcontrols" colspan="2">
                                                        <span ></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2"><img width="1" height="3" style="display: block;" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                                </tr>
                                                <!-- End Right_Text -->
                                                <tr>
                                                    <td width="11"><img width="11" height="1" style="display: block;" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                                    <td width="99%" class="ms-authoringcontrols">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="2">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="ms-authoringcontrols" nowrap="nowrap">
                                                                        <p style="margin-bottom:2px" data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionLabelsAppTitle"></p>
                                                                        <div style="margin-left:10px">
                                                                            <span data-bind="attr: { title: WisePoint.PeopleSearch.Resources.Current.SettingsSectionLabelsAppTitle }"><input style="width:367px" type="text" data-bind="value: AppTitle, enable: Loaded, valueUpdate: 'afterkeydown'"></span>
                                                                            <div style="color:red;display:none" data-bind="visible: IsAppTitleInvalid, text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionLabelsAppTitleValidationError"></div>
                                                                        </div>
                                                                        <p style="margin-bottom:2px" data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionLabelsPageTitle"></p>
                                                                        <div style="margin-left:10px">
                                                                            <span data-bind="attr: { title: WisePoint.PeopleSearch.Resources.Current.SettingsSectionLabelsPageTitle }"><input style="width:367px" type="text" data-bind="    value: MainPageTitle, enable: Loaded, valueUpdate: 'afterkeydown'"></span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2"><img width="1" height="6" style="display: block;" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td width="10"><img width="10" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><img width="150" height="13" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>


                <tr>
                    <td height="1" class="ms-sectionline" colspan="2"><img width="1" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                </tr>
                <tr>
                    <td class="ms-formdescriptioncolumn-wide" valign="top" style="width:600px">
                        <table width="100%" border="0" cellspacing="0" cellpadding="1" summary="">
                            <tbody>
                                <tr>
                                    <td height="22" class="ms-sectionheader" valign="top" style="padding-top: 4px;" colspan="2">
                                        <h3 class="ms-standardheader ms-inputformheader"><span data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSortResults"></span></h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="ms-descriptiontext ms-inputformdescription" data-bind="html: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSortResultsDescription">
						            </td>
                                    <td><img width="8" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                                <tr><td colspan="2"><img width="150" height="19" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td></tr>
                            </tbody>
                        </table>
                    </td>
                    <td align="left" class="ms-authoringcontrols ms-inputformcontrols" valign="top">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" summary="">
                            <tbody>
                                <tr>
                                    <td width="9"><img width="9" height="7" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                    <td><img width="150" height="7" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                    <td width="10"><img width="10" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td class="ms-authoringcontrols">
                                        <table width="100%" class="ms-authoringcontrols" border="0" cellspacing="0" cellpadding="0" summary="">
                                            <tbody>
                                                <tr>
                                                    <td class="ms-authoringcontrols" colspan="2">
                                                        <span ></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2"><img width="1" height="3" style="display: block;" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                                </tr>
                                                <!-- End Right_Text -->
                                                <tr>
                                                    <td width="11"><img width="11" height="1" style="display: block;" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                                    <td width="99%" class="ms-authoringcontrols">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="2">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="ms-authoringcontrols" nowrap="nowrap">
                                                                        <div style="margin-left:10px">
                                                                            <span data-bind="attr: { title: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSortResultsCheckboxLabel }"><input id="chkActivateSort" type="checkbox" data-bind="    checked: SortResults, enable: Loaded"><label for="chkActivateSort" data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSortResultsCheckboxLabel"></label></span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2"><img width="1" height="6" style="display: block;" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td width="10"><img width="10" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><img width="150" height="13" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td height="1" class="ms-sectionline" colspan="2"><img width="1" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                </tr>   <tr>
                    <td class="ms-formdescriptioncolumn-wide" valign="top" style="width:600px">
                        <table width="100%" border="0" cellspacing="0" cellpadding="1" summary="">
                            <tbody>
                                <tr>
                                    <td height="22" class="ms-sectionheader" valign="top" style="padding-top: 4px;" colspan="2">
                                        <h3 class="ms-standardheader ms-inputformheader" data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQuery" ></h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="ms-descriptiontext ms-inputformdescription" data-bind="html: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryDescription"></td>
                                    <td><img width="8" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                                <tr><td colspan="2"><img width="150" height="19" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td></tr>
                            </tbody>
                        </table>
                    </td>
                    <td align="left" class="ms-authoringcontrols ms-inputformcontrols" valign="top">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" summary="">
                            <tbody>
                                <tr>
                                    <td width="9"><img width="9" height="7" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                    <td><img width="150" height="7" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                    <td width="10"><img width="10" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td class="ms-authoringcontrols">
                                        <table width="100%" class="ms-authoringcontrols" border="0" cellspacing="0" cellpadding="0" summary="">
                                            <tbody>
                                                <tr>
                                                    <td class="ms-authoringcontrols" colspan="2">
                                                        <span ></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2"><img width="1" height="3" style="display: block;" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                                </tr>
                                                <!-- End Right_Text -->
                                                <tr>
                                                    <td width="11"><img width="11" height="1" style="display: block;" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                                    <td width="99%" class="ms-authoringcontrols">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="2">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="ms-authoringcontrols" nowrap="nowrap">
                                                                        <p style="margin-bottom:2px" data-bind="text:WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryResultsPerQueryHeader"></p>
                                                                        <div style="margin-left:10px">
                                                                            <span data-bind="attr: { title: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryResultsPerQueryTitle }"><input style="width:367px" type="text" data-bind="value: ResultsPerQuery, enable: Loaded, valueUpdate: 'afterkeydown'"></span>
                                                                            <div style="color:red;display:none" data-bind="visible: IsResultsPerQueryInvalid, text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryResultsPerQueryValidationError">Value must be between 5 and 100</div>
                                                                        </div>
                                                                        <p style="margin-bottom:2px" data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryAppendWildcardHeader"></p>
                                                                        <div style="margin-left:10px">
                                                                            <span data-bind="attr: { title: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryAppendWildcardTitle }"><input id="chkAppendWildcard" type="checkbox"  data-bind="    checked: AppendWildcard, enable: Loaded"><label for="chkAppendWildcard" data-bind="    text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryAppendWildcardTitle"></label></span>
                                                                        </div>
                                                                        <p style="margin-bottom:2px" data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryHiddenConstraintHeader"></p>
                                                                        <div style="margin-left:10px">
                                                                            <span data-bind="attr: { title: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryHiddenConstraintTitle }"><textarea rows="5" cols="50" data-bind="value: AppendedQuery, enable: Loaded, valueUpdate: 'afterkeydown'" ></textarea></span>
                                                                        </div>
                                                                        <p style="margin-bottom:2px" data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryRefinersHeader"></p>
                                                                        <div style="margin-left:10px">
                                                                            <span data-bind="attr: { title: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryRefinersTitle }"><textarea rows="5" cols="50" data-bind="value: Refiners, enable: Loaded, valueUpdate: 'afterkeydown'" ></textarea></span>
                                                                        </div>
                                                                        <p style="margin-bottom:2px" data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryResultSourceHeader"></p>
                                                                        <div style="margin-left:10px">
                                                                            <span data-bind="attr: { title: WisePoint.PeopleSearch.Resources.Current.SettingsSectionSearchQueryResultSourceTitle }"><input style="width:367px" type="text" data-bind="    value: ResultSourceId, enable: Loaded, valueUpdate: 'afterkeydown'"></span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr id="Tr1">
                                                    <td colspan="2"><img width="1" height="6" style="display: block;" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td width="10"><img width="10" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><img width="150" height="13" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                    <td></td>
                                </tr>

                            </tbody>
                        </table>
                    </td>
                </tr>

                <tr>
                    <td height="1" class="ms-sectionline" colspan="2"><img width="1" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                </tr>
                <tr>
                    <td class="ms-formdescriptioncolumn-wide" valign="top">
                        <table width="100%" border="0" cellspacing="0" cellpadding="1" summary="">
                            <tbody>
                                <tr>
                                    <td height="22" class="ms-sectionheader" valign="top" style="padding-top: 4px;" colspan="2">
                                        <h3 class="ms-standardheader ms-inputformheader" data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionPhotos"></h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="ms-descriptiontext ms-inputformdescription" data-bind="html: WisePoint.PeopleSearch.Resources.Current.SettingsSectionPhotosDescription">
                                    </td>
                                    <td><img width="8" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                                <tr>
                                    <td colspan="2"><img width="150" height="19" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                    <td align="left" class="ms-authoringcontrols ms-inputformcontrols" valign="top">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" summary="">
                            <tbody>
                                <tr>
                                    <td width="9">
                                        <img width="9" height="7" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>

                                    <td>
                                        <img width="150" height="7" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>

                                    <td width="10">
                                        <img width="10" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td class="ms-authoringcontrols">
                                        <table width="100%" class="ms-authoringcontrols" border="0" cellspacing="0" cellpadding="0" summary="">
                                            <tbody>
                                                <tr>
                                                    <td class="ms-authoringcontrols" colspan="2">
                                                        <span></span>
                                                    </td>
                                                </tr>
                                                <tr id="ctl00_PlaceHolderMain_EnableRssSection_ctl01_tablerow2">
                                                    <td><img width="1" height="3" style="display: block;" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                                </tr>
                                                <!-- End Right_Text -->
                                                <tr>
                                                    <td width="11"><img width="11" height="1" style="display: block;" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                                    <td width="99%" class="ms-authoringcontrols">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="2">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="ms-authoringcontrols" nowrap="nowrap">
                                                                        <p style="margin-bottom:2px" data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionPhotosHighDefPhotosHeader"></p>
                                                                        <div style="margin-left:10px">
                                                                            <span title="Display high definition photos" data-bind="attr: { title: WisePoint.PeopleSearch.Resources.Current.SettingsSectionPhotosHighDefPhotosTitle }"><input id="chkHighDefinitionPictures" type="checkbox"  data-bind="    checked: HighDefinitionPhotos, enable: Loaded"><label for="chkHighDefinitionPictures" data-bind="text: WisePoint.PeopleSearch.Resources.Current.SettingsSectionPhotosHighDefPhotosTitle"></label></span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr id="ctl00_PlaceHolderMain_EnableRssSection_ctl01_tablerow5">
                                                    <td colspan="2"><img width="1" height="6" style="display: block;" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td width="10"><img width="10" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><img width="150" height="13" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td><td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td height="2" class="ms-sectionline" colspan="2"><img width="1" height="1" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                </tr>

                <tr>
                    <td height="10" class="ms-descriptiontext" colspan="2"><img width="1" height="10" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <table width="100%" cellspacing="0" cellpadding="0">
                            <colgroup>
                                <col width="99%">
                                <col width="1%">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td>&nbsp;</td>
                                    <td nowrap="nowrap">
                                        <img class="ms-verticalAlignMiddle" id="imgProgress" data-bind="visible:Updating" onclick="javascript:this.style.display='none';" src="/_layouts/15/images/loadingcirclests16.gif?rev=23">
                                        <input class="ms-ButtonHeightWidth" id="btnApply" accesskey="o" type="submit" value="OK" data-bind="click: Update, enable: IsValid, value: WisePoint.PeopleSearch.Resources.Current.SettingsButtonOk">
                                        <input class="ms-ButtonHeightWidth" id="btnCancel" accesskey="C" type="button" value="Annuler" data-bind="click: Cancel, value: WisePoint.PeopleSearch.Resources.Current.SettingsButtonCancel">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td height="40" class="ms-descriptiontext s4-notdlg" colspan="2"><img width="1" height="40" alt="" src="/_layouts/15/images/blank.gif?rev=23"></td>
                </tr>
            </tbody>
        </table>

    </div>

    <script type="text/javascript">
        $(document).ready(function () {

            //binds UI to the Settings ViewModel
            var vm = new WisePoint.PeopleSearch.ViewModels.SettingsPage();
            ko.applyBindings(vm);

            //check for required refresh of FormDigest every 10 seconds
            setInterval(function () {
                UpdateFormDigest(_spPageContextInfo.webServerRelativeUrl, _spFormDigestRefreshInterval);
            }, 10000);

        });
    </script>

</asp:Content>
