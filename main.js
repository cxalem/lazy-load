const mainUrl =
  "https://api.unsplash.com/photos/random?count=8&client_id=2FZRT4pJlkOLqFRDu8kLF5V9GZhB86tPn8cKULJG76E";
const appContainer = document.getElementById("app");
const addBtn = document.querySelector(".add-button");


const observer = new IntersectionObserver((entries) => {
  entries
    .filter((entry) => { //filtra los elementos que están actualmente dentro del viewport
      return entry.isIntersecting; //isIntersecting es una propiedad del entry que forma parte de la web api de IntersectionObserver. Si el elemento está dentro de la pantalla entry.isIntersecting = true.
    })
    .forEach((entry) => { //la acción que vamos a realizar cuando el observer haya encontrado un elemento dentro del viewport
      const imgContainer = entry.target;
      const image = imgContainer.firstChild;
      const url = image.dataset.src;

      image.src = url; //Cargamos la imagen

      //para que la acción deje de registrarse después de realizada haremos:
      observer.unobserve(imgContainer);
    });
}); 
const registerImage = (image) => {
  observer.observe(image);
};
// window
//   .fetch(mainUrl)
//   .then((response) => response.json())
//   .then((info) => {
//     const createImgNode = () => {
//       const container = document.createElement("div");
//       container.classList.add("img-container");

//       const image = document.createElement("img");
//       image.classList.add("image");
//       image.src = info.urls.regular;

//       container.appendChild(image);
//       return container;
//     };
//     const addBtn = document.querySelector(".add-button");
//     const addImg = () => {
//       const newImage = createImgNode();
//       appContainer.append(newImage);
//     };
//     addBtn.addEventListener("click", addImg);
//   });

const fetchData = async () => { // creamos una función asíncrona para obtener la data
  const response = await fetch(mainUrl); // obtenemos la data
  const info = await response.json(); // convertimos la data en un .json
  info.forEach(item => {
    const container = document.createElement("div");
    container.classList.add("img-container");

    const image = document.createElement("img");
    image.classList.add("image");
    image.dataset.src = item.urls.small;

    container.appendChild(image);
    appContainer.append(container);
    registerImage(container);
  })
};

addBtn.addEventListener("click", fetchData);
