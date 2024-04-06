//import historial from '../historial.json' assert { type:'json' };

const getFridayOfCurrentWeek = () => {
    let date = new Date();
    const fridayDayMonth = (date.getDate() - date.getDay() + 1) + 4;
    const friday = new Date(date.setDate(fridayDayMonth));
    return friday;
}

// Inicio peticion menu de los proximos dias
/////

let dateInit = new Date().toISOString().substring(0,10);
let dateEnd = new Date(getFridayOfCurrentWeek()).toISOString().substring(0,10);

//Reeplantear este endpoint
const API_URL = location.href.substring(0,25)+"api/menus/coming?dateInit="+dateInit+"&dateEnd="+dateEnd;

let historial;

async function getNextMenus() {
    let response = await fetch(API_URL);
    let menu = await response.json();
    return menu;
};

const menuPromise = new Promise((resolve, reject) => {
    resolve(getNextMenus());
})
.then(menu => {
    generateNextMenu(menu);
    historial = menu;
})
.catch((err) => {failLoad()})

function failLoad(){
    let contenedor = document.querySelector('.container-menus');
    contenedor.id = 'title-menu-nextMeals';
    contenedor.innerHTML = "No se han encontrado menus para hoy";
}

const createdate = (fecha) => {
    let dd = fecha.day;
    let mm = fecha.month;
    let yyyy = fecha.year;
    let today = dd + '/' + mm + '/' + yyyy;
    let aux = yyyy+'-'+mm+'-'+dd+' 00:00:00';
    today = getWeekDay(aux)+' '+today;
    return today;
}

function getWeekDay(fecha){
    const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    const numeroDia = new Date(fecha).getDay();
    return dias[numeroDia];
}

const generateNextMenu = (historial) => {
    let option = ["desayunos", "almuerzos", "meriendas"];
    let sizeHistorial = historial.length;
    let container = document.querySelector('.container-menus');


    for (let index = 0; index < sizeHistorial; index++) {
        let foodDay = historial[index];

        let toGenerate = [foodDay.desayunos, foodDay.almuerzos, foodDay.meriendas];
        let sizeGenerate = toGenerate.length;

        let titulo = document.createElement("h3");
        titulo.id = "date-food";
        titulo.textContent = createdate(foodDay.fecha);
        container.appendChild(titulo);

        let containerRow = document.createElement("section");
        containerRow.classList.add("container-row");
        containerRow.classList.add("space-box");    

        for (let i = 0; i < sizeGenerate; i++) {
            
            let column = document.createElement("div");
            column.classList.add("column");

            let name = document.createElement("h4");
            name.classList.add("meal");
            name.textContent = option[i];
            column.appendChild(name);

            for (let j = 0; j < 2; j++) {
                let littleBox = document.createElement("div");
                littleBox.classList.add("little-box-"+(j+1));
                column.appendChild(littleBox);

                let boxImgTitle = document.createElement("div");
                boxImgTitle.classList.add("little-box");
                littleBox.appendChild(boxImgTitle);
                
                let image = document.createElement("img");
                image.classList.add("small-image");
                image.alt = "Imagen del menu "+toGenerate[i][j].nombre;
                image.src = toGenerate[i][j].foto;
                boxImgTitle.appendChild(image);

                let titleBox = document.createElement("div");
                titleBox.classList.add("little-box-title");

                let title = document.createElement("h5");
                title.id = "little-title-style";
                title.textContent = toGenerate[i][j].nombre;
                titleBox.appendChild(title);
                boxImgTitle.appendChild(titleBox);
            }
            containerRow.appendChild(column);
            container.appendChild(containerRow);
        }
    }
}

let elemntsBack = document.querySelectorAll('#back');
let buttonsBack = [];
elemntsBack.forEach((elem) => {
    buttonsBack.push(elem);
});

buttonsBack[0].addEventListener('click', () => {
    location.href = "/";
});
buttonsBack[1].addEventListener('click', () => {
    location.href = "/";
});
