
const url = {
    url: "https://tsdsforo-9bbe.restdb.io/rest/categories",
    api: "656107035b727c33c85a526a"
}

const appCategories = {
    listarCategories: () => {
        const contenedor = document.getElementById("categories");
        let htmlConteiner = "";

        fetch(`${url.url}?apikey=${url.api}`)
            .then(response => response.json())
            .then(categories => {

                for (const categorie of categories) {
                    htmlConteiner += `
                <div class="d-flex text-body-secondary pt-3">
                <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="${categorie.hash}"/><text x="50%" y="50%" fill="${categorie.hash}" dy=".3em">32x32</text></svg>
                <p class="pb-3 mb-0 small lh-sm w-100 border-bottom ">
                  <a href="./pages/categorias/${categorie.redirect.toLowerCase()}.html "><strong class="d-block text-gray-dark">${categorie.name}</strong></a>
                  ${categorie.description}
                </p>
              </div>
                `;
                };

                contenedor.innerHTML = htmlConteiner;
            })
    }
}

appCategories.listarCategories();

