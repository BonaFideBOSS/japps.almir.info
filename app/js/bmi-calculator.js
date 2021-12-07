$('#length').on('change', function () {
  if (this.value == 'f') {
    $('#height').attr('hidden', true)
    $('#height').attr('required', false)
    $('#fandi').attr('hidden', false)
    $('#feet').attr('required', true)
    $('#inches').attr('required', true)
  } else {
    $('#height').attr('hidden', false)
    $('#height').attr('required', true)
    $('#fandi').attr('hidden', true)
    $('#feet').attr('required', false)
    $('#inches').attr('required', false)
  }
})

function bmi() {
  var weight = document.getElementById('weight').value
  var height = document.getElementById('height').value
  var mass = document.getElementById('mass').value
  var cLength = document.getElementById('length').value
  var feet = document.getElementById('feet').value
  var inches = document.getElementById('inches').value

  if (mass == 'lbs') {
    weight = weight * 0.45359237
  }
  if (cLength == 'cm') {
    height = height / 100
  } else if (cLength == 'in') {
    height = height * 0.0254
  } else if (cLength == 'f') {
    height = feet * 0.3048 + inches * 0.0254
  }

  var bmi = weight / (height * height)
  var health = ''

  if (bmi < 18.5) {
    health = 'Underweight'
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    health = 'Normal Weight'
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    health = 'Overweight'
  } else if (bmi >= 30.0 && bmi <= 34.9) {
    health = 'Obese class I'
  } else if (bmi >= 35.0 && bmi <= 39.9) {
    health = 'Obese class I'
  } else if (bmi >= 40.0) {
    health = 'Obese class III'
  }

  $('#bmi').html(bmi.toFixed(2))
  $('#health').html(health)

  $('.card-body').removeClass('text-muted')
}