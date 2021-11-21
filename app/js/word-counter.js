$("textarea").each(function () {
  this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
}).on("input", function () {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
});

$('#userinput').on('input', function () {
  text = userinput.value;

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
});

// File Validator
$('#upload-btn').on('change', function () {
  filename = this.files[0].name;
  var supportedFormats = /(\.pdf|\.txt|\.doc|\.docx)$/i;
  if (!supportedFormats.exec(filename)) {
    $(".unsupported-file").html('<b>' + filename + '</b> is not supported.');
  }
});

$('#clear-btn').on('click', function (event) {
  userinput.value = '';
  $(".word-count").html(0);
  $(".char-count").html(0);
  $(".sentence-count").html(0);
  $(".line-count").html(0);
  $(".para-count").html(0);
  $(".read-time").html('0 sec');
  $(".speak-time").html('0 sec');
  $(".write-time").html('0 sec');

  userinput.style.height = "252px";
});