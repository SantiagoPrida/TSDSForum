HTTP_METHODS = {
    'post': 'POST',
    'get': 'GET',
    'put': 'PUT',
    'delete': 'DELETE'
}

const url = {
    url: "https://tsdsforo-9bbe.restdb.io/rest/categories",
    api: "656107035b727c33c85a526a"
}
const delay = ms => new Promise(res => setTimeout(res, ms)); // SetTimeout

const appCategoriesAdmin = {
    addCategories: () => {
        const id = document.getElementById("txtId")
        const name = document.getElementById("txtName")
        const page = document.getElementById("txtRedirect")
        const description = document.getElementById("txtDesc")
        const color = document.getElementById("color")


        const newCategorie = {
            "name": name.value,
            "description": description.value,
            "redirect": page.value,
            "hash": color.value
        };

        let HTTP_METHOD = "";
        let urlApi = "";

        if (id.value === "") {
            HTTP_METHOD = HTTP_METHODS.post;
            urlApi = `${url.url}?apikey=${url.api}`;

        } else {
            HTTP_METHOD = HTTP_METHODS.put;
            urlApi = `${url.url}/${id.value}?apikey=${url.api}`;

        }

        fetch(urlApi, {
            method: HTTP_METHOD,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategorie)
        }).then(response => {
            window.location.href = "/./pages/admin/categories.html";
        });

    },

    categoriesListener: () => {
        const contenedor = document.getElementById("categories");
        let htmlConteiner = "";

        fetch(`${url.url}?apikey=${url.api}`)
            .then(response => response.json())
            .then(categories => {

                for (const categorie of categories) {
                    htmlConteiner += `
                <div class="d-flex text-body-secondary pt-3">
                <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>${categorie.name}</title><rect width="100%" height="100%" fill="${categorie.hash}"/><text x="50%" y="50%" fill="${categorie.hash}" dy=".3em">32x32</text></svg>
                <p class="pb-3 mb-0 small lh-sm w-100 border-bottom ">
                  <strong class="d-block text-gray-dark">${categorie.name.toLowerCase()}</strong>
                  ${categorie.description}
                    <div class="align-item-end icons">    
                        <a href="#" class="admniCategories" onclick="appCategoriesAdmin.removeCategories('${categorie._id}','${categorie.name}')"><i class="fa-solid fa-trash removeIcon"></i></a>
                        <a href="#" class="admniCategories" onclick="appCategoriesAdmin.editCategories('${categorie._id}');"><i class="fa-solid fa-pencil"></i></a>
                    </div>
                </p>
              </div>
                `;
                };

                contenedor.innerHTML = htmlConteiner;
            })
    },

    removeCategories: (idAEliminar, nombreABorrar) => {
        Swal.fire({
            title: `Seguro que quiere borrar la categoria ${nombreABorrar}?`,
            text: "Todos los hilos se eliminaran con el.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Borrar',
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.isConfirmed) {
                    fetch(`${url.url}/${idAEliminar}?apikey=${url.api}`, {
                        method: 'DELETE'
                    })
                        .then(response => {
                            console.log(response);
                            return appCategoriesAdmin.categoriesListener();
                        }).then(response => {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `${nombreABorrar} fue eliminado con exito.`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        });
                }
            }
        })

    },

    editCategories: (idCategorie) => {
        const url = `https://tsdsforo-9bbe.restdb.io/rest/categories/${idCategorie}?apikey=656107035b727c33c85a526a`;

        fetch(url).then(res => res.json()).then(categorie => {
            document.getElementById("txtId").value = categorie._id;
            document.getElementById("txtName").value = categorie.name;
            document.getElementById("txtRedirect").value = categorie.redirect;
            document.getElementById("txtRedirect").setAttribute("Disabled", "")
            document.getElementById("txtDesc").value = categorie.description;
            document.getElementById("color").value = categorie.hash;
            document.getElementById("botonCambiar").value = 'Editar'; // Cambia el boton a editar.

            const windowEdit = document.getElementById('addCategorie');
            let window = new bootstrap.Modal(windowEdit);
            window.show();
        });
    }

}
Swal.fire({
    position: "center",
    icon: "info",
    text: "Sincronizado...",
    showConfirmButton: false,
    timer: 2500
});

setTimeout(function () {
    Swal.fire({
        position: "center",
        icon: "success",
        text: "Sincronizacion completa",
        showConfirmButton: false,
        timer: 1000
    })
}, 2000, setTimeout(function () {
    appCategoriesAdmin.categoriesListener();
}, 1250));

