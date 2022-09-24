const selectTag=document.querySelectorAll("select"),
totext=document.querySelector(".totext"),
fromText=document.querySelector(".fromtext"),
exchangeicon=document.querySelector(".exchange"),
translateBtn=document.querySelector("button"),
icons = document.querySelectorAll(".row i")

selectTag.forEach((tag,id) =>{
    for (const country_code in countries) {
        let selected;
        if(id==0 && country_code=="en-GB"){
            selected="selected";
        }else if (id==1 && country_code=="ta-LK") {
            selected="selected";
        }
        let option=`<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);
    }
});

exchangeicon.addEventListener("click",()=>{
    let temptext=fromText.value,
    templang=selectTag[0].value;
    fromText.value=totext.value;
    selectTag[0].value=selectTag[1].value;
    totext.value=temptext;
    selectTag[1].value=templang;
});

translateBtn.addEventListener("click",()=>{
    let text=fromText.value,
    translateFrom=selectTag[0].value,
    translateTo=selectTag[1].value;
    let apiURL=`https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
    fetch(apiURL).then(res=>res.json()).then(data=>{
        totext.value=data.responseData.translatedText;
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(!fromText.value || !totext.value) return;
        if(target.classList.contains("fa-copy")) {
            if(target.id == "from") {
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(totext.value);
            }
        } else {
            let utterance;
            if(target.id == "from") {
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
            } else {
                utterance = new SpeechSynthesisUtterance(totext.value);
                utterance.lang = selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});