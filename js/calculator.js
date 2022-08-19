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
var calculationDoneFlag = 0;

//variables
var yourName = '';
var yourStatus = '';
var partnerName = '';
var yearInputSponsorChange = '';
var spePartnerCitizenship = '';
var spePartnerStatus = '';
var sponsorChildArray = [];
var sponsorChildYearArray = [];
var principalName = '';
var principalPartnerName = '';
var yearInputPrincipalChange = '';
var spePrincipalPartnerStatus = '';
var principalChildArray = [];
var principalChildYearArray = [];

var previousSponsorArray = [];
var previousSponsorYearArray = [];
var previousPartnerSponsorArray = [];
var previousPartnerSponsorYearArray = [];

// income Variables

var supervisa2022 = [26620, 33140, 40742, 49466, 56104, 63276, 70448, 7172];
var pgpYear2018 = [40379, 40379, 49641, 60271, 68358, 77095, 85835, 8740];
var pgpYear2019 = [41007, 41007, 50414, 61209, 69423, 78296, 87172, 8876];
var pgpYear2020 = [32270, 32270, 39672, 48167, 54630, 61613, 68598, 6985];

let dollarUS = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'CAD',
});

function checkCalculationFlag() {
  if (!calculationDoneFlag) {
    calculationDoneFlag = 1;
    $('.calculateButtonArea a').text('Update the Income Requirements');
  } else {
    $('#resultsSection h1').text(
      ' Inputs have been changed - Update Calculations'
    );
    $('.endSection').css('color', '#ff0000');
  }
}

