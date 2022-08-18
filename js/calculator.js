var calculationType = '';
var sponsorStatus = '';
var principalStatus = '';
var sponsorChildCount = 0;
var principalChildCount = 0;
var previousSponsor = 0;
var previousPartnerSponsor = 0;
var errorTable = [];
var resultTable = [];
var displarResultsHTMLTable = '';
var serialNo = 1;

//variables
var yourName = '';
var yourStatus = '';
var partnerName = '';
var yearInputSponsorChange = '';

$('#optionsCalc-div').on('change', () => {
  calculationType = $('input[name=optionsCalc]:checked').val();
});
$('#spouseDetails').on('change', () => {
  partnerName = $('input[name=partnerName]').val();
  yearInputSponsorChange = $('input[id=yearInputSponsorChange]').val();
});
// $('#seperatedPartnerDetails').on('change', () => {
//   yourName = $('input[name=sponsorName]').val();
//   yourStatus = $('input[name=optionsSponsorStatus]:checked').val();
// });

$('#sponsorDetails').on('change', () => {
  yourName = $('input[name=sponsorName]').val();
  yourStatus = $('input[name=optionsSponsorStatus]:checked').val();
  sponsorStatus = $('input[name=optionsSponsorStatus]:checked').val();

  // RULE ON WHAT SELECTION and WHEN TO UNHIDE
  if (sponsorStatus != 'Single') {
    $('#spouseDetails').removeClass('hidden');
    $('#spouseDetails').slideDown();
    if (sponsorStatus === 'Seperated') {
      $('#seperatedPartnerDetails').removeClass('hidden');
      $('#seperatedPartnerDetails').slideDown();
    } else {
      if (!$('#seperatedPartnerDetails').hasClass('hidden')) {
        $('#seperatedPartnerDetails').slideUp();
        $('#seperatedPartnerDetails').addClass('hidden');
      }
    }
    switch (sponsorStatus) {
      case 'Married':
        sponsorStatus = 'Marriage';
        if ($('#sponsorPartnerPrevious').hasClass('hidden2')) {
          $('#sponsorPartnerPrevious').removeClass('hidden2');
        } else {
        }
        break;
      case 'Common-Law':
        sponsorStatus = 'Common-Law';
        if ($('#sponsorPartnerPrevious').hasClass('hidden2')) {
          $('#sponsorPartnerPrevious').removeClass('hidden2');
        } else {
        }
        break;
      case 'Seperated':
        sponsorStatus = 'Seperation';
        if ($('#sponsorPartnerPrevious').hasClass('hidden2')) {
        } else {
          $('#sponsorPartnerPrevious').addClass('hidden2');
        }
        break;
      case 'Divorced':
        sponsorStatus = 'Divorce';
        if ($('#sponsorPartnerPrevious').hasClass('hidden2')) {
        } else {
          $('#sponsorPartnerPrevious').addClass('hidden2');
        }
        break;
      case 'Widowed':
        sponsorStatus = 'Widow';
        if ($('#sponsorPartnerPrevious').hasClass('hidden2')) {
        } else {
          $('#sponsorPartnerPrevious').addClass('hidden2');
        }
        break;
      default:
        sponsorStatus = 'Change';
    }
    $('#typeSponsor').text(sponsorStatus);
  } else {
    if (!$('#spouseDetails').hasClass('hidden')) {
      $('#spouseDetails').slideUp();
      $('#spouseDetails').addClass('hidden');
    }
    if (!$('#seperatedPartnerDetails').hasClass('hidden')) {
      $('#seperatedPartnerDetails').slideUp();
      $('#seperatedPartnerDetails').addClass('hidden');
    }
    if ($('#sponsorPartnerPrevious').hasClass('hidden2')) {
    } else {
      $('#sponsorPartnerPrevious').addClass('hidden2');
    }
  }
});

$(document).on('click', () => {
  console.log(calculationType);
  console.log(sponsorStatus);
});

$('#incChild').on('click', () => {
  console.log('clicked on add');
  sponsorChildCount++;
  $('#numbChildren').text(sponsorChildCount);
  $('#sponsorDependentDetails').append(
    "<span id='primaryDependentSpan" +
      sponsorChildCount +
      "'><div class='row'><div class='col-sm-6'><label class='primaryDependentSpan'>Name of Dependent - " +
      sponsorChildCount +
      " - <input type='text' name='dependentName" +
      sponsorChildCount +
      "' value='' autocomplete='off'></label></div><div class='col-sm-6'><label class=''>Year of Birth of Dependent - " +
      sponsorChildCount +
      " - <input type='number' name='dependentYear" +
      sponsorChildCount +
      "' value='' min='1900' max='2023' autocomplete='off'></label></div></div></span>"
  );
});

