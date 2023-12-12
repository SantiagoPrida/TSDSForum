const url = {
    url: "https://tsdsforo-9bbe.restdb.io/rest/posts",
    api: "656107035b727c33c85a526a",
}

HTTP_METHODS = {
    'post': 'POST',
    'get': 'GET',
    'put': 'PUT',
    'delete': 'DELETE'
}

const ingles = "http://127.0.0.1:5500/pages/categorias/ingles.html";
const logica = "http://127.0.0.1:5500/pages/categorias/logica.html";
const ingInformatica = "http://127.0.0.1:5500/pages/categorias/ingsoft.html";

var currentdate = new Date()
var datetime = currentdate.getDay() + "/" + currentdate.getMonth() + "/" + currentdate.getFullYear()


const listeningPosts = {
    listen: () => {

        if (window.location.href == ingles) {

            fetch(`${url.url}?apikey=${url.api}`)
                .then(response => response.json())
                .then(posts => {
                    const contenedor = document.getElementById("posts");
                    let htmlConteiner = "";
                    for (const post of posts) {
                        if (post.categorie == "2") {
                            htmlConteiner += `
                        <div class="d-flex text-body-secondary pt-3 border-bottom">
                        <img class="bd-placeholder-img flex-shrink-0 me-2 rounded-circle" id="image" width="48" height="48" src="/./src/avatar1.png">
                        <p class="pb-3 mb-0 small lh-sm w-100">
                        
                          <a href="./pages/categorias/postTest.html"><strong class="d-block text-gray-dark title">${post.name}</strong></a><br> Bill Gates
                          <span class="dateText">Fecha de Publicacion</span>
                          <div class="timeSnap">${datetime}</div>
                        </p>
                      </div>
                        `;
                        }
                        contenedor.innerHTML = htmlConteiner;
                    }
                })
        }
        else if (window.location.href == logica) {
            fetch(`${url.url}?apikey=${url.api}`)
                .then(response => response.json())
                .then(posts => {
                    const contenedor = document.getElementById("posts");
                    let htmlConteiner = "";
                    for (const post of posts) {
                        if (post.categorie == "1") {
                            htmlConteiner += `
                        <div class="d-flex text-body-secondary pt-3 border-bottom">
                        <img class="bd-placeholder-img flex-shrink-0 me-2 rounded-circle" id="image" width="48" height="48" src="/./src/avatar1.png">
                        <p class="pb-3 mb-0 small lh-sm w-100">
                        
                          <a href="./pages/categorias/test.html "><strong class="d-block text-gray-dark title">${post.name}</strong></a><br> Bill Gates
                          <span class="dateText">Fecha de Publicacion</span>
                          <div class="timeSnap">${datetime}</div>
                        </p>
                      </div>
                        `;
                        }
                        contenedor.innerHTML = htmlConteiner;
                    }
                })

        }
        else if (window.location.href == ingInformatica) {
            fetch(`${url.url}?apikey=${url.api}`)
                .then(response => response.json())
                .then(posts => {
                    const contenedor = document.getElementById("posts");
                    let htmlConteiner = "";
                    for (const post of posts) {
                        if (post.categorie == "3") {
                            htmlConteiner += `
                        <div class="d-flex text-body-secondary pt-3 border-bottom">
                        <img class="bd-placeholder-img flex-shrink-0 me-2 rounded-circle" id="image" width="48" height="48" src="/./src/avatar1.png">
                        <p class="pb-3 mb-0 small lh-sm w-100">
                        
                          <a href="./pages/categorias/test.html "><strong class="d-block text-gray-dark title">${post.name}</strong></a><br> Bill Gates
                          <div class="timeSnap">${datetime}</div>
                        </p>
                      </div>
                        `;
                        }
                        contenedor.innerHTML = htmlConteiner;
                    }
                })
        }

        else {
            fetch(`${url.url}?apikey=${url.api}`).then(response => response.json()).then(posts => {
                const contenedor = document.getElementById("posts");
                let htmlConteiner = "";
                for (const post of posts) {
                    htmlConteiner += `
                <div class="d-flex text-body-secondary pt-3">
                <p class="pb-3 mb-0 small lh-sm w-100 border-bottom ">
                  <strong class="d-block text-gray-dark">${post.name.toLowerCase()}</strong>
                  ${post.content}
                    <div class="align-item-end icons">    
                        <a href="#" class="admniCategories" onclick="listeningPosts.remove('${post._id}','${post.name}')"><i class="fa-solid fa-trash removeIcon"></i></a>
                        <a href="#" class="admniCategories" onclick="listeningPosts.notify()"><i class="fa-solid fa-pencil"></i></a>
                    </div>
                </p>
              </div>
                `;
                }
                contenedor.innerHTML = htmlConteiner;
            })

        }


    },
    addPost: () => {
        const id = document.getElementById("txtId")
        const title = document.getElementById("txtTitle")
        const content = document.getElementById("txtContent")
        const category = document.getElementById("categorie")
        const date = document.getElementById("date")

        const newPost = {
            "name": title.value,
            "content": content.value,
            "categorie": category.value,
            "date": date.value,
        };

        let HTTP_METHOD = "";
        let urlApi = "";

        if (id.value == '') {
            HTTP_METHOD = HTTP_METHODS.post;
            urlApi = `${url.url}?apikey=${url.api}`;
        }
        else {
            HTTP_METHOD = HTTP_METHODS.put;
            urlApi = `${url.url}/${id.value}?apikey=${url.api}`;
        }

        fetch(urlApi, {
            method: HTTP_METHOD,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        }).then(response => {
            console.log(response);
            window.location.href = "/./pages/categorias/logica.html";
        });

    },
    remove: (idAEliminar, nombreABorrar) =>{
        Swal.fire({
            title: `Seguro que quiere borrar el post ${nombreABorrar}?`,
            text: "Todos los mensajes y contenidos se eliminaran con el.",
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
                            return listeningPosts.listen();
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
    notify: () =>{
        Swal.fire({
            title: "Próximamente",
            text: "Deshabilitado",
            icon: "question"
          });;
    }

}

listeningPosts.listen();