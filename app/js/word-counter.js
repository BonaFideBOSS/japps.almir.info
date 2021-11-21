$("textarea").each(function () {
  this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
}).on("input", function () {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

var userinput = document.getElementById('userinput');

function wordcounter() {
  text = userinput.value;

  if (text != '') {
    $('#download-btn').removeClass('disabled')
    $('#clear-btn').removeClass('disabled')
    $('#speak-btn').removeClass('disabled')
    $('#print-btn').removeClass('disabled')
  } else {
    $('#download-btn').addClass('disabled')
    $('#clear-btn').addClass('disabled')
    $('#speak-btn').addClass('disabled')
    $('#print-btn').addClass('disabled')
  }

  words = text.trim().replace(/\s+/g, ' ').split(' ').length;
  characters = text.length;
  lines = text.split('\n').length
  sentences = text.split(/[a-zA-Z][^\.!\?]*[\.!\?]+/g).length - 1
  paragraphs = text.replace(/\n$/gm, '').split(/\n/).length

  rwpm = 275 // Reading Words Per Minute
  rwps = rwpm / 60
  reading = Math.floor(words / rwps)
  if (reading <= 60) {
    reading = reading + ' sec'
  } else if (reading > 60 && reading < 3600) {
    min = Math.floor(reading / 60)
    sec = Math.floor(reading % 60)
    reading = min + ' min' + ' ' + sec + ' sec'
  } else if (reading > 3600) {
    hour = Math.floor(reading / 3600)
    min = Math.floor(reading % 3600 / 60)
    reading = hour + ' hour' + ' ' + min + ' min'
  }

  swpm = 180 // Speaking Words Per Minute
  swps = swpm / 60
  speaking = Math.floor(words / swps)
  if (speaking <= 60) {
    speaking = speaking + ' sec'
  } else if (speaking > 60 && speaking < 3600) {
    min = Math.floor(speaking / 60)
    sec = Math.floor(speaking % 60)
    speaking = min + ' min' + ' ' + sec + ' sec'
  } else if (speaking > 3600) {
    hour = Math.floor(speaking / 3600)
    min = Math.floor(speaking % 3600 / 60)
    speaking = hour + ' hour' + ' ' + min + ' min'
  }

  letters = text.split(/[^\s\\]/).length
  rlpm = 68 // Writing Letter Per Minute
  rlps = rlpm / 60
  writing = Math.floor(letters / rlps)
  if (writing <= 60) {
    writing = writing + ' sec'
  } else if (writing > 60 && writing < 3600) {
    min = Math.floor(writing / 60)
    sec = Math.floor(writing % 60)
    writing = min + ' min' + ' ' + sec + ' sec'
  } else if (writing > 3600) {
    hour = Math.floor(writing / 3600)
    min = Math.floor(writing % 3600 / 60)
    writing = hour + ' hour' + ' ' + min + ' min'
  }

  $(".word-count").html(words);
  $(".char-count").html(characters);
  $(".sentence-count").html(sentences);
  $(".line-count").html(lines);
  $(".para-count").html(paragraphs);
  $(".read-time").html(reading);
  $(".speak-time").html(speaking);
  $(".write-time").html(writing);

  if (text.length == 0) {
    $(".word-count").html(0);
    $(".line-count").html(0);
    $(".para-count").html(0);
  }

  $('.fb-limit').html(250 - characters)
  $('.tw-limit').html(280 - characters)
  $('.ig-limit').html(150 - characters)
  $('.li-limit').html(1300 - characters)
  $('.yt-limit').html(5000 - characters)
  $('.pt-limit').html(160 - characters)
  $('.rd-limit').html(40000 - characters)
  $('.dc-limit').html(2000 - characters)

  var limits = document.getElementsByClassName("limit");
  var i;
  for (i = 0; i < limits.length; i++) {
    eachlimit = parseInt(limits[i].innerHTML)
    if (eachlimit < 0) {
      limits[i].classList.add('text-danger')
    } else {
      limits[i].classList.remove('text-danger')
    }
  }

}

$('#userinput').on('input', function () {
  wordcounter();
});

$('#upload-btn').on('change', function () {
  file = this.files[0]
  filename = file.name;
  var reader = new FileReader();
  reader.onload = function (e) {
    if (newDoc.checked == true) {
      userinput.value = (e.target.result)
      userinput.style.height = "auto";
    } else {
      userinput.value = userinput.value + (e.target.result) + '\n';
    }
    userinput.style.height = (userinput.scrollHeight) + "px";
    $('#userinput').trigger('change');
    wordcounter();
  };
  reader.readAsText(file, "UTF-8");
  $('#uploadModal').modal('toggle');
});

var downloadfilename = document.getElementById('docFileName');

$('#download-btn').on('click', function () {
  $(".save-error").html('');
  downloadfilename.value = ''
});

function FileDownloader(fileExtension, contentType) {
  const a = document.createElement('a');
  const txtfile = new Blob([userinput.value], {
    type: contentType
  });
  a.href = URL.createObjectURL(txtfile);
  if (downloadfilename.value == '') {
    a.download = 'JappsDocument' + fileExtension;
  } else {
    a.download = downloadfilename.value;
  }
  a.click();
  URL.revokeObjectURL(a.href);
};

$('#txt-download-btn').on('click', function () {
  FileDownloader('.txt', 'text/plain;charset=utf-8');
});

$('#pdf-download-btn').on('click', function () {
  var jsPDF = jspdf.jsPDF;
  const doc = new jsPDF();
  doc.text(userinput.value, 10, 10);
  if (downloadfilename.value == '') {
    doc.save("JappsDocument.pdf");
  } else {
    doc.save(downloadfilename.value + '.pdf')
  }
  $('#downloadModal').modal('toggle');
});

$('#doc-download-btn').on('click', function () {
  FileDownloader('.doc', 'application/msword');
});

$('#csv-download-btn').on('click', function () {
  FileDownloader('.csv', 'text/csv');
});

$('#clear-btn').on('click', function () {
  userinput.value = '';
  wordcounter();
  userinput.style.height = "auto";
});

$('#speak-btn').on('click', function () {
  if ('speechSynthesis' in window) {
    var msg = new SpeechSynthesisUtterance();
    msg.text = userinput.value;
    window.speechSynthesis.speak(msg);
  } else {
    swal("Oops", "Sorry, your browser doesn't support text to speech.", "error");
  }
});