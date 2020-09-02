const ORDER_BY_PROD_COUNT = "Cant.";
const ORDER_BY_PROD_COSTUP = "CostUp";
const ORDER_BY_PROD_COSTDOWN = "CostDown";
var currentProductArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
function sortProducts(criteria, arrayProduct) {
    let result = [];
    if (criteria === ORDER_BY_PROD_COUNT) {
        result = arrayProduct.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COSTUP) {
        result = arrayProduct.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if (aCost < bCost) { return -1; }
            if (aCost > bCost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COSTDOWN) {
        result = arrayProduct.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if (aCost > bCost) { return -1; }
            if (aCost < bCost) { return 1; }
            return 0;
        });
    }
    return result;
}
function showProductsList(productArray) {
    let htmlContentToAppend1 = "";
    for (let i = 0; i < productArray.length; i++) {
        let product = productArray[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {
            htmlContentToAppend1 += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 id="productName" class="mb-1">`+ product.name + `</h4>
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <br><br><br><br>
                        <p class="precio">Precio: ` + product.cost + " " + product.currency + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend1;
    }
}
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductArray = resultObj.data;
            currentProductArray = sortProducts(ORDER_BY_PROD_COUNT, currentProductArray);
            showProductsList(currentProductArray)
        }
    });
    let filteredArray = [];
    const inputSearch = document.getElementById("inputSearch");
    inputSearch.onkeyup = () => {
        let searchString = inputSearch.value.toLowerCase();
        filteredArray = currentProductArray.filter(item => {
            return item.name.toLowerCase().indexOf(searchString) > -1 || item.description.toLowerCase().indexOf(searchString) > -1;
        });
        showProductsList(filteredArray)
    };
    inputSearch.addEventListener("search", function (event) {
        filteredArray = currentProductArray;
        showProductsList(filteredArray);
    });
    document.getElementById("sortByCount").addEventListener("click", function () {
        filteredArray = sortProducts(ORDER_BY_PROD_COUNT, filteredArray);
        showProductsList(filteredArray)
    });
    document.getElementById("sortByCostUp").addEventListener("click", function () {
        filteredArray = sortProducts(ORDER_BY_PROD_COSTUP, filteredArray);
        showProductsList(filteredArray)
    });
    document.getElementById("sortByCostDown").addEventListener("click", function () {
        filteredArray = sortProducts(ORDER_BY_PROD_COSTDOWN, filteredArray);
        showProductsList(filteredArray)
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        minCount = undefined;
        maxCount = undefined;
        showProductsList(filteredArray);
    });
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }
        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }
        showProductsList(filteredArray);
    });
});