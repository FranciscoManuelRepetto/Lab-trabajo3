import {addFunctionRefButton} from '../services/addFunctionRefButton.js'
import {getTodayMenu} from '../services/getTodayMenu.js'

//Obtengo el menu de hoy
//Si se encuentra lo renderizo
//Si no tiro error 
getTodayMenu()
    .then(menu => renderizeTodayMenu(menu))
    .catch((err) => {failLoad()});

//Obtengo los 3 contendores de elementos para las comidas
const rowContainer = document.querySelectorAll('.container-row-food');

/**
 * Esta funcion renderiza las comidas como se ve en la pagina de inicio.
 * Se trata de una imagen y titulo, que es presionable para mostrar
 * toda la informacion del menu.
 * @param {JSON} menus 
 */
const renderizeTodayMenu = (menus) => {
    rowContainer.forEach((row, indice) => {
        //Obtengo el subconjunto de comidas correspondiente
        //Desayuno, almuerzo o merienda
        const foodSubset = menus[Object.keys(menus)[indice+1]];

        //Recorro las comidas
        for(const food of foodSubset){
            //Creo un boton para aparecer el modal
            const button = document.createElement("button");
            button.id = "clickeable";
            button.addEventListener('click', () => {
                aparecerModal(food);
            });
            //Contenedor de la imagen y titulo
            const container = document.createElement("div");
            container.classList.add("little-box");
            button.appendChild(container);
            //Imagen
            const foodImg = document.createElement("img");
            foodImg.classList.add("small-image");
            foodImg.alt = "Imagen del menu " + food.nombre;
            foodImg.src = food.foto;
            //Contenedor de titulo
            const titleContainer = document.createElement("div");
            titleContainer.classList.add("little-box-title");
            //Titulo
            const title = document.createElement("h4");
            title.id = "little-title-style";
            title.innerHTML = food.nombre;
            titleContainer.appendChild(title);
            
            container.appendChild(foodImg);
            container.appendChild(titleContainer);
            
            row.appendChild(button);
        }
    });
}

/**
 * Cuando falla el getTodayMenu.
 * Renderiza un texto para indicar al usuario que
 * "No se han encontrado menus para hoy".
 */
function failLoad(){
    const contenedor = document.querySelector('.container-menus');
    contenedor.id = 'time-foods';
    contenedor.innerHTML = "No se han encontrado menus para hoy";
}

/**
 * Establece el comportamiento de los botones que redireccionan a
 * la siguente pagina.
 */
const elemntsNextMeals = document.querySelectorAll('#next-meal');
elemntsNextMeals.forEach((elem) => {
    addFunctionRefButton(elem, "../proxComedor");
});

/**
 * Esta funcion oculta el fondo y renderiza un Modal que muestra
 * todos los detalles de una comida.
 * @param {JSON} elem Se trata de una comida
 */
const aparecerModal = (elem) => {
    //Impide el desplazamiento
    document.body.style.overflow = "hidden";
    //Oculta el fondo
    const hiderBack = document.createElement("div");
    hiderBack.id = "hidden-background";
    document.body.appendChild(hiderBack);
    //Contenedor Modal
    const bigBox = document.createElement("div");
    bigBox.classList.add("large-menu-box");
    //Imagen del modal
    const imageGrande = document.createElement("img");
    imageGrande.classList.add("big-image");
    imageGrande.alt = "Imagen del menu: "+elem.nombre;
    imageGrande.src = elem.foto;
    //Titulo del modal
    const bigTitle = document.createElement("h4");
    bigTitle.classList.add("big-menu-title");
    bigTitle.textContent = elem.nombre;
    //Contenedor de la imagen y titulo
    const imgTitleContainer = document.createElement("div");
    imgTitleContainer.classList.add("fix-image-title");
    imgTitleContainer.appendChild(imageGrande);
    imgTitleContainer.appendChild(bigTitle);
    //Texto descripcion
    const description = document.createElement("p");
    description.classList.add("large-menu-paragraph");
    description.innerHTML = elem.ingredientes;
    //Texto cantidad de reservas
    const reserve = document.createElement("p");
    reserve.classList.add("info-coupon");
    reserve.innerHTML = "Cantidad de Cupones: "+elem.reservas;
    //Texto precio
    const price = document.createElement("p");
    price.classList.add("info-coupon");
    price.innerHTML = "Precio: "+elem.precio;
    //Texto precio con carnet
    const cardPrice = document.createElement("p");
    cardPrice.classList.add("info-coupon");
    cardPrice.innerHTML = "Precio Carnet: "+elem.precio;
    //Contenedor de los textos reservas, precio y precio carnet
    const priceContainer = document.createElement("div");
    priceContainer.appendChild(reserve);
    priceContainer.appendChild(price);
    priceContainer.appendChild(cardPrice);
    //Boton reservar
    const reserveButton = document.createElement("button");
    reserveButton.id = "button-to-reserve";
    reserveButton.innerHTML = "RESERVAR";
    //Boton like
    const likeButton = document.createElement("button");
    likeButton.id = "like-button";
    const likeIcon = document.createElement("i");
    likeIcon.classList.add("bi");
    likeIcon.classList.add("bi-hand-thumbs-up-fill");
    likeButton.appendChild(likeIcon);
    //Contenedor de botones reservar y like
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("container-row-buttons");
    buttonsContainer.appendChild(likeButton);
    buttonsContainer.appendChild(reserveButton);
    buttonsContainer.appendChild(priceContainer);
    //Boton cerrar
    const closeButton = document.createElement("button");
    closeButton.id = "close";
    
    bigBox.appendChild(imgTitleContainer);
    bigBox.appendChild(description);
    bigBox.appendChild(buttonsContainer);
    bigBox.appendChild(closeButton);
    
    document.body.appendChild(bigBox);
    //Agrego comportamiento al boton reservar
    const reservar = document.querySelector('#button-to-reserve');
    reservar.addEventListener('click',
    () => {
        elem.reservas--;   
        window.alert("Descargar comprobante de reserva");
    }
    );
    //Agrego comportamiento al boton like
    const liker = document.querySelector('#like-button');
    liker.addEventListener('click',
    () => {
        elem.likes++;
    }
    );
    //Agrego comportamiento al boton cerrar
    const close = document.querySelector('#close');
    close.addEventListener('click',
    () => {
        let parent = bigBox.parentNode;
        parent.removeChild(bigBox);
        parent.removeChild(hiderBack);
        document.body.style.overflow = "visible";
    }
    );

    bigBox.focus();
}