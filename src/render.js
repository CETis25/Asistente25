import katex from "katex";
export function getBold (m) {
    let unbolded = m.match(/\*\*[^\*]+\*\*/gim) || [];
    for (let i=0; unbolded.length > i; i++) {
        let bolding = unbolded[i].slice(2, -2);
        bolding = "<b>" + bolding + "</b>";
        m = m.replace(unbolded[i], bolding);
    }
    return m;
}
export function getMotorcycle (m) {
    let unitalics = m.match(/\*[^\*]+\*/gim) || [];
    for (let i=0; unitalics.length > i; i++) {
        let motorizing = unitalics[i].slice(1, -1);
        motorizing = "<i>" + motorizing + "</i>";
        m = m.replace(unitalics[i], motorizing);
    }
    return m;
}
export function getUnderlined (m) {
    let nonelined = m.match(/\_\_[^\_]+\_\_/gim) || [];
    for (let i=0; nonelined.length > i; i++) {
        let underlining = nonelined[i].slice(2, -2);
        underlining = "<u>" + underlining + "</u>";
        m = m.replace(nonelined[i], underlining);
    }
    return m;
}
export function getMathemagic (m, displayMode = false) {
    const options = {
		displayMode: displayMode,
		throwOnError: false
	}
    let mathemagics = m.match(/```[^`]+```/gim) || [];
    for (let i=0; mathemagics.length > i; i++) {
        let formula = katex.renderToString(mathemagics[i].slice(3, -3), options);
        m = m.replace(mathemagics[i], formula);
    }
    return m;
}
export function renderMessage (m, displayMode = false) {    
    m = getBold(m);
    m = getMotorcycle(m);
    m = getUnderlined(m);
    m = getMathemagic(m, displayMode);
    return m;
}