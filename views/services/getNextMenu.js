const getFridayOfCurrentWeek = () => {
    const date = new Date();
    const fridayDayMonth = (date.getDate() - date.getDay() + 1) + 4;
    const friday = new Date(date.setDate(fridayDayMonth));
    return friday;
}

const dateInit = new Date().toISOString().substring(0,10);
const dateEnd = new Date(getFridayOfCurrentWeek()).toISOString().substring(0,10);

//Esto se debe mover a otro archivo. Pero, como no es lo que se evalua
const API_URL = location.href.substring(0,25)+"api/menus/coming?dateInit="+dateInit+"&dateEnd="+dateEnd;

export async function getNextMenus() {
    let response = await fetch(API_URL);
    let menu = await response.json();
    return menu;
};