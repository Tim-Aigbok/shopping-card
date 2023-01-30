
let basket = JSON.parse(localStorage.getItem("data")) || [];
//console.log(basket);
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let calculation = ()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=>x+y,0)
    localStorage.setItem("data", JSON.stringify(basket));
};
calculation();

let generateCartItems =()=> {
    if (basket.length !== 0) {
      // console.log("basket is not empty");
      return (shoppingCart.innerHTML = basket.map((x) => {
       // console.log(x);
        let {id, item} = x;
        let search = shopItemData.find((y)=>y.id === id) || []
        return`
        <div class="cart-item">
            <img width="100" src= ${search.img} alt=""/> 
            <div class= "details">
              <div class= "title-price-x">
                  <h4 class="title-price">
                        <p>${search.name}</p>
                        <p class="cart-item-price">$ ${search.Price}</p>
                   </h4>
                  <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div 
                
            <div class= "button">
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    <div id="${id}" class="quatity">${item}</div>
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
            </div>    
                
                  
               
            <h5>$${item * search.Price }</h5>  
        </div>  
        
        </div>
    `;
      }).join(""));
       
    }
    else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = ` 
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn"> Home page</button>
        </a>
    `;
    
        //    console.log("basket is empty at this poit due to the else if statement")
    }
    
};
 generateCartItems();

 
 let increment = (id)=>{
    let selectedItem = id; 
    let search = basket.find((x) => x.id === selectedItem.id);
    if(search === undefined){
  basket.push({
     id:selectedItem.id,
     item:1
  });
 }
  else{
     
       search.item = search.item + 1;
  };
  update(selectedItem.id);
  basket = basket.filter((x)=> x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));  
    
    //console.log(basket);
    
 
 }
 
 let decrement = (id)=>{
    let selectedItem = id; 
    let search = basket.find((x) => x.id === selectedItem.id);
    
    if (search === undefined) return;
   else if(search.item === 0) return;
   
 
    else{
       
       search.item = search.item - 1;
    };

    update(selectedItem.id);
    basket = basket.filter((x)=> x.item !== 0);
    generateCartItems();
     localStorage.setItem("data", JSON.stringify(basket));
    //  console.log(basket);
     
}

let update = (id)=>{
    let search = basket.find((x) => x.id === id);  
       //console.log(search.item);
       document.getElementById(id).innerHTML=search.item;
       calculation();
       totalAmount();
   };
   
let removeItem =(id)=>{
   let selectedItem = id;
 //  console.log(selectedItem.id);
   basket = basket.filter((x)=> x.id !== selectedItem.id);
   localStorage.setItem("data", JSON.stringify(basket));
   generateCartItems();
   totalAmount();
   calculation();
  
};

let clearCart = ()=>{
    basket = [];
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));


}
let totalAmount =()=>{
     if(basket.length !== 0){
        let amount = basket.map((x) =>{
            let {item, id} = x;
            let search = shopItemData.find((y)=> y.id ===id) || [];
            return item * search.Price;
       
    }).reduce((x,y)=>x+y, 0);

       // console.log(amount);
       
    label.innerHTML= `
    <h2>Total Bill: $ ${amount}</h2>
    <button class="check-out"><a href="index.html"> Check Out</a></button>
    <button onclick="clearCart()" class="clear-cart">Clear Cart</button>
    `
}   else return;
generateCartItems(); 

};
totalAmount();