$('#decChild').on('click', () => {
  console.log('clicked on add');

  if (sponsorChildCount > 0) {
    sponsorChildCount--;
    $('#primaryDependentSpan' + (sponsorChildCount + 1)).remove();
  }
  $('#numbChildren').text(sponsorChildCount);
});

// $('#incPreviousSponsor').on('click', () => {
//   console.log('clicked on add');
//   // ---> TO CREATE RULE to check year of sponsorhip if applicable
//   previousSponsor++;
//   $('#numbPrevious').text(previousSponsor);
// });

// $('#decPreviousSponsor').on('click', () => {
//   console.log('clicked on add');

//   if (previousSponsor > 0) {
//     previousSponsor--;
//     // ---> TO CREATE RULE to check year of sponsorhip if applicable
//   }
//   $('#numbPrevious').text(previousSponsor);
// });

//---> rules on date not required if Supervisa... create toggle loops on selection of others as well.

$('#principalDetails').on('change', () => {
  principalStatus = $('input[name=optionsPrincipalStatus]:checked').val();

  // RULE ON WHAT SELECTION and WHEN TO UNHIDE
  if (principalStatus != 'Single') {
    $('#principalSpouseDetails').removeClass('hidden');
    $('#principalSpouseDetails').slideDown();
    if (principalStatus === 'Seperated') {
      $('#seperatedPrincipalPartnerDetails').removeClass('hidden');
      $('#seperatedPrincipalPartnerDetails').slideDown();
    } else {
      if (!$('#seperatedPrincipalPartnerDetails').hasClass('hidden')) {
        $('#seperatedPrincipalPartnerDetails').slideUp();
        $('#seperatedPrincipalPartnerDetails').addClass('hidden');
      }
    }
    switch (principalStatus) {
      case 'Married':
        principalStatus = 'Marriage';
        break;
      case 'Common-Law':
        principalStatus = 'Common-Law';
        break;
      case 'Seperated':
        principalStatus = 'Seperation';
        break;
      case 'Divorced':
        principalStatus = 'Divorce';
        break;
      case 'Widowed':
        principalStatus = 'Widow';
        break;
      default:
        principalStatus = 'Change';
    }
    $('#typePrincipal').text(principalStatus);
  } else {
    if (!$('#principalSpouseDetails').hasClass('hidden')) {
      $('#principalSpouseDetails').slideUp();
      $('#principalSpouseDetails').addClass('hidden');
    }
    if (!$('#seperatedPrincipalPartnerDetails').hasClass('hidden')) {
      $('#seperatedPrincipalPartnerDetails').slideUp();
      $('#seperatedPrincipalPartnerDetails').addClass('hidden');
    }
  }
});

// --> change text to reflect dependent children of NAME and Partner NAME... based on input

// Dependent of Principal applicant
$('#incPrincipalChild').on('click', () => {
  principalChildCount++;
  $('#numbPrincipalChildren').text(principalChildCount);
  $('#principalDependentDetails').append(
    "<span id='primaryPrincipalDependentSpan" +
      principalChildCount +
      "'><div class='row'><div class='col-sm-6'><label class='primaryPrincipalDependentSpan'>Name of Dependent - " +
      principalChildCount +
      " - <input type='text' name='dependentPrincipalName" +
      principalChildCount +
      "' value='' autocomplete='off'></label></div><div class='col-sm-6'><label class=''>Year of Birth of Dependent - " +
      principalChildCount +
      " - <input type='number' name='dependentPrincipalYear" +
      principalChildCount +
      "' value='' min='1900' max='2023' autocomplete='off'></label></div></div></span>"
  );
});

$('#decPrincipalChild').on('click', () => {
  if (principalChildCount > 0) {
    principalChildCount--;
    $('#primaryPrincipalDependentSpan' + (principalChildCount + 1)).remove();
  }
  $('#numbPrincipalChildren').text(principalChildCount);
});

