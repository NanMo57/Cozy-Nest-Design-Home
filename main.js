const _ = require('lodash');

window.addToFavorit = function(product, ind){

    let newProduct = {
        ...product,
        images:$($('.productsBlock .productImage')[ind]).attr('src')
    }

    let FavoriteProduct = JSON.parse(localStorage.getItem('Favorite'));


    if(FavoriteProduct.filter(obj =>_.isEqual(JSON.parse(obj),newProduct)).length > 0){
        $('#MessageAlert')[0].textContent = `Sorry , ${newProduct.title} product already add to your favorite.`;
    }else{
        FavoriteProduct.push(JSON.stringify(newProduct));
        localStorage.setItem('Favorite',JSON.stringify(FavoriteProduct));

        $('#MessageAlert')[0].textContent = `Success , add ${newProduct.title} product to your favorite.`;

        $('.count')[0].textContent = JSON.parse(localStorage.getItem('Favorite')).length;

        $('#favoriteProducts').html('');
        InsertProductInFavorite();
    }

    setTimeout(()=>{
        $('#MessageAlert').toggleClass('hide');
    },2500)
    $('#MessageAlert').toggleClass('hide');
    
};

window.addToCart = function (item, ind , image=`${$($('.productsBlock .productImage')[ind]).attr('src')}`) {
    let cartData = JSON.parse(localStorage.getItem('Cart')) || [];
    let updateProduct = {
        ...item,
        images:image,
        quantity: 1,
    };

    let found = false; 

    cartData = cartData.map((data) => {
        let parsedData = JSON.parse(data); 
        
        let isEqualIgnoringQuantity = _.isEqual(
            { ...parsedData, quantity: undefined },
            { ...updateProduct, quantity: undefined }
        );

        if (isEqualIgnoringQuantity) {
            found = true;
            return JSON.stringify({
                ...parsedData,
                quantity: parsedData.quantity + 1,
            });
        }
        return data; 
    });

    if (!found) {
        cartData.push(JSON.stringify(updateProduct));
    }

    localStorage.setItem('Cart', JSON.stringify(cartData));

    localStorage.setItem('countProductInCart',+localStorage.getItem('countProductInCart') + 1)

    $('.count')[1].textContent = localStorage.getItem('countProductInCart');

    $('#cartProducts').html('');
    InsertProductInCart();

    $('#MessageAlert')[0].textContent = `Success , add ${item.title} product to your Cart.`;

    setTimeout(()=>{
        $('#MessageAlert').toggleClass('hide');
    },2500)
    $('#MessageAlert').toggleClass('hide');

};

window.changeQuantity = function(product,method){
    let cartData = JSON.parse(localStorage.getItem('Cart')) || [];

    cartData = cartData.map(obj =>{
        if(_.isEqual(JSON.parse(obj),product)){
            switch(method){
               case '+' : 
                product = {
                    ...product,
                    quantity:product.quantity + 1
                }
                localStorage.setItem('countProductInCart',+localStorage.getItem('countProductInCart') + 1)
               break;
               case '-' : 
                if(product.quantity>1){
                        product = {
                            ...product,
                            quantity:product.quantity - 1
                        }
                        localStorage.setItem('countProductInCart',+localStorage.getItem('countProductInCart') - 1)
                }
               break;
            }
            return JSON.stringify(product)
        }
            return obj
    })

    $('.count')[1].textContent = localStorage.getItem('countProductInCart');
    localStorage.setItem('Cart',JSON.stringify(cartData))
    $('#cartProducts').html('');
    InsertProductInCart();
}

window.deleteProduct = function(product,position){
    let cartData = JSON.parse(localStorage.getItem(position)) || [];
    let newCart = [];
    cartData.map(obj => !(_.isEqual(JSON.parse(obj),product)) ? newCart.push(obj) : '') || ''

    localStorage.setItem(position,JSON.stringify(newCart));

    switch(position){
        case 'Favorite':  $('.count')[0].textContent = JSON.parse(localStorage.getItem('Favorite')).length;
                          $('#favoriteProducts').html('');
                          InsertProductInFavorite();
    $('#MessageAlert')[0].textContent = `Success , Delete ${product.title} product from your Favorite.`;

                    break;
        case 'Cart':
                    let total = 0;
                    JSON.parse(localStorage.getItem(position)).map(obj=>total+=JSON.parse(obj).quantity) 
                    localStorage.setItem('countProductInCart',total)
                     $('.count')[1].textContent = localStorage.getItem('countProductInCart');
                     $('#cartProducts').html('');
                     InsertProductInCart();
    $('#MessageAlert')[0].textContent = `Success , Delete ${product.title} product from your Cart.`;

                break;
    }

    setTimeout(()=>{
        $('#MessageAlert').toggleClass('hide');
    },2500)
    $('#MessageAlert').toggleClass('hide');

}
