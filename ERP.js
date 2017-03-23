/**
 
 * Code By      : Dhanissh
 * Created Date : 06/03/2017
 * Modified Date: 22/03/2017
 * Purpose      : Get script for Component dependency & Date time arugments
 */

//Purpose: Hide & Show Text Field
function ShowandHide() {
    if ($('#moveTypeVesselIgmHdr').val() !== '2ND PNR') {
        $('#cfsNameVesselIgmHdrAC').hide(); 
        $('#cfsNameVesselIgmHdrAC').removeClass('isMandatory');                                         
        $("label[for='cfsNameVesselIgmHdrAC']").hide();
        $("label[for='cfsNameVesselIgmHdrAC']").removeClass('required');
    }
    else {
        $('#cfsNameVesselIgmHdrAC').show();
        $("label[for='cfsNameVesselIgmHdrAC']").show();
    }
    $('#moveTypeVesselIgmHdr').change(function () {
        if ($('#moveTypeVesselIgmHdr').val() === '2ND PNR') {
            $('#cfsNameVesselIgmHdrAC').show();
            $("label[for='cfsNameVesselIgmHdrAC']").show();
            $("#vesselIgmFilingDPDMovementDtlListTab").show();
             $("label[for='cfsNameVesselIgmHdrAC']").addClass('required');
              $('#cfsNameVesselIgmHdrAC').addClass('isMandatory');    
        }
        else if ($('#moveTypeVesselIgmHdr').val() === 'EN BLOCK') {
            $("#vesselIgmFilingDPDMovementDtlListTab").hide();
        }
        else {
            $('#cfsNameVesselIgmHdrAC').hide();
            $("label[for='cfsNameVesselIgmHdrAC']").hide();
              $("label[for='cfsNameVesselIgmHdrAC']").removeClass('required');
              $('#cfsNameVesselIgmHdrAC').removeClass('isMandatory');    
            $("#vesselIgmFilingDPDMovementDtlListTab").show();

        }
    });
//Purpose: Arrival Date & Berth Date condition
function changeDateFormat(date) {
        date = date.toString();
        if (date.indexOf("/") != -1);
        {
            var d = parseInt(date.substring(0, 2), 10);
            var m = parseInt(date.substring(3, 5), 10);
            var y = parseInt(date.substring(6, 10), 10);
            var result = new Date(y, m - 1, d);
            return result;
        }
    }
    $("#vesselArrivalDatetimeVesselIgmHdr").on("dp.change", function (e) {
        $('#vesselBerthDatetimeVesselIgmHdr').data("DateTimePicker").minDate(e.date);
    });
    $("#vesselBerthDatetimeVesselIgmHdr").on("dp.change", function (e) {
        $('#vesselArrivalDatetimeVesselIgmHdr').data("DateTimePicker").maxDate(e.date);
    });
//Matches only with today date for ARRIVAL  DATE & TIME      
    $('#vesselArrivalDatetimeVesselIgmHdr').datetimepicker({
        maxDate: moment()
    }).on('dp.show', function () {
        $('#vesselArrivalDatetimeVesselIgmHdr').data("DateTimePicker").maxDate(moment());
    });
//Purpose: Arrival Date & IGM Date condition
    $("#vesselArrivalDatetimeVesselIgmHdr").on("dp.change", function (e) {
        $('#igmDateVesselIgmHdr').data("DateTimePicker").maxDate(e.date);
        var igmDateVessel = changeDateFormat($('#igmDateVesselIgmHdr').val());
        var vesselArrival = changeDateFormat($('#vesselArrivalDatetimeVesselIgmHdr').val());
        if (vesselArrival < igmDateVessel)
        {
            $('#igmDateVesselIgmHdr').attr('placeholder', "IGM DATE CANNOT BE GREATER THAN ARRIVAL DATE");
            $('#igmDateVesselIgmHdr').val("");
        }
    });
    $("#igmDateVesselIgmHdr").on("dp.change", function (e) {
        $('#vesselArrivalDatetimeVesselIgmHdr').data("DateTimePicker").maxDate(e.date);

    });
////Purpose: Hide Save Button Until Summary Tab clicked
    $("#SaveButton").attr("disabled", true);
    $("#SaveButton").addClass("Button_Disabled");
    $("[aria-labelledby='ui-id-5']").click(function () {
        $("#SaveButton").removeAttr("disabled", false);
        $("#SaveButton").removeClass("Button_Disabled");
    });

//Purpose: AutoClear Terminal Field when Reselect's Discharge Port
    $('#dischargePortNameVesselIgmHdrAC').keydown(function () {
        $('#terminalNameVesselIgmHdrAC').val("");
    });
 ////Purpose: Fire Alert message when atleast one row is not selected to delete
 $("input[type='checkbox']").addClass("DataTable_Checkbox");
 var check =$(".DataTable_Checkbox").prop("checked");
    infoAlert(check);
 if(check===false){
     $(".removeBtn").click (function(){
     infoAlert('Error',"Please select atleast one row to delete");
 });
 }
    function infoAlert(title, msg)
{
    $.msgBox({
        title: title,
        content: msg,
        type: "info"
    });
}
    
}