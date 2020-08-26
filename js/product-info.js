var product = {};

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesWrapper").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCostHTML = document.getElementById("productCost");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = '<a href="category-info.html">' + product.category + '</a>';
            productCostHTML.innerHTML = product .currency + " " + product.cost;
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);

            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok") {
                    let products = resultObj.data;
        
                    let html = '';
                    product.relatedProducts.forEach(function(productIndex) {
                        let productIterator = products[productIndex];
                        html += `
                        <div class="card" style="width: 18rem;">
                            <img src="${productIterator.imgSrc}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${productIterator.name}</h5>
                                <p class="card-text">${productIterator.description}</p>
                                <a href="" class="btn btn-link">Ver</a>
                            </div>
                        </div>
                        `
                    });

                    document.getElementById("relatedProductsContainer").innerHTML = html;
                }
            });

            getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
                if (resultObj.status === "ok") {
                    let comments = resultObj.data;
        
                    let html = '';
                    comments.forEach(function(comment) {
                        let productScore = comment.score;
                        let score = '';
                        for(let i = 1; i <= productScore; i ++) {
                            score += '<i class="fas fa-star checked"></i>';
                        }

                        for(let i = productScore +1 ; i <= 5; i ++) {
                            score += '<i class="far fa-star"></i>';
                        }

                        html += `
                        <li class="media">
                            <div class="media-body">
                                <label class="mt-0"><strong>${comment.user} </strong>
                                    <span class="mute"> - ${comment.dateTime}</span>
                                    <span> - ${score}</span>
                                </label>
                                <br/>
                                <label class="small">${comment.description}</label>
                                <hr/>
                            </div>
                        </li>
                        `
                    });

                    document.getElementById("feedbackProductsContainer").innerHTML = html;
                }
            });
        }
    });
});