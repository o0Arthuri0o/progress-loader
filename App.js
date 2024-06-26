const loader = document.querySelector('progress-loader')
const inputValue = document.querySelector('.controls_value__input')
const checkboxAnimate = document.querySelector('#checkbox_animate')
const checkboxHide = document.querySelector('#checkbox_hide')


const handleInputOnChange = (e) => {
    const value = e.target.value
    if(Number(value) >= 0 && Number(value) <= 100) {
        inputValue.style.borderColor = "black"
        updateLoader("value", value)
    } else {
        inputValue.style.borderColor = "#FF4040"
    }

}

const hadleAnimate = (e) => {
    const value = e.target.checked
    updateLoader("animate", value)
}

const handleHide = (e) => {
    const value = e.target.checked
    updateLoader("hide", value)
}

const updateLoader = (type, value) => {
    switch(type){
        case "value":
            if(Number(value) >= 1 && Number(value) <= 100) {
                loader.setAttribute("value", value)
            } else if(Number(value) === 0) loader.setAttribute("value", 0)
            break;
        case "animate":
            loader.setAttribute("animate", value)
            break;
        case "hide":
            loader.setAttribute("hide", value)
            break;
        default: return
    }
}

inputValue.addEventListener('input', handleInputOnChange)
checkboxAnimate.addEventListener('change', hadleAnimate)
checkboxHide.addEventListener("change", handleHide)