$('#optionsCalc-div').on('change', () => {
  calculationType = $('input[name=optionsCalc]:checked').val();
  checkCalculationFlag();
});
$('#spouseDetails').on('change', () => {
  partnerName = $('input[name=partnerName]').val();
  yearInputSponsorChange = $('input[id=yearInputSponsorChange]').val();
  checkCalculationFlag();
});
$('#seperatedPartnerDetails').on('change', () => {
  spePartnerCitizenship = $('input[name=spePartnerCitizenship]:checked').val();
  spePartnerStatus = $('input[name=spePartnerStatus]:checked').val();
  checkCalculationFlag();
});
$('#principalSpouseDetails').on('change', () => {
  principalPartnerName = $('input[name=principalPartnerName]').val();
  yearInputPrincipalChange = $('input[id=yearInputPrincipalChange]').val();
  checkCalculationFlag();
});
$('#seperatedPrincipalPartnerDetails').on('change', () => {
  spePrincipalPartnerStatus = $(
    'input[name=spePrincipalPartnerStatus]:checked'
  ).val();
  checkCalculationFlag();
});
$('#sponsorDetails').on('change', () => {
  yourName = $('input[name=sponsorName]').val();
  yourStatus = $('input[name=optionsSponsorStatus]:checked').val();
  sponsorStatus = $('input[name=optionsSponsorStatus]:checked').val();
  checkCalculationFlag();

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
        sponsorStatus = 'Married';
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
        sponsorStatus = 'Seperated';
        if ($('#sponsorPartnerPrevious').hasClass('hidden2')) {
        } else {
          $('#sponsorPartnerPrevious').addClass('hidden2');
        }
        break;
      case 'Divorced':
        sponsorStatus = 'Divorced';
        if ($('#sponsorPartnerPrevious').hasClass('hidden2')) {
        } else {
          $('#sponsorPartnerPrevious').addClass('hidden2');
        }
        break;
      case 'Widowed':
        sponsorStatus = 'Widowed';
        if ($('#sponsorPartnerPrevious').hasClass('hidden2')) {
        } else {
          $('#sponsorPartnerPrevious').addClass('hidden2');
        }
        break;
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

// $(document).on('click', () => {
//   console.log(calculationType);
//   console.log(sponsorStatus);
// });

$('#incChild').on('click', () => {
  // console.log('clicked on add');
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
  // console.log('clicked on add');

  if (sponsorChildCount > 0) {
    sponsorChildCount--;
    $('#primaryDependentSpan' + (sponsorChildCount + 1)).remove();
  }
  $('#numbChildren').text(sponsorChildCount);
});

$('#sponsorDependentDetails').on('change', () => {
  for (var i = 1; i < sponsorChildCount + 1; i++) {
    sponsorChildArray[i - 1] = $('input[name=dependentName' + i + ']').val();
    sponsorChildYearArray[i - 1] = $(
      'input[name=dependentYear' + i + ']'
    ).val();
  }
  checkCalculationFlag();
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
  principalName = $('input[name=principalName]').val();
  principalStatus = $('input[name=optionsPrincipalStatus]:checked').val();
  checkCalculationFlag();

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
        principalStatus = 'Married';
        break;
      case 'Common-Law':
        principalStatus = 'Common-Law';
        break;
      case 'Seperated':
        principalStatus = 'Seperated';
        break;
      case 'Divorced':
        principalStatus = 'Divorced';
        break;
      case 'Widowed':
        principalStatus = 'Widowed';
        break;
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

$('#principalDependentDetails').on('change', () => {
  for (var i = 1; i < principalChildCount + 1; i++) {
    principalChildArray[i - 1] = $(
      'input[name=dependentPrincipalName' + i + ']'
    ).val();
    principalChildYearArray[i - 1] = $(
      'input[name=dependentPrincipalYear' + i + ']'
    ).val();
  }
  checkCalculationFlag();
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

$('#sponsorPrevious').on('change', () => {
  for (var i = 1; i < previousSponsor + 1; i++) {
    previousSponsorArray[i - 1] = $(
      'input[name=principalPreviousSponsorName' + i + ']'
    ).val();
    previousSponsorYearArray[i - 1] = $(
      'input[name=principalPreviousSponsorYear' + i + ']'
    ).val();
  }
  checkCalculationFlag();
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

$('#sponsorPartnerPrevious').on('change', () => {
  for (var i = 1; i < previousPartnerSponsor + 1; i++) {
    previousPartnerSponsorArray[i - 1] = $(
      'input[name=principalPreviousPartnerSponsorName' + i + ']'
    ).val();
    previousPartnerSponsorYearArray[i - 1] = $(
      'input[name=principalPreviousPartnerSponsorYear' + i + ']'
    ).val();
  }
  checkCalculationFlag();
});

$('.calculateButtonArea .startHereButton').on('click', () => {
  checkCalculationFlag();
  $('#resultsSection').slideDown('', () => {
    // check errors
    errorTable = [];
    serialNo = 1;
    // Section I
    if (!calculationType) {
      errorTable.push('Section I', 'Calculation type not selected');
      // console.log('error 1');
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
    if (sponsorStatus === 'Seperated') {
      if (!spePartnerCitizenship || !spePartnerStatus) {
        errorTable.push(
          'Section II-2',
          'Seperated Partner citizenship or relationship status not provided'
        );
      }
    }

    // Section III
    if (sponsorChildCount > 0) {
      for (var i = 1; i < sponsorChildCount + 1; i++) {
        if (!sponsorChildArray[i - 1] || !sponsorChildYearArray[i - 1]) {
          errorTable.push(
            'Section III',
            'Sponsor"s Dependent - ' +
              i +
              ' -info (Name or Year of Birth) Not available'
          );
        }
      }
    }

    // Section IV
    if (!principalName) {
      errorTable.push('Section IV', 'Name of Principal Applicant not provided');
    }
    // console.log(principalStatus);
    if (!principalStatus) {
      errorTable.push('Section IV', 'Principal Applicant status not provided');
    }

    // Section IV-1
    if (principalStatus != 'Single') {
      if (!principalPartnerName || !yearInputPrincipalChange) {
        errorTable.push(
          'Section IV-1',
          'Parent or Grand Parent - Partner Name or Year of relationship change not provided'
        );
      }
    }

    // Section IV-2
    if (principalStatus === 'Seperated') {
      if (!spePrincipalPartnerStatus) {
        errorTable.push(
          'Section IV-2',
          'For Parent - Seperated Partner relationship status not provided'
        );
      }
    }
    // Section V
    if (principalChildCount > 0) {
      for (var i = 1; i < principalChildCount + 1; i++) {
        if (!principalChildArray[i - 1] || !principalChildYearArray[i - 1]) {
          errorTable.push(
            'Section V',
            'Parent and Grand Parents Dependent - ' +
              i +
              ' -info (Name or Year of Birth) Not available'
          );
        }
      }
    }

    // Section VI
    if (previousSponsor > 0) {
      for (var i = 1; i < previousSponsor + 1; i++) {
        if (!previousSponsorArray[i - 1] || !previousSponsorYearArray[i - 1]) {
          errorTable.push(
            'Section VI',
            'Previously Sponsored by Primary Sponsor - ' +
              i +
              ' -info (Name or Year of Birth) Not available'
          );
        }
      }
    }

    // Section VI-1
    if (previousPartnerSponsor > 0) {
      for (var i = 1; i < previousPartnerSponsor + 1; i++) {
        if (
          !previousPartnerSponsorArray[i - 1] ||
          !previousPartnerSponsorYearArray[i - 1]
        ) {
          errorTable.push(
            'Section VI-1',
            'Previously Sponsored by Primary Sponsors Partner - ' +
              i +
              ' -info (Name or Year of Birth) Not available'
          );
        }
      }
    }
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

      switch (calculationType) {
        case 'SuperVisa2022':
          displarResultsHTMLTable = calcSuperVisa2022();
          // displarResultsHTMLTable =
          //   '<div class="col-sm-6" id="resultsBox"><p>All Good - calcSupervisa2022</p></div>';
          break;
        case 'PGP2021':
          displarResultsHTMLTable = calcPGP2021();
          break;
        case 'PGP2022':
          displarResultsHTMLTable = calcPGP2022();
          break;
      }
      $('#resultsSection h1').text('Your Results');
      $('.endSection').css('color', '#54BAB9');
    }

    $('#resultsBox').replaceWith(displarResultsHTMLTable);
    $('html, body').animate(
      { scrollTop: $('#resultsSection').offset().top },
      200
    );
  });
});

function calcSuperVisa2022() {
  var currYear = 2022;
  var currFamilyCount = 0;
  var requiredIncome = 0;
  var finalNames = [];
  var finalNamesSection = [];
  var finalNamesCount = [];
  var finalCosignNamesCount = [];
  var currCosignFamilyCount = 0;
  var requiredCosignIncome = 0;
  var counter = 0;
  var cosignPossibleFlag = 0;

  // Sec II Calcs
  finalNames[counter] = yourName;
  finalNamesCount[counter] = 1;
  finalCosignNamesCount[counter] = finalNamesCount[counter];
  finalNamesSection[counter] = 'Section II';
  counter++;
  // Sec II-1 Calcs
  if (sponsorStatus != 'Single') {
    finalNames[counter] = partnerName;
    finalNamesSection[counter] = 'Section II-1';
    finalNamesCount[counter] = 1;
    yearInputSponsorChange = parseInt(yearInputSponsorChange);
    switch (sponsorStatus) {
      case 'Married':
        cosignPossibleFlag = 1;
        if (yearInputSponsorChange > currYear) {
          finalNamesCount[counter] = 0;
        }
        break;
      case 'Common-Law':
        cosignPossibleFlag = 1;
        if (yearInputSponsorChange > currYear) {
          finalNamesCount[counter] = 0;
        }
        break;
      case 'Seperated':
        if (yearInputSponsorChange > currYear) {
          finalNamesCount[counter] = 0;
        } else {
          if (spePartnerCitizenship == 'No' && spePartnerStatus == 'Yes') {
            finalNamesCount[counter] = 0;
          }
        }
        break;
      case 'Divorced':
        if (yearInputSponsorChange <= currYear) {
          finalNamesCount[counter] = 0;
        }
        break;
      case 'Widowed':
        if (yearInputSponsorChange <= currYear) {
          finalNamesCount[counter] = 0;
        }
        break;
      default:
        finalNamesCount[counter] = 1;
    }
    finalCosignNamesCount[counter] = finalNamesCount[counter];
    counter++;
  }

  // Sec III Calcs
  for (var i = 0; i < sponsorChildCount; i++) {
    finalNames[counter] = sponsorChildArray[i];
    finalNamesCount[counter] = 1;
    finalNamesSection[counter] = 'Section III';
    if (
      currYear - sponsorChildYearArray[i] >= 22 ||
      currYear - sponsorChildYearArray[i] < 0
    ) {
      finalNamesCount[counter] = 0;
    }
    finalCosignNamesCount[counter] = finalNamesCount[counter];
    counter++;
  }

  // Sec IV Calcs
  finalNames[counter] = principalName;
  finalNamesCount[counter] = 1;
  finalNamesSection[counter] = 'Section IV';
  finalCosignNamesCount[counter] = finalNamesCount[counter];
  counter++;

  // Sec IV-1 Calcs
  if (principalStatus != 'Single') {
    finalNames[counter] = principalPartnerName;
    finalNamesSection[counter] = 'Section IV-1';
    finalNamesCount[counter] = 1;
    yearInputPrincipalChange = parseInt(yearInputPrincipalChange);
    switch (principalStatus) {
      case 'Married':
        if (yearInputPrincipalChange > currYear) {
          finalNamesCount[counter] = 0;
        }
        break;
      case 'Common-Law':
        if (yearInputPrincipalChange > currYear) {
          finalNamesCount[counter] = 0;
        }
        break;
      case 'Seperated':
        if (yearInputPrincipalChange > currYear) {
          finalNamesCount[counter] = 0;
        } else {
          if (spePrincipalPartnerStatus == 'Yes') {
            finalNamesCount[counter] = 0;
          }
        }
        break;
      case 'Divorced':
        if (yearInputPrincipalChange <= currYear) {
          finalNamesCount[counter] = 0;
        }
        break;
      case 'Widowed':
        if (yearInputPrincipalChange <= currYear) {
          finalNamesCount[counter] = 0;
        }
        break;
      default:
        finalNamesCount[counter] = 1;
    }
    finalCosignNamesCount[counter] = finalNamesCount[counter];
    counter++;
  }

  // Sec V Calcs
  for (var i = 0; i < principalChildCount; i++) {
    finalNames[counter] = principalChildArray[i];
    finalNamesCount[counter] = 1;
    finalNamesSection[counter] = 'Section V';
    if (
      currYear - principalChildYearArray[i] >= 22 ||
      currYear - principalChildYearArray[i] < 0
    ) {
      finalNamesCount[counter] = 0;
    }
    finalCosignNamesCount[counter] = finalNamesCount[counter];
    counter++;
  }

  // Sec VI Calcs
  for (var i = 0; i < previousSponsorArray.length; i++) {
    finalNames[counter] = previousSponsorArray[i];
    finalNamesCount[counter] = 1;
    finalNamesSection[counter] = 'Section VI';
    if (
      currYear - previousSponsorYearArray[i] >= 20 ||
      currYear - previousSponsorYearArray[i] < 0
    ) {
      finalNamesCount[counter] = 0;
    }
    finalCosignNamesCount[counter] = finalNamesCount[counter];
    counter++;
  }

  // Sec VI-1 Calcs
  for (var i = 0; i < previousPartnerSponsorArray.length; i++) {
    finalNames[counter] = previousPartnerSponsorArray[i];
    finalNamesCount[counter] = 0;
    finalCosignNamesCount[counter] = 1;
    finalNamesSection[counter] = 'Section VI';
    if (
      currYear - previousPartnerSponsorYearArray[i] >= 20 ||
      currYear - previousPartnerSponsorYearArray[i] < 0
    ) {
      finalCosignNamesCount[counter] = 0;
    }
    counter++;
  }

  var displarResultsHTMLTable = (displarResultsHTMLTable =
    ' <div class="col-sm-6" id="resultsBox">' +
    '<table class="table table-striped thead-dark">' +
    '<thead><tr>' +
    '<th scope="col">#</th>' +
    '<th scope="col">Section</th>' +
    '<th scope="col">Name</th>' +
    '<th scope="col">Count in Calculation (Single)</th>');

  if (cosignPossibleFlag) {
    displarResultsHTMLTable +=
      '<th scope="col">Count in Calculation (Co-Sign)</th>';
  }
  displarResultsHTMLTable += '</tr></thead><tbody>';

  // Fill table
  for (var i = 0; i < finalNames.length; i++) {
    displarResultsHTMLTable +=
      '<tr><th scope="row">' +
      (i + 1) +
      '</th><td>' +
      finalNamesSection[i] +
      '</td><td>' +
      finalNames[i] +
      '</td><td>' +
      finalNamesCount[i] +
      '</td>';
    if (cosignPossibleFlag) {
      displarResultsHTMLTable += '<td>' + finalCosignNamesCount[i] + '</td>';
    }
    displarResultsHTMLTable += '</tr>';
    if (finalNamesCount[i] === 1) {
      currFamilyCount++;
    }
    if (finalCosignNamesCount[i] === 1) {
      currCosignFamilyCount++;
    }
  }
  // calculate the value
  if (currFamilyCount >= supervisa2022.length) {
    requiredIncome =
      supervisa2022[supervisa2022.length - 1] *
        (currFamilyCount - (supervisa2022.length - 1)) +
      supervisa2022[supervisa2022.length - 2];
  } else {
    requiredIncome = supervisa2022[currFamilyCount - 1];
  }
  if (currCosignFamilyCount >= supervisa2022.length) {
    requiredCosignIncome =
      supervisa2022[supervisa2022.length - 1] *
        (currCosignFamilyCount - (supervisa2022.length - 1)) +
      supervisa2022[supervisa2022.length - 2];
  } else {
    requiredCosignIncome = supervisa2022[currCosignFamilyCount - 1];
  }

  displarResultsHTMLTable +=
    '<tr class="table-info"><th scope="row">' +
    'Total' +
    '</th><td>' +
    '' +
    '</td><td>' +
    '' +
    '</td><td>' +
    currFamilyCount +
    '</td>';
  if (cosignPossibleFlag) {
    displarResultsHTMLTable += '<td>' + currCosignFamilyCount + '</td>';
  }
  displarResultsHTMLTable +=
    '</tr><tr class="table-dark"><th></th><td></td><td></td><td>';
  if (cosignPossibleFlag) {
    displarResultsHTMLTable += '<td></td>';
  }
  displarResultsHTMLTable +=
    '</td></tr>' +
    '<tr class="table-warning"><th scope="row">' +
    '' +
    '</th><td>' +
    '' +
    '</td><td>' +
    'Earning Required in ' +
    (currYear - 1) +
    '</td><td>' +
    dollarUS.format(requiredIncome) +
    '</td>';
  if (cosignPossibleFlag) {
    displarResultsHTMLTable +=
      '<td>' + dollarUS.format(requiredCosignIncome) + '</td>';
  }
  displarResultsHTMLTable += '</tr></tbody></table></div>';
  return displarResultsHTMLTable;
}
function calcPGP2021() {
  var displarResultsHTMLTable =
    '<div class="col-sm-6" id="resultsBox"><p>All Good - calcPGP2021</p></div>';
  return displarResultsHTMLTable;
}
function calcPGP2022() {
  var displarResultsHTMLTable =
    '<div class="col-sm-6" id="resultsBox"><p>All Good - calcPGP2022 is not released</p></div>';
  return displarResultsHTMLTable;
}

/// add google search terms
// Text on t&C
// Text on complicated family - death etc.
