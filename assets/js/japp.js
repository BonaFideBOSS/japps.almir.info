var toastTrigger = document.getElementById('japp-share-btn')
var toastLiveExample = document.getElementById('japp-share-toast')
if (toastTrigger) {
    toastTrigger.addEventListener('click', function() {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
    })
}