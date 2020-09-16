var product = {};
var galleryComments = [];
function showImagesGallery(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + array[i] + `" alt="">
            </div>
        </div>
        `
    }
    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}
function showGalleryComments(galleryComments) {
    let htmlContentToAppend = "";
    for (let i = 0; i < galleryComments.length; i++) {
        let starGold = `<span class="fa fa-star checked"></span>`;
        let starBlack = `<span class="fa fa-star"></span>`;
        let starComments = starGold.repeat(galleryComments[i].score) + starBlack.repeat(5 - galleryComments[i].score);
        htmlContentToAppend += `
            <ul id="comments-list" class="comments-list">
                <li>   
                    <div class="comment-avatar">
                        <img src="img/ceibal.png" alt="">
                    </div>
                    <div class="comment-box">
                    <span class="starComments">` + starComments + ` </span>
                        <div class="comment-head">
                            <h6 class="comment-name" id="comment-name"><a href=""> ` + galleryComments[i].user + ` </a></h6>
                            <span id="comment-date"> ` + galleryComments[i].dateTime + ` </span>
                        </div>
                        <div class="comment-content" id="comment-content">` + galleryComments[i].description + `</div>
                    </div>
                </li>
            </ul>
            `
    }
    document.getElementById("comments-container").innerHTML = htmlContentToAppend;
}
// function showRelatedProducts(galleryComments) {
//      let htmlContentToAppend1 = "";
//      for (let i = 0; i < galleryComments.length; i++) {
//          htmlContentToAppend1 += `
//          <div class="col-md-3 col-sm">
//              <a href="" class="col-sm card mb-1 custom-card list-group-item list-group-item-action">
//              <img class="bd-placeholder-img card-img-top" src=" ` + galleryComments[i].imgSrc + ` ">
//                  <h3 class="m-3"> ` + galleryComments[i].name + ` </h3>
//                  <hr>
//                  <p>Vendidos: ` + galleryComments[i].soldCount + `</p>
//                  <p>Precio: ` + galleryComments[i].cost + " " + galleryComments[i].currency + `</p>
//              </a>
//          </div>
//              `
//      }
//      document.getElementById("related-products").innerHTML = htmlContentToAppend1;
// }
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showGalleryComments(resultObj.data);
        }
    });
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            let productInfoNameHTML = document.getElementById("productName");
            let productInfoDescriptionHTML = document.getElementById("productDescription");
            let productInfoCountHTML = document.getElementById("productCount");
            let productInfoCostHTML = document.getElementById("productCost");
            let productInfoCategoryHTML = document.getElementById("productCategory");
            productInfoNameHTML.innerHTML = product.name;
            productInfoDescriptionHTML.innerHTML = product.description;
            productInfoCountHTML.innerHTML = product.soldCount;
            productInfoCostHTML.innerHTML = product.cost + " " + product.currency;
            productInfoCategoryHTML.innerHTML = product.category;
        }
    });
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let htmlRelatedProducts = "";
            var arrayRelated = product.relatedProducts;
            var productJSON = resultObj.data;
            for (let i = 0; i < arrayRelated.length; i++) {
                htmlRelatedProducts += `
                    <div class="col-md-3 col-sm">
                        <a href="" class="col-sm card mb-1 custom-card list-group-item list-group-item-action">
                            <img class="bd-placeholder-img card-img-top" src=" ` + productJSON[arrayRelated[i]].imgSrc + ` ">
                            <h3 class="m-3"> ` + productJSON[arrayRelated[i]].name + ` </h3>
                            <hr>
                            <p>Vendidos: ` + productJSON[arrayRelated[i]].soldCount + `</p>
                            <p>Precio: ` + productJSON[arrayRelated[i]].cost + " " + productJSON[arrayRelated[i]].currency + `</p>
                        </a>
                    </div>
                `
            }
            document.getElementById("related-products").innerHTML = htmlRelatedProducts;
        }
        showImagesGallery(product.images);
    });
    document.getElementById("commentNewButton").addEventListener("click", function () {
        htmlContentToAppend = "";
        var storedValue = localStorage.getItem("inputEmail");
        let commentNewTextareaHTML = document.getElementById("commentNewTextarea").value;
        commentNewTextareaHTML.innerText = commentNewTextarea;
        fechaActual = new Date()
        let starGold = `<span class="fa fa-star checked"></span>`;
        let starBlack = `<span class="fa fa-star"></span>`;
        const rbs = document.querySelectorAll('input[name="estrellas"]');
        let selectedValue;
        for (const rb of rbs) {
            if (rb.checked) {
                selectedValue = rb.value;
                break;
            }
        }
        let starComments = starGold.repeat(selectedValue) + starBlack.repeat(5 - selectedValue);
        htmlContentToAppend += `
            <ul id="comments-list" class="comments-list">
                <li>   
                    <div class="comment-avatar">
                        <img src="img/ceibal.png" alt="">
                    </div>
                    <div class="comment-box">
                        <span class="starComments"> `+ starComments + `  </span>
                        <div class="comment-head">
                            <h6 class="comment-name" id="comment-name"><a href=""> ` + storedValue + ` </a></h6>
                            <span id="comment-date"> ` + fechaActual + ` </span>
                        </div>
                        <div class="comment-content" id="comment-content">` + commentNewTextareaHTML + `</div>
                    </div>
                </li>
            </ul>
            `
        document.getElementById("comments-new").innerHTML = htmlContentToAppend;

    });
});