const endPoint = location.href +"api/menus/";

const dateToday = new Date().toISOString().substring(0,10);

export async function getTodayMenu() {
    let response = await fetch(endPoint+dateToday);
    let menu = await response.json();
    return menu;
};