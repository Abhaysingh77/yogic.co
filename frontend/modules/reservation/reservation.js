import config from "../../conf/index.js"

function captureFormSubmit() {
    const myForm = document.getElementById('myForm');
    let data = {};

    myForm.addEventListener('submit', e => {
        e.preventDefault();
        data['name'] = myForm.elements['name'].value;
        data['email'] = myForm.elements['email'].value
        data['phone'] = myForm.elements['phone'].value
        let selectedDesignation=document.querySelector('input[name="designation"]:checked');
        data['designation'] = selectedDesignation.value

        fetch(`${config.backendEndpoint}/reservations/new`,{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data),
        }).then(res=>{
            alert("We'll get back to you asap!");
            location.reload();
        }).catch(err=>{
            alert("Unable to submit the request")
        })
    })
}

export default captureFormSubmit;