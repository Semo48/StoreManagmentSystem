

var productName = document.getElementById("productName");
var productprice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn=document.getElementById("updateBtn");

// console.log(productName ,productprice ,productImage,productDescription ,productCategory)

var productContainer=[] ;

if(localStorage.getItem('products') == null){
    productContainer = [];
}
else{
    productContainer = JSON.parse(localStorage.getItem('products'));
    displayProduct();
}


function addProduct(){
   if(validateNameInput() && validatePriceInput()&& validateCategoryInput() ){
     // console.log(productImage.files[0].name);
    
   var product={
    code:productName.value,
    price:productprice.value,
    category:productCategory.value,
    desc:productDescription.value,
    //? optional chaining  if reutrns null or undefined  it will not continue 
    image:`imgs/${productImage.files[0]?.name}`
   }
   productContainer.push(product);
   clearForm();
   displayProduct();
//    console.log(productContainer);
localStorage.setItem('products', JSON.stringify(productContainer));
   }
    
}
function clearForm(){
    productName.value=null;
    productprice.value=null;
    productCategory.value=null;
    productDescription.value=null;
    productImage.value=null;
    productName.classList.remove("is-valid");
    productprice.classList.remove("is-valid");
    productCategory.classList.remove("is-valid");
    
    
}
function displayProduct(){

    var cartona =``;
    for(var i =0 ; i< productContainer.length ; i++){
      cartona +=`<div class="col-md-3">
                <div class="product">
                    <img src="${productContainer[i].image}" class="w-100" alt="product name">
                    <h2 class="h4 mt-3"> ${productContainer[i].code} </h2>
                    <p class="text-secondary mb-2">${productContainer[i].desc}</p>
                    <h3 class="h5"><span class="fw-bolder">price: </span>${productContainer[i].price}</h3>
                    <h3 class="h5"><span class="fw-bolder">category: </span>${productContainer[i].category}</h3>
                 <button onclick="deleteProduct(${i});" class="btn btn-outline-danger w-100 btn-sm my-2">Delete Product <i class="fas fa-trash-alt"></i> </button>
                 <button onclick="setFormForUpdate(${i});" class="btn btn-outline-warning w-100 btn-sm my-2">Update Product <i class="fas fa-pen-alt"></i></button>
                </div>
            </div>`;
    }
    document.getElementById('rowData').innerHTML = cartona;
}

function deleteProduct(deltedIndex){
    productContainer.splice(deltedIndex,1);
   displayProduct();
   // add array to local storage after delete
   localStorage.setItem('products', JSON.stringify(productContainer))

    
}

function searchProduct(){
    var term = searchInput.value;
    var cartona=``;
    for(var i = 0 ; i< productContainer.length ; i++){
    if (productContainer[i].code.toUpperCase().includes(term.toUpperCase())){
     cartona +=`<div class="col-md-3">
                <div class="product">
                    <img src="${productContainer[i].image}" class="w-100" alt="product name">
                    <h2 class="h4 mt-3"> ${productContainer[i].code} </h2>
                    <p class="text-secondary mb-2">${productContainer[i].desc}</p>
                    <h3 class="h5"><span class="fw-bolder">price: </span>${productContainer[i].price}</h3>
                    <h3 class="h5"><span class="fw-bolder">category: </span>${productContainer[i].category}</h3>
                 <button onclick="deleteProduct(${i});" class="btn btn-outline-danger w-100 btn-sm my-2">Delete Product <i class="fas fa-trash-alt"></i> </button>
                 <button onclick="setFormForUpdate(${i});" class="btn btn-outline-warning w-100 btn-sm my-2">Update Product <i class="fas fa-pen-alt"></i></button>
                </div>
            </div>`;
         
    }

    }
     document.getElementById('rowData').innerHTML = cartona;
}


var i;
function setFormForUpdate(updatedIndex){
    i=updatedIndex;
addBtn.classList.add("d-none");
updateBtn.classList.remove("d-none");
productName.value=productContainer[updatedIndex].code;
productprice.value=productContainer[updatedIndex].price;
productDescription.value=productContainer[updatedIndex].desc;
productCategory.value=productContainer[updatedIndex].category;

}

function updateProduct(){
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    productContainer[i].code = productName.value;
    productContainer[i].price = productprice.value;
    productContainer[i].category = productCategory.value;
    productContainer[i].desc = productDescription.value;
    displayProduct();
    localStorage.setItem('products', JSON.stringify(productContainer));
    clearForm();

}

function validateNameInput(){
var regex = /^[A-Z][a-z]{2,8}$/;
var text = productName.value;
var msgName = document.getElementById('msgName');
if(regex.test(text)){
   productName.classList.add("is-valid");
   productName.classList.remove("is-invalid");
   msgName.classList.add("d-none");
   return true;
}
else{
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    msgName.classList.remove("d-none")
    return false;
}
}

function validatePriceInput(){
var regex = /^\d{1,}$/;
var text = productprice.value;
var msgPrice = document.getElementById('msgPrice');
if(regex.test(text)){
   productprice.classList.add("is-valid");
   productprice.classList.remove("is-invalid");
   msgPrice.classList.add("d-none");
   return true;
}
else{
    productprice.classList.add("is-invalid");
    productprice.classList.remove("is-valid");
    msgPrice.classList.remove("d-none")
    return false;
}
}

function validateCategoryInput(){
var regex = /^(tv|screens|mobiles|laptops)$/i;
var text = productCategory.value;
var msgCategory = document.getElementById('msgCategory');
if(regex.test(text)){
   productCategory.classList.add("is-valid");
   productCategory.classList.remove("is-invalid");
   msgCategory.classList.add("d-none");
   return true;
}
else{
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
    msgCategory.classList.remove("d-none")
    return false;
}
}