// Primary Sponsor Previous Sponsored
$('#incPreviousSponsor').on('click', () => {
  previousSponsor++;
  $('#numbPrevious').text(previousSponsor);
  $('#sponsorPrevious').append(
    "<span id='primaryPreviousSponsor" +
      previousSponsor +
      "'><div class='row'><div class='col-sm-6'><label class='primaryPreviousSponsor'>Name of Sponsored - " +
      previousSponsor +
      " - <input type='text' name='principalPreviousSponsorName" +
      previousSponsor +
      "' value='' autocomplete='off'></label></div><div class='col-sm-6'><label class=''>Year of Sponsorhip - " +
      previousSponsor +
      " - <input type='number' name='principalPreviousSponsorYear" +
      previousSponsor +
      "' value='' min='1900' max='2023' autocomplete='off'></label></div></div></span>"
  );
});

$('#decPreviousSponsor').on('click', () => {
  if (previousSponsor > 0) {
    previousSponsor--;
    $('#primaryPreviousSponsor' + (previousSponsor + 1)).remove();
  }
  $('#numbPrevious').text(previousSponsor);
});

// Primary Partner Sponsor Previous Sponsored
$('#incPreviousPartnerSponsor').on('click', () => {
  previousPartnerSponsor++;
  $('#numbPartnerPrevious').text(previousPartnerSponsor);
  $('#sponsorPartnerPrevious').append(
    "<span id='primaryPartnerPreviousSponsor" +
      previousPartnerSponsor +
      "'><div class='row'><div class='col-sm-6'><label class='primaryPartnerPreviousSponsor'>Name of Sponsored - " +
      previousPartnerSponsor +
      " - <input type='text' name='principalPreviousPartnerSponsorName" +
      previousPartnerSponsor +
      "' value='' autocomplete='off'></label></div><div class='col-sm-6'><label class=''>Year of Sponsorhip - " +
      previousPartnerSponsor +
      " - <input type='number' name='principalPreviousPartnerSponsorYear" +
      previousPartnerSponsor +
      "' value='' min='1900' max='2023' autocomplete='off'></label></div></div></span>"
  );
});

$('#decPreviousPartnerSponsor').on('click', () => {
  if (previousPartnerSponsor > 0) {
    previousPartnerSponsor--;
    $('#primaryPartnerPreviousSponsor' + (previousPartnerSponsor + 1)).remove();
  }
  $('#numbPartnerPrevious').text(previousPartnerSponsor);
});

$('.calculateButtonArea .startHereButton').on('click', () => {
  $('#resultsSection').slideDown('', () => {
    // check errors
    errorTable = [];
    serialNo = 1;
    // Section I
    if (!calculationType) {
      errorTable.push('Section I', 'Calculation type not selected');
      console.log('error 1');
    }
    // Section II
    if (!yourName) {
      errorTable.push('Section II', 'Name of Sponsor not provided');
    }
    if (!yourStatus) {
      errorTable.push('Section II', 'Your status not provided');
    }

    // Section II-1
    if (sponsorStatus != 'Single') {
      if (!partnerName || !yearInputSponsorChange) {
        errorTable.push(
          'Section II-1',
          'Partner Name or Year of relationship change not provided'
        );
      }
    }

    // Section II-2

    // Section III

    // Section IV

    // Section IV-1

    // Section IV-2

    // Section V

    // Section VI

    // Section VI-1

    // display errors

    if (errorTable.length > 0) {
      $('#resultsSection h1').text('Errors');
      $('.endSection').css('color', '#ff0000');
      displarResultsHTMLTable =
        ' <div class="col-sm-6" id="resultsBox"><table class="table table-striped thead-dark"><thead><tr><th scope="col">#</th><th scope="col">Section</th><th scope="col">Error</th></tr></thead><tbody>';

      for (var i = 0; i < errorTable.length; i = i + 2) {
        displarResultsHTMLTable +=
          '<tr><th scope="row">' +
          serialNo +
          '</th><td>' +
          errorTable[i] +
          '</td><td>' +
          errorTable[i + 1] +
          '</td></tr>';
        serialNo++;
      }
      displarResultsHTMLTable += '</tbody></table></div>';
    } else {
      // do calcs

      // list calcs
      $('#resultsSection h1').text('Your Results');
      $('.endSection').css('color', '#54BAB9');
      displarResultsHTMLTable =
        '<div class="col-sm-6" id="resultsBox"><p>All Good</p></div>';
    }

    $('#resultsBox').replaceWith(displarResultsHTMLTable);
    $('html, body').animate(
      { scrollTop: $('#resultsSection').offset().top },
      200
    );
  });

  /// if we change any value - add note that these are outdated results
});
