import { getNextMenus } from '../services/getNextMenu.js';
import { addFunctionRefButton } from '../services/addFunctionRefButton.js'
import { buildDate } from '../services/buildDate.js'

getNextMenus()
    .then(menu => generateNextMenu(menu))
    .catch(err => failLoad());

const failLoad = () => {
    const contenedor = document.querySelector('.container-menus');
    contenedor.id = 'title-menu-nextMeals';
    contenedor.innerHTML = "No se han encontrado menus para hoy";
}

const container = document.querySelector('.container-menus');

const generateNextMenu = (historial) => {
    historial.forEach((menu) => {
        const titulo = document.createElement("h3");
        titulo.id = "date-food";
        titulo.textContent = buildDate(menu.fecha);
        container.appendChild(titulo);
    
        const containerRow = document.createElement("section");
        containerRow.classList.add("container-row");
        containerRow.classList.add("space-box");
    
        const timeFoodSet = Object.keys(menu).splice(1);
        
        timeFoodSet.forEach((foodTime) => {
            const column = document.createElement("div");
            column.classList.add("column");
    
            const name = document.createElement("h4");
            name.classList.add("meal");
            name.textContent = foodTime.charAt(0).toUpperCase() + foodTime.slice(1);
            column.appendChild(name);
    
            const foodSet = Object.values(menu[foodTime]);
            foodSet.forEach ((food, index) => {
                const littleBox = document.createElement("div");
                littleBox.classList.add("little-box-"+(index+1));
                column.appendChild(littleBox);
    
                const boxImgTitle = document.createElement("div");
                boxImgTitle.classList.add("little-box");
                littleBox.appendChild(boxImgTitle);
                
                const image = document.createElement("img");
                image.classList.add("small-image");
                image.alt = "Imagen del menu "+food.nombre;
                image.src = food.foto;
                boxImgTitle.appendChild(image);
    
                const titleBox = document.createElement("div");
                titleBox.classList.add("little-box-title");
    
                const title = document.createElement("h5");
                title.id = "little-title-style";
                title.textContent = food.nombre;
                titleBox.appendChild(title);
                boxImgTitle.appendChild(titleBox);
            });
            containerRow.appendChild(column);
            container.appendChild(containerRow);
        });
    });
}

const elemntsBack = document.querySelectorAll('#back');
elemntsBack.forEach((elem) => {
    addFunctionRefButton(elem, "../");
});