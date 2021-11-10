const dropList = document.querySelectorAll("form select")
const currency_one = document.getElementById('currency_one');
const currency_two = document.getElementById('currency_two');
const amount_one = document.getElementById('amount_one');
const amount_two = document.getElementById('amount_two');
const rate = document.getElementById('rate');
const userrate = document.getElementById('userrate');
const country_one = document.getElementById('country_one');
const country_two = document.getElementById('country_two');
const exchange = document.getElementById('exchange');

currency_one.addEventListener('change', calculate);
currency_two.addEventListener('input', calculate);
amount_one.addEventListener('input', calculate);
amount_two.addEventListener('input', calculate);

exchange.addEventListener('click', () => {
    const temp = currency_one.value;
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculate();
});

function calculate() {
    const value_one = currency_one.value;
    const value_two = currency_two.value;
    const countryone = currency_one.options[currency_one.selectedIndex].text;
    const countrytwo = currency_two.options[currency_two.selectedIndex].text;


    fetch(`https://api.exchangerate.host/latest/?base=${value_one}`)
        .then(res => res.json())
        .then(res => {
            const current_rate = res.rates[value_two];
            const cd = new Date();
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var month = months[cd.getMonth()];
            var date = cd.getDate()
            var year = cd.getFullYear()
            var ampm = cd.getHours() >= 12 ? ' PM' : ' AM';
            hours = cd.getHours() % 12;
            hours = hours ? hours : 12;
            hours = hours.toString().length == 1 ? 0 + hours.toString() : hours;
            var minutes = cd.getMinutes().toString()
            minutes = minutes.length == 1 ? 0 + minutes : minutes;
            currentTime = hours + ":" + minutes + " " + ampm;
            if (value_one != '' && value_two != '') {
                rate.style.display = "block";
                userrate.style.display = "block";
                rate.innerHTML = `1 ${value_one} equals <span>${current_rate} ${value_two}</span> <footer class="font-monospace">${month} ${date}, ${year} - ${currentTime}</footer>`
                country_one.innerHTML = countryone
                country_two.innerHTML = countrytwo
            }

            if (amount_two === document.activeElement) {
                amount_one.value = (amount_two.value / current_rate).toFixed(2);
                userrate.innerHTML = `${amount_two.value} ${value_two} equals <span>${amount_one.value} ${value_one}</span>`
            } else {
                amount_two.value = (amount_one.value * current_rate).toFixed(2);
                userrate.innerHTML = `${amount_one.value} ${value_one} equals <span>${amount_two.value} ${value_two}</span>`
            }

        })
}
calculate();